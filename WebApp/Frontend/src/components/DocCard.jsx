import React from "react";
import doctors from "../doctors.json"; // Import the JSON file
import "./DocCard.css";

const DocCard = () => {
  return (
    <div className="specialist-container">
      {doctors.map((doctor, index) => (
        <div className="specialist-card" key={index}>
          <div className="icon">{doctor.icon}</div>
          <h3>{doctor.title}</h3>
          <p>{doctor.description}</p>
        </div>
      ))}
      <div className="specialist-card more-card">
        <div className="icon">➡️</div>
        <h3>See More</h3>
      </div>
    </div>
  );
};

export default DocCard;
