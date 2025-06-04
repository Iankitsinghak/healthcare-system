import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddPatient from "./components/AddPatient";
import PatientList from "./components/PatientList";
import EditPatient from "./components/EditPatient";
import Analytics from "./components/Analytics";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Healthcare System</Link>
          <div>
            <Link className="nav-link" to="/">Patients</Link>
            <Link className="nav-link" to="/add">Add Patient</Link>
            <Link className="nav-link" to="/analytics">Analytics</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/add" element={<AddPatient />} />
        <Route path="/edit/:id" element={<EditPatient />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
