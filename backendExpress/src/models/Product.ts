import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },

  rate: { type: String },
  originalPrice: { type: Number },
  discount: { type: Number },
  imgurl: { type: String },
  sku: { type: String },
  category: { type: String },
  colors: { type: [String] },
  description: { type: String },
  specifications: { type: [String] },
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

const Product = mongoose.model("Product", productSchema);
export default Product;
