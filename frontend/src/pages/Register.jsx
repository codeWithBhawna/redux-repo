import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Import Link for navigation
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Correct placement

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      
      if (response.status === 201) {
        navigate("/dashboard"); // ✅ Navigate to Dashboard
      }
    } catch  {
      setError("Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="register-input" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="register-input" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="register-input" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="register-input" />
          <button type="submit" className="register-button">Register</button>
        </form>
        
        {/* Login Button */}
        <p className="login-text">Already have an account?</p>
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </div>
  );
};

export default Register;
