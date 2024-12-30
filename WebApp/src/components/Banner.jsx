import React from 'react';
import './Banner.css';
import doctorImage from '../assets/doctor.png'; // Replace with your image

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Doctor Consultation.</h1>
        <p>
          Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
        </p>
        <div className="banner-buttons">
          <button className="consult-now">Consult Now</button>
          <button className="customer-review">Customer Review</button>
        </div>
      </div>
      <div className="banner-image">
        <img src={doctorImage} alt="Doctor" />
      </div>
    </div>
  );
};

export default Banner;