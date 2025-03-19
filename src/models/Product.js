import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    baseUom: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
  }
);

// Middleware to update `updatedAt` when modifying an existing document
ProductSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Middleware to handle `findOneAndUpdate()`, `updateOne()`, and `updateMany()`
ProductSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

// If model already exists, use it, otherwise create a new one
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
