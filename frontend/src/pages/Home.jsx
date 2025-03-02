import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import external CSS

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to MyApp</h1>
        <p className="home-subtitle">
          A simple and powerful application to manage your tasks efficiently.
        </p>
        <div className="home-buttons">
          <Link to="/login" className="home-button login">Login</Link>
          <Link to="/register" className="home-button register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
