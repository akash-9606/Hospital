import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);

    if (!emailRegex.test(input)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/drivers/forgot-password", // ✅ Correct route
        { email }
      );

      const data = response.data;

      if (data.status) {
        alert("Check your email for reset password link");
        navigate("/");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container" style={{ height: "90%" }}>
      <div className="wrapper d-flex align-items-center justify-content-center h-100">
        <div className="card register-form">
          <div className="card-body">
            <h5 className="card-title text-center">Forgot Password</h5>
            <form onSubmit={handleSend}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${emailError ? "is-invalid" : ""}`}
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                />
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="forgot-password-home-icon">
          <a href="/" className="home-icon">
            <i className="fa fa-home"></i>
            <span className="tooltip-text">Home</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
