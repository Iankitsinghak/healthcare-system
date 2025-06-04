{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require("express");\
const cors = require("cors");\
const dotenv = require("dotenv");\
const connectDB = require("./config/db");\
\
dotenv.config();\
connectDB();\
\
const app = express();\
app.use(cors());\
app.use(express.json());\
\
app.use("/api/patients", require("./routes/patientRoutes"));\
\
const PORT = process.env.PORT || 5000;\
app.listen(PORT, () => \{\
  console.log(`Server running on port $\{PORT\}`);\
\});\
}