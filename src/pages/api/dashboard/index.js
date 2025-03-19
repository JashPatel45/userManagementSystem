import dbConnect from "@/db/db";
import Users from "@/models/Users";
import Product from "@/models/Product";
import Dashboard from "@/models/Dashboard";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Fetch total counts
      const totalUsers = await Users.countDocuments();
      const totalProducts = await Product.countDocuments();

      // Update dashboard stats
      await Dashboard.findOneAndUpdate(
        {},
        { totalUsers, totalProducts, lastUpdated: new Date() },
        { upsert: true, new: true }
      );

      // Fetch user activity data
      const userActivityData = await Users.aggregate([
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" }, // Group by day of the week
            count: { $sum: 1 }, // Count users created on that day
          },
        },
      ]);

      // Fetch product activity data
      const productActivityData = await Product.aggregate([
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" }, // Group by day of the week
            count: { $sum: 1 }, // Count products created on that day
          },
        },
      ]);

      // Format data
      const formattedUserActivity = userActivityData.map((item) => ({
        day: item._id,
        count: item.count,
      }));

      const formattedProductActivity = productActivityData.map((item) => ({
        day: item._id,
        count: item.count,
      }));

      // Response
      return res.status(200).json({
        totalUsers,
        totalProducts,
        userActivity: formattedUserActivity,
        productActivity: formattedProductActivity,
      });
    } catch (error) {
      console.error("Dashboard API error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
