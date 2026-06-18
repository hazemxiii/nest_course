import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await dbConnect();
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "GET") {
      const product = await Product.find({ _id: req.query.id });
      return res.status(200).json({ product });
    }

    if (req.method === "DELETE") {
      const product = await Product.findOneAndDelete({ _id: req.query.id });
      if (product) {
        return res
          .status(201)
          .json({ message: `Deleted product ${product.title}` });
      } else {
        return res.status(404).json({ message: "Product doesn't exist" });
      }
    }

    if (req.method === "PUT") {
      const data = req.body;
      let product = null;
      try {
        product = await Product.findOne({ _id: req.query.id });
      } catch (e) {}
      if (product) {
        await Product.updateOne(
          { _id: req.query.id },
          {
            thumbnail: data.thumbnail || product.thumbnail,
            title: data.title || product.title,
            description: data.description || product.description,
            price: data.price || product.price,
            rating: data.rating || product.rating,
          },
        );
        return res
          .status(201)
          .json({ message: `Updated product ${product.title}` });
      } else {
        return res.status(404).json({ message: "Product doesn't exist" });
      }
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    res.status(500).json({ message: "Unknown Error" });
  }
}
