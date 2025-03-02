import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddDomain.css";

const AddDomain = () => {
  const [domains, setDomains] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  // ✅ Fetch all domains
  const fetchDomains = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/domains");
      setDomains(res.data);
    } catch (error) {
      console.error("Error fetching domains:", error);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  // ✅ Handle form submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/domains/${editId}`, { name });
        alert("Domain updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/domains", { name, description });
        alert("Domain added successfully");
      }
      setName("");
      setDescription("");
      setEditId(null);
      fetchDomains();
    } catch  {
      alert("Error saving domain");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this domain?")) {
      try {
        await axios.delete(`http://localhost:5000/api/domains/${id}`);
        alert("Domain deleted successfully");
        fetchDomains();
      } catch  {
        alert("Error deleting domain");
      }
    }
  };

  // ✅ Handle edit
  const handleEdit = (domain) => {
    setEditId(domain._id);
    setName(domain.name);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{editId ? "Edit Domain" : "Add Domain"}</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          placeholder="Domain Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
        {!editId && (
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-textarea"
          />
        )}
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Processing..." : editId ? "Update Domain" : "Add Domain"}
        </button>
      </form>

      <h2 className="form-title">Existing Domains</h2>
      <ul className="domain-list">
        {domains.map((domain) => (
          <li key={domain._id} className="domain-item">
            <span>{domain.name}</span>
            <div>
              <button className="edit-btn" onClick={() => handleEdit(domain)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(domain._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddDomain;
