import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MakeAppointment.css";
import SignInOverlay from "../components/SignInOverlay";

const MakeAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctorName = location.state?.doctorName || "Unknown";
  const availableTime = location.state?.availableTime || "9am-5pm"; // Default time range
  const doctorId = location.state?.doctorId || "1";
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignInOverlay, setShowSignInOverlay] = useState(false);
  const [timeOptions, setTimeOptions] = useState([]);
  const [loading, setLoading] = useState(true);

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
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      // User is not authenticated
      setShowSignInOverlay(true);
      setLoading(false);
      return;
    }
    
    setIsAuthenticated(true);
    setTimeOptions(generateTimeOptions(availableTime));
    setLoading(false);
  }, [availableTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowSignInOverlay(true);
      return;
    }
    
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    const appointmentData = {
      userId: userId,
      doctorId: doctorId,
      date: e.target.date.value,
      time: e.target.time.value,
    };
  
    try {
      const response = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });
      
      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        setShowSignInOverlay(true);
        return;
      }
  
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
  
  const handleCloseSignIn = () => {
    // Navigate to sign-in page
    navigate('/signin');
  };

  if (showSignInOverlay) {
    return <SignInOverlay onClose={handleCloseSignIn} />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

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