import mongoose from "mongoose";
import Users from "@/models/Users"; // Create a Mongoose Model

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await Users.find(); // Fetch from DB
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const { name, email, mobile } = req.body;
    if (!name || !email || !mobile) {
      return res.status(400).json({ error: "Name, Mobile and email are required" });
    }

    const newUser = new Users({ name, email, mobile });
    await newUser.save(); // Save to DB
    return res.status(201).json(newUser);
  }

  if (req.method === "PUT") {
    console.log("Request body:", req.body); // Debugging line
    const { id, name, email, mobile } = req.body;
  
    if (!id || !name || !email || !mobile) {
      return res.status(400).json({ error: "ID, Name, Email, and Mobile are required" });
    }
  
    try {
      const updatedUser = await Users.findByIdAndUpdate(
        id,
        { name, email, mobile },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) return res.status(404).json({ error: "User not found" });
  
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

  if (req.method === "DELETE") {
    const id = req.query.id || req.body.id;
    if (!id) return res.status(400).json({ error: "User ID is required" });

    const deletedUser = await Users.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ message: "User deleted successfully" });
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
