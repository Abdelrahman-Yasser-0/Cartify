import mongoose from "mongoose";
import { zodSchema } from "@zodyac/zod-mongoose";
import productValidationSchema from "../validation/productValidation.ts";
import { uuidv4 } from "zod/v4";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  rate: { type: String, required: true },
  price: { type: Number, required: true },
  Price: { type: Number },
  discount: { type: Number },
  imgurl: { type: String, required: true },
  sku: { type: String },
  category: { type: String },
  colors: { type: [String] },
  description: { type: String },
  specifications: { type: Map, of: String },
  reviews: [
    {
      author: { type: String },
      rating: { type: Number },
      comment: { type: String },
      date: { type: String },
    },
  ],
  inStock: { type: Boolean, required: true },
  shortDescription: { type: String },
});

/*,
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create a virtual "id" that maps to "_id"
productSchema.virtual("id").get(function () {
  return this._id.toHexString(); // convert ObjectId to string
});*/
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
