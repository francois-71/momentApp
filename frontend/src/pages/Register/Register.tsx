// Register.tsx

import React, { useState } from "react";
import "./register.css";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value === "" ? "" : parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add validation logic (e.g., checking if passwords match)
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      //fetch POST localhost:3001/register
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, age }),
      });
      const data = await response.json();
      if (response.ok) {
        // Redirect to home page
        window.location.href = "/";
      } else {
        // If registration fails, display error message
        setMessage(data.message);
        setErrors(data.errors);
        console.log(data);
        console.log("errors", errors);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Register</h1>
        {message && <p className="error-message">{message}</p>}
        {errors && (
          <ul className="error-list">
            {errors.map((error, index) => (
              <li key={index} className="error-message">
                {error}
              </li>
            ))}
          </ul>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              placeholder="John Doe"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              placeholder="john.doe@example.com"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              placeholder="***********"
              type="password"
              id="password"
              name="password"
              autoComplete="on"
              value={password}
              onChange={handlePasswordChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              placeholder="***********"
              type="password"
              id="confirmPassword"
              autoComplete="on"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={age === "" ? "" : age}
              onChange={handleAgeChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
