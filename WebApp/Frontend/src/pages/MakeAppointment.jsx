import React from "react";
import { useLocation } from "react-router-dom";
import "./MakeAppointment.css";

const MakeAppointment = () => {
  const location = useLocation();
  const doctorName = location.state?.doctorName || "Unknown";
  const availableTime = location.state?.availableTime || "Unknown";

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = {
      doctorName,
      date: e.target.date.value,
      time: e.target.time.value,
    };
    console.log("Appointment Created:", appointmentData);
    // Implement API call or other logic to save appointment
  };

  return (
    <div className="make-appointment-page">
      <h2>Make Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="doctorName">Doctor</label>
          <input
            type="text"
            id="doctorName"
            value={doctorName}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" required className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            defaultValue={availableTime}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default MakeAppointment;
