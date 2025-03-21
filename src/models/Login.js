import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema(
  {
    email: { type: String, required: true }, // User email for login
    ipAddress: { type: String, required: true }, // Store IP address of login attempt
    userAgent: { type: String }, // Store browser details
    status: { type: String, enum: ["Success", "Failed"], required: true }, // Track login status
    createdAt: { type: Date, default: Date.now }, // Timestamp of login attempt
  }
);

// If model already exists, use it, otherwise create a new one
export default mongoose.models.Login || mongoose.model("Login", LoginSchema);
