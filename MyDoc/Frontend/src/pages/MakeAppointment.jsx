import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MakeAppointment.css";
import { use } from "react";
import { useNavigate } from "react-router-dom";

const MakeAppointment = () => {
  const location = useLocation();
  const doctorName = location.state?.doctorName || "Unknown";
  const availableTime = location.state?.availableTime || "9am-5pm"; // Default time range
  const doctorId = location.state?.doctorId || "1";

  const [timeOptions, setTimeOptions] = useState([]);

  
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      userId: userId, // Replace with the logged-in user's ID
      doctorId: doctorId, // Replace with the selected doctor's ID
      date: e.target.date.value,
      time: e.target.time.value,
    };
  
    try {
      const response = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create appointment");
      }
  
      const data = await response.json();
      console.log("Appointment successfully created:", data);
      alert("Appointment created successfully!");
      navigate("/appointments");
      
    } catch (error) {
      console.error("Error creating appointment:", error.message);
      alert("Failed to create appointment. Please try again.");
    }
  };
  

  // Function to generate 20-minute intervals
  const generateTimeOptions = (timeRange) => {
    const parseTime = (time) => {
      const match = time.match(/^(\d{1,2})(am|pm)$/i);
      if (!match) return null;

      let [_, hour, period] = match;
      hour = parseInt(hour, 10);

      // Convert to 24-hour format
      if (period.toLowerCase() === "pm" && hour !== 12) {
        hour += 12;
      } else if (period.toLowerCase() === "am" && hour === 12) {
        hour = 0;
      }

      return hour * 60; // Return total minutes
    };

    const [start, end] = timeRange.split("-").map(parseTime);

    const options = [];
    for (let time = start; time <= end; time += 20) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      options.push(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
      );
    }

    return options;
  };

  useEffect(() => {
    setTimeOptions(generateTimeOptions(availableTime));
  }, [availableTime]);

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
          <select id="time" required className="form-control">
            <option value="" disabled>
              Select a time
            </option>
            {timeOptions.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default MakeAppointment;
