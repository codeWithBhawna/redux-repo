import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddQuestion.css";

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  // Fetch questions when categoryId is entered
  useEffect(() => {
    if (formData.categoryId) {
      fetchQuestions(formData.categoryId);
    }
  }, [formData.categoryId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle option changes
  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  // Fetch questions for the selected category
  const fetchQuestions = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/categories/${categoryId}/questions`);
      setQuestions(response.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to fetch questions.");
    }
  };

  // Handle form submission for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editingQuestionId) {
        // Update existing question
        await axios.put(`http://localhost:5000/api/questions/${editingQuestionId}`, formData);
        alert("Question updated successfully!");
        setEditingQuestionId(null);
      } else {
        // Add new question
        await axios.post(`http://localhost:5000/api/categories/${formData.categoryId}/questions`, formData);
        alert("Question added successfully!");
      }
      setFormData({ categoryId: formData.categoryId, title: "", options: ["", "", "", ""], correctAnswer: "" });
      fetchQuestions(formData.categoryId);
    } catch  {
      setError("Failed to add/update question. Please try again.");
    }
    setLoading(false);
  };

  // Edit question
  const handleEdit = (question) => {
    setFormData({
      categoryId: formData.categoryId,
      title: question.title,
      options: question.options,
      correctAnswer: question.correctAnswer,
    });
    setEditingQuestionId(question._id);
  };

  // Delete question with confirmation
  const handleDelete = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`http://localhost:5000/api/questions/${questionId}`);
        alert("Question deleted successfully!");
        fetchQuestions(formData.categoryId);
      } catch  {
        setError("Failed to delete question.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>{editingQuestionId ? "Edit Question" : "Add Question"}</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="form-content">
        <input type="text" name="categoryId" placeholder="Category ID" value={formData.categoryId} onChange={handleChange} required />
        <input type="text" name="title" placeholder="Question Title" value={formData.title} onChange={handleChange} required />
        {formData.options.map((opt, index) => (
          <input key={index} type="text" placeholder={`Option ${index + 1}`} value={opt} onChange={(e) => handleOptionChange(index, e.target.value)} required />
        ))}
        <input type="text" name="correctAnswer" placeholder="Correct Answer" value={formData.correctAnswer} onChange={handleChange} required />
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Processing..." : editingQuestionId ? "Update Question" : "Add Question"}
        </button>
      </form>

      {/* Display Questions */}
      <h3>Existing Questions</h3>
      {questions.length === 0 ? (
        <p>No questions found for this category.</p>
      ) : (
        <ul className="question-list">
          {questions.map((question) => (
            <li key={question._id} className="question-item">
              <strong>{question.title}</strong>
              <ul>
                {question.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
              <button onClick={() => handleEdit(question)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(question._id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddQuestion;
