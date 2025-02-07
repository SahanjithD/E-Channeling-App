import React, { useState, useEffect } from "react";
import DocCard from "../components/DocCard";
import Footer from "../components/Footer";
import doctorsData from "../doctors.json";
import doctorImage from '../assets/doctor.png';
import "./Home.css";
import SearchBar from "../components/SearchBar";
import About from "../components/About";
import SearchResults from "../components/SearchResults";
import { Link as ScrollLink } from 'react-scroll'; // Import the scroll link

const Dashboard = () => {
  // const [doctors, setDoctors] = useState([]);

  // useEffect(() => {
  //   console.log("Doctors Data:", doctorsData); // Debugging
  //   setDoctors(doctorsData);
  // }, []); 
  const [searchResults, setSearchResults] = useState([]);

  // Handler to update search results
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };
  return (
    <div>
      <section id= "HomeSection"></section>
      <div className="banner">
        <div className="banner-content">
          <h1>Welcome to <span className="doc-logo">MyDoc</span></h1>
          <p>
            Your one-stop destination for health and wellness.<br />
            Find trusted doctors, locate nearby hospitals, and book appointments effortlessly.<br />
            Experience healthcare like never before – tailored, accessible, and convenient.
          </p>
          <div className="banner-buttons">
            {/* <button className="find-hospitals">Find Hospitals</button> */}
            <ScrollLink   to="SearchSection" 
                          smooth={true} 
                          duration={500}>
              <button className="find-doctors">Find Doctors</button>
            </ScrollLink>
          </div>
        </div>
        <div className="banner-image">
          <img src={doctorImage} alt="Doctor" />
        </div>
      </div>
      <section id="SearchSection">
        <h1 style={{ marginLeft: '20px' }}>Top Specialists</h1>
        <SearchBar onSearch={handleSearchResults} />
        <SearchResults results={searchResults} />
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
