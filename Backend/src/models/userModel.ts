import uservalidationSchema from "../validation/userValidation.ts";
import mongoose from "mongoose";
import { zodSchema } from "@zodyac/zod-mongoose";
import productValidationSchema from "../validation/productValidation.ts";
import { uuidv4 } from "zod/v4";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,

    // store only the hashed password
    passwordHash: { type: String, required: true },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    shpingAddress: {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create a virtual "id" that maps to "_id"
userSchema.virtual("id").get(function () {
  return this._id.toHexString(); // convert ObjectId to string
});

// const userSchema = zodSchema(uservalidationSchema);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
