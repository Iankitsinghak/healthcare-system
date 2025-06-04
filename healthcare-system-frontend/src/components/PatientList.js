import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    API.get("/patients").then(res => setPatients(res.data));
  }, []);

  const handleDelete = async id => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/patients/${id}`);
      setPatients(patients.filter(p => p._id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h3>All Patients</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th><th>Age</th><th>Contact</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.contact}</td>
              <td>
                <Link className="btn btn-warning btn-sm me-2" to={`/edit/${p._id}`}>
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;
