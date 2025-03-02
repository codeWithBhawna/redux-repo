import express from "express";
import bcrypt from "bcryptjs";
import { User, Domain } from "../models/domain.js";
import {Category } from "../models/category.js";
import{Question} from "../models/question.js";

const router = express.Router();

// ✅ Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.post("/", async (req, res) => {
  try {
      const { name, description } = req.body;

      if (!name || !description) {
          return res.status(400).json({ error: "All fields are required" });
      }

      const newDomain = new Domain({ name, description });
      await newDomain.save();

      res.status(201).json({ message: "Domain added successfully", domain: newDomain });
  } catch (error) {
      console.error("Error adding domain:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get all domains
router.get("/", async (req, res) => {
  try {
      const domains = await Domain.find();
      res.status(200).json(domains);
  } catch (error) {
      console.error("Error fetching domains:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Update a domain by ID
router.put("/:id", async (req, res) => {
  try {
      const { name } = req.body;
      const updatedDomain = await Domain.findByIdAndUpdate(req.params.id, { name }, { new: true });

      if (!updatedDomain) return res.status(404).json({ error: "Domain not found" });

      res.status(200).json({ message: "Domain updated", domain: updatedDomain });
  } catch (error) {
      console.error("Error updating domain:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete a domain by ID
router.delete("/:id", async (req, res) => {
  try {
      const deletedDomain = await Domain.findByIdAndDelete(req.params.id);

      if (!deletedDomain) return res.status(404).json({ error: "Domain not found" });

      res.status(200).json({ message: "Domain deleted successfully" });
  } catch (error) {
      console.error("Error deleting domain:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
