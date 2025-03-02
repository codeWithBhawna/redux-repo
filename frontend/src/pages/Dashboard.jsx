import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="dashboard-subtitle">Manage your domains, categories, and questions efficiently.</p>
      <div className="dashboard-links">
        <Link to="/add-domain" className="dashboard-button">➕ Add Domain</Link>
        <Link to="/add-category" className="dashboard-button">📂 Add Category</Link>
        <Link to="/add-question" className="dashboard-button">❓ Add Question</Link>
      </div>
    </div>
  );
};

export default Dashboard;
