import express from "express";
import { Question } from "../models/question.js";

const router = express.Router();

// ✅ 1. Create a New Question (POST /api/categories/:categoryId/questions)
router.post("/:categoryId/questions", async (req, res) => {
  try {
    const { title, options, correctAnswer } = req.body;
    const { categoryId } = req.params;

    const newQuestion = new Question({ categoryId, title, options, correctAnswer });
    await newQuestion.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
});

// ✅ 2. Get All Questions in a Category (GET /api/categories/:categoryId/questions)
router.get("/:categoryId/questions", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const questions = await Question.find({ categoryId });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
});

// ✅ 3. Update a Question (PUT /api/questions/:questionId)
router.put("/:questionId", async (req, res) => {
  try {
    const { title, options, correctAnswer } = req.body;
    const { questionId } = req.params;

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { title, options, correctAnswer },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error });
  }
});

// ✅ 4. Delete a Question (DELETE /api/questions/:questionId)
router.delete("/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error });
  }
});

export default router;
