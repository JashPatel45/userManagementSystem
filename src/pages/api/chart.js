import Users from "@/models/Users"; // Import your Users model
import Product from "@/models/Product"; // Import your Product model
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Example: Fetch user activity data
      const userActivityData = await Users.aggregate([
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" }, // Group by day of the week
            count: { $sum: 1 }, // Count users created on that day
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
      const formattedData = userActivityData.map((item) => ({
        day: item._id, // Day of the week
        count: item.count, // Count of users
      }));

      return res.status(200).json(formattedData);
    } catch (error) {
      console.error("Chart API error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
} 