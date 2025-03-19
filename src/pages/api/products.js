import mongoose from "mongoose";
import Product from "@/models/Product"; // Ensure you have a Product model

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await Product.find(); // Fetch all products
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  if (req.method === "POST") {
    const { productCode, productName, baseUom } = req.body;

    if (!productCode || !productName || !baseUom) {
      return res.status(400).json({ error: "ProductCode, ProductName, and BaseUOM are required" });
    }

    try {
      const newProduct = new Product({ productCode, productName, baseUom });
      await newProduct.save(); // Save to DB
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ error: "Failed to add product" });
    }
  }

  if (req.method === "PUT") {
    const { productId, productCode, productName, baseUom } = req.body;


    if (!productId || !productCode || !productName || !baseUom) {
      return res.status(400).json({ error: "ID, ProductCode, ProductName, and BaseUOM are required" });
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { productCode, productName, baseUom },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update product" });
    }
  }
  if (req.method === "DELETE") {
    const id = req.query.productId;
    if (!id) return res.status(400).json({ error: "Product ID is required" });

    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete product" });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
