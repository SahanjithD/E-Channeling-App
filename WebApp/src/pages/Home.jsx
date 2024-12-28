import React, { useState, useEffect } from "react";
import DocCard from "../components/DocCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import doctorsData from "../doctors.json"; 

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    console.log("Doctors Data:", doctorsData); // Debugging
    setDoctors(doctorsData);
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h1>Dashboard</h1>
        <div className="doc-list">
          {Array.isArray(doctors) ? (
            doctors.map((doctor) => (
              <DocCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p>No doctors available</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
