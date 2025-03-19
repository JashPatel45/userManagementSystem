import mongoose from "mongoose";

const DashboardSchema = new mongoose.Schema(
  {
    totalUsers: { type: Number, required: true, default: 0 },
    totalProducts: { type: Number, required: true, default: 0 },
    totalOrders: { type: Number, required: true, default: 0 }, // Example for future extension
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Middleware to update `lastUpdated`
DashboardSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

DashboardSchema.pre(["findOneAndUpdate", "updateOne"], function (next) {
  this.set({ lastUpdated: new Date() });
  next();
});

export default mongoose.models.Dashboard || mongoose.model("Dashboard", DashboardSchema);
