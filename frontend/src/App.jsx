import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/publicRoutes";
import AuthRoutes from "./routes/authRoutes";
import DashboardRoutes from "./routes/dashboardRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddDomain from "./pages/AddDomain";
import AddCategory from "./pages/AddCategory";
import AddQuestion from "./pages/AddQuestion";

function App() {
  return (
    <div className="app-container">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-domain" element={<AddDomain />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-question" element={<AddQuestion />} />
        {PublicRoutes()}
        {AuthRoutes()}
        {DashboardRoutes()}
      </Routes>
    </div>
  );
}
export default App;