import React from "react";
import "./SearchResults.css";
import SearchBar from "./SearchBar";

const SearchResults = ({ results }) => {
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
                <strong>Available Date:</strong> {doctor.availableDate || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
