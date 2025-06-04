import React, { useState } from "react";
import API from "../api";

function AddPatient() {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    age: "",
    gender: "",
    contact: "",
    allergies: "",
    medicalHistory: "",
    prescriptions: "",
    doctorNotes: ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...formData,
      allergies: formData.allergies.split(","),
      medicalHistory: formData.medicalHistory.split(","),
      prescriptions: formData.prescriptions.split(",")
    };
    await API.post("/patients", payload);
    alert("Patient added");
  };

  return (
    <div className="container mt-4">
      <h3>Add Patient</h3>
      <form onSubmit={handleSubmit}>
        {[
          "patientId",
          "name",
          "age",
          "gender",
          "contact",
          "allergies",
          "medicalHistory",
          "prescriptions",
          "doctorNotes"
        ].map(field => (
          <div className="mb-2" key={field}>
            <input
              className="form-control"
              placeholder={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddPatient;
