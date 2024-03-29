const { sendWelcomeMail } = require("../../../utils/sendEmailHelpers");
const PrfOne = require("./prfOne.model");

const createPROne = async (req, res) => {
  try {
    let newData = JSON.parse(req.body.storeData);
    if (req.files) {
      if (req.files.picture) {
        newData["patient_information"]["picture"] = req.files.picture[0].path;
      }
      if (req.files.front_picture) {
        newData["insurance_information"]["front_picture"] =
          req.files.front_picture[0].path;
      }
      if (req.files.back_picture) {
        newData["insurance_information"]["back_picture"] =
          req.files.back_picture[0].path;
      }
    }
    const newPatientRegister = new PrfOne(newData);
    const result = await newPatientRegister.save();
    await sendWelcomeMail(process.env.ADMIN_MAIL);
    await sendWelcomeMail("nahid.muradabir@gmail.com");
    res.status(200).json({
      success: true,
      message: "Register Create Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Register Create Failed",
      error_message: error.message,
    });
  }
};

const getPROneById = async (req, res) => {
  try {
    let query = {};
    if (req.user?.email !== process.env.ADMIN_MAIL) {
      query = { userEmail: req.user?.email, _id: req.params.id };
    } else {
      query = { _id: req.params.id };
    }
    const result = await PrfOne.findOne(query);
    res.status(200).json({
      success: true,
      message: "Patient Registers Retrieve Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Patient Registers Retrieve Failed",
      error_message: error.message,
    });
  }
};

module.exports = {
  createPROne,
  getPROneById,
};
