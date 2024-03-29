const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

// routes
const userRoutes = require("./modules/user/user.routes");
const patientRegisterRoutes = require("./modules/patientRegister/patientRegister/patientRegister.routes");

const prfOneRoutes = require("./modules/patientRegister/prfOne/prfOne.routes");
const prfTwoRoutes = require("./modules/patientRegister/prfTwo/prfTwo.routes");
const prfThreeRoutes = require("./modules/patientRegister/prfThree/prfThree.routes");

const app = express();
const http = require("http");
const path = require("path");
const Server = http.createServer(app);

// middleware
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(
  express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 })
);

connectDB();

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/patient-registers", patientRegisterRoutes);
app.use("/api/v1/prf-one", prfOneRoutes);
app.use("/api/v1/prf-two", prfTwoRoutes);
app.use("/api/v1/prf-three", prfThreeRoutes);

// static file serving
app.use("/api/v1/uploads", express.static(path.join(__dirname, "/")));

// testing api
app.get("/", (req, res) => {
  res.send("Server is running");
});

Server.listen(PORT, () => {
  console.log(`Server is Running PORT: ${PORT}`);
});
