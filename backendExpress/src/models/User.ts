// import { optional } from "joi";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,

  // store only the hashed password
  passwordHash: { type: String },

  role: { type: String, enum: ["user", "admin"], default: "user" },

  shippingAddress: {
    country: String,
    city: String,
    streetAddress: String,
    apartment: String,
    zip: String,
  },

  additionalInformation: {
    company: String,
    notes: String,
  },

  communicationPrefrences: {
    email: Boolean,
    sms: Boolean,
  },

  cart: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  },
  purchased: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
        status: String,
        date: Number,
      },
    ],
    default: [],
  },
  wishingList: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    default: [],
  },
});
const User = mongoose.model("users", UserSchema);
export default User;
