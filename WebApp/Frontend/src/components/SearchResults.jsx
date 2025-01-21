import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = ({ results }) => {
  

  const navigate = useNavigate();

  const handleMakeAppointment = (doctor) => {
    navigate("/make-appointment", { state: { doctorName: doctor.name } });
  };

  return (
    <div className="search-results">
      {results.length === 0 ? (
        <p className="no-results">No doctors found.</p>
      ) : (
        <ul className="results-list">
          {results.map((doctor) => (
            <li key={doctor.id} className="result-item">
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-specialty">
                <strong>Specialty:</strong> {doctor.specialty}
              </p>
              <p className="doctor-hospital">
                <strong>Hospital:</strong> {doctor.hospital || "N/A"}
              </p>
              <p className="doctor-availability">
                <strong>Available Time:</strong> {doctor.availableTime || "N/A"}
              </p>
              <button
                className="make-appointment-button"
                onClick={() => handleMakeAppointment(doctor)}
              >
                Make Appointment
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
