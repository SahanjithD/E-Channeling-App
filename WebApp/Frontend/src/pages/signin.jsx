import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store the token
        alert("Logged in successfully!");
        navigate("/"); // Redirect to home page
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to log in");
      }
    } catch (error) {
      
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1>Sign In</h1>
        <form
          className="signin-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            className="signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signin-button">
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
