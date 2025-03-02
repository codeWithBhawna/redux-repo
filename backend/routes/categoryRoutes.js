import express from "express";
import { Category } from "../models/category.js";

const router = express.Router();

// ✅ 1. Create a New Category (POST /api/domains/:domainId/categories)
router.post("/:domainId/categories", async (req, res) => {
  try {
    const { name } = req.body;
    const { domainId } = req.params;

    const newCategory = new Category({ name, domainId });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
});

// ✅ 2. Get All Categories in a Domain (GET /api/domains/:domainId/categories)
router.get("/:domainId/categories", async (req, res) => {
  try {
    const { domainId } = req.params;
    const categories = await Category.find({ domainId }).populate("questions");

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

// ✅ 3. Update a Category Name (PUT /api/categories/:categoryId)
router.put("/:categoryId", async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
});

// ✅ 4. Delete a Category (DELETE /api/categories/:categoryId)
router.delete("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
});

export default router;
