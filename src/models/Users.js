import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null }, // Initially null
  }
);

// Middleware to update `updatedAt` only when modifying an existing document
UserSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Middleware to handle `findOneAndUpdate()` and `updateOne()`
UserSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

// If model already exists, use it, otherwise create a new one
export default mongoose.models.User || mongoose.model("User", UserSchema);
