import React, { useState } from "react";
import "./SignUp.css"; // Import the CSS styles

const SignUp = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const userData = {
      name,
      age: parseInt(age, 10), // Ensure age is sent as a number
      email,
      password,
      gender,
      phoneNumber,
    };

    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess("User registered successfully!");
        console.log("User Registered:", result);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error registering user");
        console.error("Error:", errorData);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="signup-input"
            required
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default SignUp;
