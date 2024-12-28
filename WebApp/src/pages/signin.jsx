// SignIn.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login logic
    alert("Logged in successfully!");
    navigate("/");
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="button" onClick={handleLogin}>
          Sign In
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "blue", textDecoration: "underline" }}>
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
