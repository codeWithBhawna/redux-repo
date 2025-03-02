import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Import Link for navigation
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Correct placement

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
      
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // ✅ Store token for authentication
        navigate("/dashboard"); // ✅ Navigate to Dashboard
      }
    } catch {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} className="login-input" />
          <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} className="login-input" />
          <button type="submit" className="login-button">Login</button>
        </form>
        
        {/* Register Button */}
        <p className="register-text">Don't have an account?</p>
        <Link to="/register" className="register-button">Register</Link>
      </div>
    </div>
  );
};

export default Login;
