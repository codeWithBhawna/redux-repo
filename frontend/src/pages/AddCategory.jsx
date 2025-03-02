import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddCategory.css";

const AddCategory = () => {
  const [formData, setFormData] = useState({ domainId: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedDomainId, setSelectedDomainId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  // Fetch categories for a selected domain
  useEffect(() => {
    if (selectedDomainId) {
      fetchCategories(selectedDomainId);
    }
  }, [selectedDomainId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fetch categories within a domain
  const fetchCategories = async (domainId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/domains/${domainId}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to fetch categories");
    }
  };

  // Add a new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/domains/${formData.domainId}/categories`, {
        name: formData.name,
      });
      alert("Category added successfully");
      setFormData({ domainId: "", name: "" });
      fetchCategories(formData.domainId);
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  // Update category name
  const handleUpdateCategory = async (categoryId) => {
    try {
      await axios.put(`http://localhost:5000/api/categories/${categoryId}`, {
        name: newCategoryName,
      });
      alert("Category updated successfully");
      setEditCategoryId(null);
      fetchCategories(selectedDomainId);
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category");
    }
  };

  // Delete a category
  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryId}`);
      alert("Category deleted successfully");
      fetchCategories(selectedDomainId);
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Manage Categories</h2>

      {/* Add Category Form */}
      <form className="form-content" onSubmit={handleSubmit}>
        <input
          type="text"
          name="domainId"
          placeholder="Domain ID"
          value={formData.domainId}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* Fetch and Display Categories */}
      <div>
        <h3>View & Manage Categories</h3>
        <input
          type="text"
          placeholder="Enter Domain ID to View Categories"
          value={selectedDomainId}
          onChange={(e) => setSelectedDomainId(e.target.value)}
          className="form-input"
        />
        <button onClick={() => fetchCategories(selectedDomainId)} className="form-button">
          Fetch Categories
        </button>

        {categories.length > 0 && (
          <ul className="category-list">
            {categories.map((category) => (
              <li key={category._id} className="category-item">
                {editCategoryId === category._id ? (
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                ) : (
                  <span>{category.name}</span>
                )}
                {editCategoryId === category._id ? (
                  <button onClick={() => handleUpdateCategory(category._id)} className="update-btn">
                    Save
                  </button>
                ) : (
                  <button onClick={() => setEditCategoryId(category._id)} className="edit-btn">
                    Edit
                  </button>
                )}
                <button onClick={() => handleDeleteCategory(category._id)} className="delete-btn">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};



export default AddCategory;
