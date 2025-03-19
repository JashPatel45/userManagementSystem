import dbConnect from "@/db/db";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  try {
    if (req.method === "PUT") {
      const { productCode, productName, baseUom } = req.body;

      if (!productCode || !productName || !baseUom) {
        return res.status(400).json({ error: "ProductCode, ProductName, and BaseUOM are required" });
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { productCode, productName, baseUom },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(updatedProduct);
    }

    if (req.method === "DELETE") {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    }

    res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
