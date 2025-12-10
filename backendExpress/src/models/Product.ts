import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0, required: true },
  soldQuantity: { type: Number, default: 0 },
  rate: { type: String, default: 0 },
  discountPrice: { type: Number },
  discount: { type: Number, default: 0 },
  inStock: { type: Boolean, required: true },
  hasDiscount: { type: Boolean, default: false },
  imgurl: { type: String },
  sku: { type: String },
  category: { type: String, default: "not categorised" },
  colors: { type: [String] },
  description: { type: String },
  specifications: { type: [String] },
  reviews: {
    type: [
      {
        author: { type: String },
        rating: { type: Number },
        comment: { type: String },
        date: { type: String },
      },
    ],
    default: [],
  },

  shortDescription: { type: String },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
