{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const Patient = require("../models/Patient");\
\
exports.createPatient = async (req, res) => \{\
  try \{\
    const newPatient = new Patient(req.body);\
    await newPatient.save();\
    res.status(201).json(newPatient);\
  \} catch (err) \{\
    res.status(400).json(\{ error: err.message \});\
  \}\
\};\
\
exports.getPatients = async (req, res) => \{\
  try \{\
    const \{ name \} = req.query;\
    const query = name ? \{ name: \{ $regex: name, $options: "i" \} \} : \{\};\
    const patients = await Patient.find(query).sort(\{ createdAt: -1 \});\
    res.json(patients);\
  \} catch (err) \{\
    res.status(500).json(\{ error: err.message \});\
  \}\
\};\
\
exports.updatePatient = async (req, res) => \{\
  try \{\
    const updated = await Patient.findByIdAndUpdate(\
      req.params.id,\
      \{ $set: req.body \},\
      \{ new: true \}\
    );\
    res.json(updated);\
  \} catch (err) \{\
    res.status(400).json(\{ error: err.message \});\
  \}\
\};\
\
exports.deletePatient = async (req, res) => \{\
  try \{\
    await Patient.findByIdAndDelete(req.params.id);\
    res.json(\{ message: "Patient deleted successfully" \});\
  \} catch (err) \{\
    res.status(500).json(\{ error: err.message \});\
  \}\
\};\
}