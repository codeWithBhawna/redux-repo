import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ User Schema (For Authentication)
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // ✅ Added Role Field
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt
);

// ✅ Compare Password Method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ✅ Hash Password Before Saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // ✅ Prevents re-hashing if not modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Generate JWT Token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id.toString(),
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ✅ Question Schema (Reference Instead of Embedded)
const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // ✅ Linked to Category
  },
  { timestamps: true }
);



// ✅ Domain Schema
const domainSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

// ✅ Define Models
const User = mongoose.model("User", userSchema);
const Domain = mongoose.model("Domain", domainSchema);


export { User, Domain };
