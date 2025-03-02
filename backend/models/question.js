import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Link to Category
  title: { type: String, required: true },
  options: [{ type: String, required: true }], // Multiple choice options
  correctAnswer: { type: String, required: true }, // Store the correct answer
});

const Question = mongoose.model("Question", questionSchema);

export { Question }; // ✅ Named export
