import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [date, setDate] = useState("");

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Orthopedic",
    "General Surgeon",
    "Obstetrician/Gynecologist",
    "Ophthalmologist",
    "Otolaryngologist",
    "Psychiatrist",
    "Urologist",
    "Gastroenterologist",
    "Endocrinologist",
    "Nephrologist",
    "Pulmonologist",
    "Rheumatologist",
    "Oncologist",
    "Allergist/Immunologist",
    "Infectious Disease Specialist",
    "Hematologist",
  ];

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams({
        name: doctorName,
        specialty: specialization,
      });

      const response = await fetch(
        `http://localhost:5000/doctors/search?${queryParams.toString()}`
      );
      if (response.ok) {
        const doctors = await response.json();
        console.log("Search Results:", doctors);
        onSearch(doctors); // Pass results to parent component
      } else {
        console.error("Error fetching doctors");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-item">
        <label htmlFor="doctor-name">Doctor Name</label>
        <input
          type="text"
          id="doctor-name"
          placeholder="Search Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
      </div>

      <div className="search-item">
        <label htmlFor="specialization">Specialization</label>
        <select
          id="specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">Select Specialization</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      <div className="search-item">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="search-item">
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
