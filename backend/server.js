// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Patient = require("./models/Patient.js");
const qr = require("qrcode");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// MongoDB connection
app.use(cors());
app.use(express.json());
console.log(process.env.DBmongo);
mongoose.connect(process.env.DBmongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

//  generate QR code for a patient
app.get("/patients/:registrationId", async (req, res) => {
  try {
    const patient = await Patient.findOne({
      registrationId: req.params.registrationId,
    });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
