import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>(""); // TODO: use this to display error message on login failure
  // list of errors
  const [errors, setErrors] = useState<string[]>([]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login successful, store token in local storage
        localStorage.setItem("token", data.token);
        // Redirect to home page
        window.location.href = "/home";
      } else {
        // If login fails, display error message
        setMessage(data.message);
        setErrors(data.errors);
        console.log("errors", errors)
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title"> Login </h1>
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              autoComplete="on"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
