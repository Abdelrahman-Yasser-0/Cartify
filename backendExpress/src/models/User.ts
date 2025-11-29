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

  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  purchased: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      status: String,
    },
  ],
  wishingList: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
});
const User = mongoose.model("users", UserSchema);
export default User;
