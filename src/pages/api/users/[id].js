import dbConnect from "@/db/db";
import Users from "@/models/Users";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  try {
    if (req.method === "PUT") {
      const { name, email, mobile } = req.body;
      if (!id || !name || !email || !mobile) {
        return res.status(400).json({ error: "ID, Name, Email, and Mobile are required" });
      }

      const updatedUser = await Users.findByIdAndUpdate(
        id,
        { name, email, mobile },
        { new: true, runValidators: true }
      );

      if (!updatedUser) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(updatedUser);
    }

    if (req.method === "DELETE") {
      const deletedUser = await Users.findByIdAndDelete(id);
      if (!deletedUser) return res.status(404).json({ error: "User not found" });

      return res.status(200).json({ message: "User deleted successfully" });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
