import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  domainId: { type: mongoose.Schema.Types.ObjectId, ref: "Domain", required: true }, // Link to Domain
  name: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], // Store question references
});

const Category = mongoose.model("Category", categorySchema);

export { Category }; // ✅ Named export
