// models/Patient.js

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  registrationId: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  // Add more fields as needed
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
