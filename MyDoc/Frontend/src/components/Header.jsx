import React from "react";
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Import the scroll link
import "./Header.css";




const Header = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token") ? true : false; // Check if the user is logged in

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
            <ScrollLink 
              to="SearchSection" 
              smooth={true} 
              duration={500}
            >
              Find Doctors
            </ScrollLink>
          </li>
          <li>
            <ScrollLink 
              to="AboutSection" 
              smooth={true} 
              duration={500}
            >
              About
            </ScrollLink>
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
