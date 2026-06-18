import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  if (req.method === "GET") {
    let products = await Product.find({});
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      products = products.slice(0, 3);
    }
    return res.status(200).json({ products });
  }

  if (req.method === "POST") {
    const product = await Product.create(req.body);
    return res.status(201).json({ product });
  }

  res.status(405).json({ error: "Method not allowed" });
}
