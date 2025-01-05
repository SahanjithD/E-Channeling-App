import React, { useState, useEffect } from "react";
import DocCard from "../components/DocCard";
import Footer from "../components/Footer";
import doctorsData from "../doctors.json";
import doctorImage from '../assets/doctor.png';
import "./Home.css";
import SearchBar from "../components/SearchBar";
import About from "../components/About";

const Dashboard = () => {
  // const [doctors, setDoctors] = useState([]);

  // useEffect(() => {
  //   console.log("Doctors Data:", doctorsData); // Debugging
  //   setDoctors(doctorsData);
  // }, []); 
  return (
    <div>
      <section id= "HomeSection"></section>
      <div className="banner">
        <div className="banner-content">
          <h1>Doctor Consultation.</h1>
          <p>
          Access expert medical advice from specialists anytime, anywhere.
          Our platform connects you with highly qualified doctors from various specialties.
          Receive personalized care and guidance tailored to your health needs.
          No waiting rooms, no travel – just seamless, convenient consultations from the comfort of your home.
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
      <section id="SearchSection">
        <h1 style={{ marginLeft: '20px' }}>Top Specialists</h1>
        <SearchBar />
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
      </section>
      <section id="AboutSection"><About/></section>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
