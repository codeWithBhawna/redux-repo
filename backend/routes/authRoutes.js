import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/domain.js";

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
  try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
          return res.status(400).json({ error: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
      }

      // Create a new user
      const newUser = new User({ name, email, password });
      await newUser.save();

      // Generate JWT Token
      const token = newUser.generateToken();

      res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
      console.error("Error in register route:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT Token
      const token = user.generateToken();

      res.status(200).json({ message: "Login successful", token });
  } catch (error) {
      console.error("Error in login route:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
