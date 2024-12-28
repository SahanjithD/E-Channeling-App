import React from "react";
import "./DocCard.css";

export default function DocCard({ doctor }) {
  return (
    <div className="doc-card">
      <h3>{doctor.name}</h3>
      <p>Specialization: {doctor.specialization}</p>
      <p>Available Days: {doctor.availableDays.join(", ")}</p>
      <p>availableTime: {doctor.availableTime}</p>
    </div>
  );
}

