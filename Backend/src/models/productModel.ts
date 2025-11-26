import mongoose from "mongoose";
import { zodSchema } from "@zodyac/zod-mongoose";
import productValidationSchema from "../validation/productValidation.ts";

// const productSchema = new mongoose.Schema({
//   //   id?: string;
//   title: { type: String, required: true },
//   brand: { type: String, required: true },
//   rate: { type: String, required: true },
//   price: { type: Number, required: true },
//   originalPrice: { type: Number },
//   discount: { type: Number },
//   imgurl: { type: String, required: true },
//   sku: { type: String },
//   category: { type: String },
//   colors: { type: [String] },
//   description: { type: String },
//   specifications: { type: Map, of: String },
//   reviews: [
//     {
//       author: { type: String },
//       rating: { type: Number },
//       comment: { type: String },
//       date: { type: String },
//     },
//   ],
//   inStock: { type: Boolean, required: true },
//   shortDescription: { type: String },
// });

const productSchema = zodSchema(productValidationSchema);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
