import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: '', age: '', gender: '', contact: '', allergies: '', prescriptions: '', medicalHistory: '', doctorNotes: ''
  });

  const fetchPatients = async () => {
    const res = await axios.get('/patients');
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/patients', {
      ...form,
      allergies: form.allergies.split(','),
      prescriptions: form.prescriptions.split(','),
    });
    setForm({ name: '', age: '', gender: '', contact: '', allergies: '', prescriptions: '', medicalHistory: '', doctorNotes: '' });
    fetchPatients();
  };

  const deletePatient = async (id) => {
    await axios.delete(`/patients/${id}`);
    fetchPatients();
  };

  return (
    <div className="container mt-4">
      <h2>Patient Management System</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input className="form-control mb-2" placeholder="Age" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} />
        <input className="form-control mb-2" placeholder="Gender" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} />
        <input className="form-control mb-2" placeholder="Contact" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} />
        <input className="form-control mb-2" placeholder="Allergies (comma-separated)" value={form.allergies} onChange={e => setForm({...form, allergies: e.target.value})} />
        <input className="form-control mb-2" placeholder="Prescriptions (comma-separated)" value={form.prescriptions} onChange={e => setForm({...form, prescriptions: e.target.value})} />
        <textarea className="form-control mb-2" placeholder="Medical History" value={form.medicalHistory} onChange={e => setForm({...form, medicalHistory: e.target.value})} />
        <textarea className="form-control mb-2" placeholder="Doctor Notes" value={form.doctorNotes} onChange={e => setForm({...form, doctorNotes: e.target.value})} />
        <button className="btn btn-primary">Add Patient</button>
      </form>

      <ul className="list-group">
        {patients.map(p => (
          <li key={p._id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{p.name}</strong> — Age: {p.age}, Contact: {p.contact}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => deletePatient(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;