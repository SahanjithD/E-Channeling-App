import React, { useState, useEffect } from "react";
import DocCard from "../components/DocCard";
import Footer from "../components/Footer";
import doctorsData from "../doctors.json";
import doctorImage from '../assets/doctor.png';

const Dashboard = () => {
  // const [doctors, setDoctors] = useState([]);

  // useEffect(() => {
  //   console.log("Doctors Data:", doctorsData); // Debugging
  //   setDoctors(doctorsData);
  // }, []); 
  return (
    <div>
      <div className="banner">
        <div className="banner-content">
          <h1>Doctor Consultation.</h1>
          <p>
            Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
          </p>
          <div className="banner-buttons">
            <button className="consult-now">Consult Now</button>
            <button className="customer-review">Customer Review</button>
          </div>
        </div>
        <div className="banner-image">
          <img src={doctorImage} alt="Doctor" />
        </div>
      </div>
      <main>
        <h1>Dashboard</h1>
        <DocCard />

        {/* <div className="doc-list">
          {Array.isArray(doctors) ? (
            doctors.map((doctor) => (
              <DocCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p>No doctors available</p>
          )}
        </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
