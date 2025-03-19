import dbConnect from "@/db/db";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const products = await Product.find();
      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      const { productCode, productName, baseUom } = req.body;

      if (!productCode || !productName || !baseUom) {
        return res.status(400).json({ error: "ProductCode, ProductName, and BaseUOM are required" });
      }

      const newProduct = new Product({ productCode, productName, baseUom });
      await newProduct.save();
      return res.status(201).json(newProduct);
    }

    res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
