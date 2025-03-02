import Domain from "../model/domain.js";

// Get all domains
export const getDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new domain
export const createDomain = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Domain name required" });

  const domain = new Domain({ name, categories: [] });
  await domain.save();
  res.status(201).json(domain);
};

// Delete a domain
export const deleteDomain = async (req, res) => {
  await Domain.findByIdAndDelete(req.params.id);
  res.json({ message: "Domain deleted" });
};

// Add a category to a domain
export const addCategory = async (req, res) => {
  const { name } = req.body;
  const domain = await Domain.findById(req.params.domainId);
  if (!domain) return res.status(404).json({ message: "Domain not found" });

  domain.categories.push({ name, questions: [] });
  await domain.save();
  res.status(201).json(domain);
};

// Delete a category from a domain
export const deleteCategory = async (req, res) => {
  const domain = await Domain.findById(req.params.domainId);
  if (!domain) return res.status(404).json({ message: "Domain not found" });

  domain.categories = domain.categories.filter(c => c._id.toString() !== req.params.categoryId);
  await domain.save();
  res.json(domain);
};

// Add a question to a category
export const addQuestion = async (req, res) => {
  const { title, options, correctAnswer } = req.body;
  const domain = await Domain.findById(req.params.domainId);
  if (!domain) return res.status(404).json({ message: "Domain not found" });

  const category = domain.categories.find(c => c._id.toString() === req.params.categoryId);
  if (!category) return res.status(404).json({ message: "Category not found" });

  category.questions.push({ title, options, correctAnswer });
  await domain.save();
  res.status(201).json(domain);
};

// Delete a question from a category
export const deleteQuestion = async (req, res) => {
  const domain = await Domain.findById(req.params.domainId);
  if (!domain) return res.status(404).json({ message: "Domain not found" });

  const category = domain.categories.find(c => c._id.toString() === req.params.categoryId);
  if (!category) return res.status(404).json({ message: "Category not found" });

  category.questions = category.questions.filter(q => q._id.toString() !== req.params.questionId);
  await domain.save();
  res.json(domain);
};
