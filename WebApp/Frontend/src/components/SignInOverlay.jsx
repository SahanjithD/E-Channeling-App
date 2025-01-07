import React from "react";
import "./SignInOverlay.css"; // Import the styles

const SignInOverlay = ({ onClose }) => {
  return (
    <div className="overlay-container">
      <div className="overlay-background" onClick={onClose}></div>
      <div className="overlay-content">
        <h2>Please Sign In</h2>
        <p>You need to sign in to see this content.</p>
        <button className="overlay-button" onClick={onClose}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInOverlay;
