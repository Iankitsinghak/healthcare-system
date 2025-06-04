import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    API.get(`/patients`).then(res => {
      const patient = res.data.find(p => p._id === id);
      if (patient) {
        setFormData({
          ...patient,
          allergies: patient.allergies.join(","),
          medicalHistory: patient.medicalHistory.join(","),
          prescriptions: patient.prescriptions.join(",")
        });
      }
    });
  }, [id]);

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
    await API.put(`/patients/${id}`, payload);
    alert("Updated successfully");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h3>Edit Patient</h3>
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
        <button className="btn btn-success">Update</button>
      </form>
    </div>
  );
}

export default EditPatient;
