import React from "react";
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Import the scroll link
import "./Header.css";

const Header = ({ children }) => {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <h1>My<span className="doc-logo">Doc</span></h1>
        </div>
        <ul className="nav-bar">
          <li>
            <Link to="/Home" className="home-link">Home</Link>
          </li>
          <li>
            <Link to="/Apointments">My appointments</Link>
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
              <Link to="/signin"><button className="signin-button">Sign In</button></Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Header;
