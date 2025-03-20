import dbConnect from "@/db/db";
import Users from "@/models/Users";
import formatUserResponse from "@/Middleware/formatDateMiddleware";

export default async function handler(req, res) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const users = await Users.find();
      return formatUserResponse(res, users); // Apply middleware after fetching data
    }

    if (req.method === "POST") {
      const { name, email, mobile } = req.body;
      if (!name || !email || !mobile) {
        return res.status(400).json({ error: "Name, Mobile, and Email are required" });
      }

      const newUser = await Users.create({ name, email, mobile });
      return formatUserResponse(res, newUser); // Apply middleware to format response
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
