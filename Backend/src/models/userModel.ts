import uservalidationSchema from "../validation/userValidation.ts";
import mongoose from "mongoose";
import { zodSchema } from "@zodyac/zod-mongoose";
import productValidationSchema from "../validation/productValidation.ts";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
