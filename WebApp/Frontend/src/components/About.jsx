import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-container">
      <div className="about-content">
        <h1>About</h1>
        <p>
          Welcome to <strong>E-Channeling</strong>, your one-stop solution for seamless doctor appointments.
          Our platform is designed to make healthcare more accessible and efficient for everyone.
        </p>
        <p>
          With E-Channeling, you can browse through a wide range of specialized doctors, check their availability, and book appointments instantly from the comfort of your home.
        </p>
        <p>
          Whether you're seeking consultation with a physician, cardiologist, pediatrician, or any other specialist, we are here to bridge the gap between patients and healthcare providers.
        </p>
        <div className="features">
          <h2>Our Features</h2>
          <ul>
            <li>Find and book doctors with ease.</li>
            <li>Specialist doctors across multiple categories.</li>
            <li>Secure login for patients, doctors, and admins.</li>
            <li>Streamlined appointment scheduling and management.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
