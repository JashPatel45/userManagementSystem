import mongoose from "mongoose";
import Users from "@/models/Users";
import Product from "@/models/Product";
import Dashboard from "@/models/Dashboard";

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch current user and product counts dynamically
      const totalUsers = await Users.countDocuments();
      const totalProducts = await Product.countDocuments();

      // Update or insert dashboard record
      await Dashboard.findOneAndUpdate(
        {},
        { totalUsers, totalProducts, lastUpdated: new Date() },
        { upsert: true, new: true }
      );

      return res.status(200).json({ totalUsers, totalProducts });
    } catch (error) {
      console.error("Dashboard API error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}