import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    // Trigger the search function passed from the parent
    onSearch({ doctorName, specialization, hospital, date });
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
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="search-item">
        <label htmlFor="hospital">Hospital</label>
        <select
          id="hospital"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
        >
          <option value="">Select Hospital</option>
          <option value="City Hospital">City Hospital</option>
          <option value="General Hospital">General Hospital</option>
          {/* Add more options as needed */}
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
