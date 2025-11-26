import type { IncomingHttpHeaders } from "node:http";
import { ORPCError, os } from "@orpc/server";
import * as z from "zod";
import ProductModel from "../models/productModel.ts";
import productValidationSchema from "../validation/productValidation.ts";
import { log } from "node:console";
import userValidationSchema from "../validation/userValidation.ts";
import UserModel from "../models/userModel.ts";
import bcrypt from "bcryptjs";

const getProducts = os
  .route({ method: "GET", path: "/products" })
  .output(z.object({ products: z.array(productValidationSchema) }))
  .handler(async () => {
    // const products = await ProductModel.find();
    // console.log("Fetched products:", products);
    // return { products: products };
    const products = await ProductModel.find().lean();

    const normalized = products.map((p) => ({
      ...p,
      // if specifications is already a plain object, leave it as-is
      specifications: p.specifications ?? undefined,
    }));

    return { products: normalized };
  });

const makeProduct = os
  .route({ method: "POST", path: "/products" })
  .input(productValidationSchema)
  .output(productValidationSchema)
  .handler(async ({ input }) => {
    await ProductModel.create(input);
    console.log("Created product:", input);
    return input;
  });

const register = os
  .route({ method: "POST", path: "/auth/register" })
  .input(userValidationSchema)
  .output(z.object({ id: z.string(), email: z.string(), role: z.string() }))
  .handler(async ({ input: { name, email, password, role } }) => {
    const existing = await UserModel.findOne({ email });
    if (existing) throw new Error("Email already exists");

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      passwordHash,
      role,
    });

    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };
  });

export const router = {
  products: {
    getProducts: getProducts,
    makeProduct: makeProduct,
  },
  user: {
    register: register,
  },
};
