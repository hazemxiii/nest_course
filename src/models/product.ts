import mongoose, { InferSchemaType } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true },
);

export type Product = InferSchemaType<typeof productSchema>;

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
