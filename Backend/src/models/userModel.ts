import uservalidationSchema from "../validation/userValidation.ts";
import mongoose from "mongoose";
import { zodSchema } from "@zodyac/zod-mongoose";
import productValidationSchema from "../validation/productValidation.ts";

const userSchema = zodSchema(uservalidationSchema);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
