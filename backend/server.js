require('dotenv').config(); // 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Patient = require('./models/Patient');

const app = express();

// CORS setup with your frontend origin
app.use(cors({
  origin: 'https://ephemeral-kheer-c0d436.netlify.app',  // <-- yahan apne Vercel frontend URL daalo
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/healthcare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Add new patient
app.post('/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all/search patients
app.get('/patients', async (req, res) => {
  const query = {};
  if (req.query.name) query.name = { $regex: req.query.name, $options: 'i' };
  const patients = await Patient.find(query);
  res.json(patients);
});

// Update patient
app.put('/patients/:id', async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete patient
app.delete('/patients/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => console.log('Server running'));
