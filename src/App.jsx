// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react"; // Import QRCode component from qrcode.react library

function App() {
  const [patientData, setPatientData] = useState(null);
  const [registrationId, setRegistrationId] = useState("");
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGeneratingQR(true);
    try {
      const patients = await axios.get(
        `http://localhost:5000/patients/${registrationId}`
      );
      console.log(patients.data);
      setPatientData(patients.data);
    } catch (error) {
      console.error(error);
    }
    setIsGeneratingQR(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient Registration ID"
          value={registrationId}
          onChange={(e) => setRegistrationId(e.target.value)}
        />
        <button type="submit" disabled={isGeneratingQR}>
          Generate QR Code
        </button>
      </form>
      {patientData && (
        <div>
          {/* Display patient details */}
          <p>Name: {patientData.name}</p>
          <p>Age: {patientData.age}</p>
          {/* Generate QR code */}
          <QRCode value={JSON.stringify(patientData)} />
        </div>
      )}
    </div>
  );
}
export default App;
