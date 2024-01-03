const mongoose = require("mongoose");

const prfTwoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: "nahid.muradabir@gmail.com",
      required: true,
    },
    prfOne: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrfOne",
      default: "659537340f33b2a6389f306f",
      required: true,
    },
    patient_statement_signature: {
      type: String,
      required: true,
    },
    patient_statement_signature_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PrfTwo = mongoose.model("PrfTwo", prfTwoSchema);
module.exports = PrfTwo;