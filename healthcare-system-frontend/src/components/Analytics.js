import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import API from "../api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

function Analytics() {
  const [data, setData] = useState({ labels: [], counts: [] });

  useEffect(() => {
    API.get("/patients").then(res => {
      const conditions = {};
      res.data.forEach(p => {
        p.medicalHistory.forEach(cond => {
          conditions[cond] = (conditions[cond] || 0) + 1;
        });
      });

      setData({
        labels: Object.keys(conditions),
        counts: Object.values(conditions)
      });
    });
  }, []);

  return (
    <div className="container mt-5">
      <h3>Medical Conditions Frequency</h3>
      <Bar
        data={{
          labels: data.labels,
          datasets: [{
            label: "Patients",
            data: data.counts,
            backgroundColor: "rgba(75,192,192,0.6)"
          }]
        }}
      />
    </div>
  );
}

export default Analytics;
