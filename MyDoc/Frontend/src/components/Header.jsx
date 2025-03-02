import React from "react";
import { Link as ScrollLink } from 'react-scroll'; // Import the scroll link
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";




const Header = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token") ? true : false; // Check if the user is logged in
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = () => {
    // Clear user data from storage
    localStorage.removeItem("token"); 
    sessionStorage.clear(); // Clear session storage, if used
  
    // (Optional) Inform the backend about logout
    fetch('/api/logout', { method: 'POST', credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          console.error("Failed to log out on the server.");
        }
      })
      .catch(error => console.error("Logout API error:", error));
  
    // Redirect to login or home page
    window.location.href = "/"; // Replace '/login' with the desired route
  };
  
  const handleScroll = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100); // Delay ensures navigation completes first
    } else {
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div>
      <header className="header">
        <div className="logo">
          <h1>My<span className="doc-logo">Doc</span></h1>
        </div>
        <ul className="nav-bar">
          <li>
            <Link to="/" className="home-link">Home</Link>
          </li>
          <li>
            <Link to="/appointments">My appointments</Link>
          </li>
          <li>
            <span onClick={() => handleScroll("SearchSection")} style={{ cursor: "pointer" }}>
              Find Doctors
            </span>
          </li>
          <li>
            
            <span onClick={() => handleScroll("AboutSection")} style={{ cursor: "pointer" }} className="about-link">
              About
            </span>
          </li>
        </ul>
        <nav>
          <ul className="nav-links">
          <li>
              {
              isLoggedIn ? (
                <button className="logout-button" onClick={handleLogout}>
                  Log Out
                </button>
              ) : (
                <Link to="/signin">
                  <button className="signin-button">Sign In</button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Header;
