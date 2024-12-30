import React from "react";
import { Link } from "react-router-dom";
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
            <Link to="/services">My appointments</Link>
          </li>
          <li>
            <Link to="/services">Find Doctors</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          
        </ul>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="home-link">Home</Link>
          </li>
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
