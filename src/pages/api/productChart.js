import Product from "@/models/Product"; // Import your Product model
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Example: Fetch product activity data
      const productActivityData = await Product.aggregate([
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" }, // Group by day of the week
            count: { $sum: 1 }, // Count products created on that day
          },
        },
        {
          $project: {
            day: { $arrayElemAt: ["$days", 0] }, // Get the day of the week
            count: 1,
          },
        },
      ]);

      // Format the data for the chart
      const formattedData = productActivityData.map((item) => ({
        day: item._id, // Day of the week
        count: item.count, // Count of products
      }));

      return res.status(200).json(formattedData);
    } catch (error) {
      console.error("Product Chart API error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
} 