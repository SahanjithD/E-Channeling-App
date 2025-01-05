import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css"; // Import the styles

const SignIn = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login logic
    alert("Logged in successfully!");
    navigate("/");
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1>Sign In</h1>
        <form className="signin-form">
          <input
            type="email"
            placeholder="Email"
            className="signin-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="signin-input"
            required
          />
          <button
            type="button"
            className="signin-button"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </form>
        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
