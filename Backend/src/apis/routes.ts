import type { IncomingHttpHeaders } from "node:http";
import { ORPCError, os } from "@orpc/server";
import * as z from "zod";
import ProductModel from "../models/productModel.ts";
import productValidationSchema from "../validation/productValidation.ts";
import { log } from "node:console";
import userValidationSchema from "../validation/userValidation.ts";
import UserModel from "../models/userModel.ts";
import bcrypt from "bcryptjs";
import { signToken } from "../lib/jwt.ts";
import { tr } from "zod/v4/locales";
import { $input, any } from "zod/v4";

//-----------------------------------------products
const makeProduct = os //done
  .route({ method: "POST", path: "/products" })
  .input(productValidationSchema)
  .output(z.any())
  .handler(async ({ input }) => {
    const product = await ProductModel.create(input);
    const plainProduct = product.toObject(); // Convert Mongoose doc to plain JS object

    return plainProduct; // Validate output
  });

const getProducts = os //done
  .route({ method: "GET", path: "/products" })
  .output(z.object({ products: z.array(z.any()) }))
  .handler(async () => {
    // const products = await ProductModel.find();
    // console.log("Fetched products:", products);
    // return { products: products };
    const products = await ProductModel.find().lean();

    // const normalized = products.map((p) => ({
    //   ...p,
    //   _id: p._id.toString(), // convert Mongo ObjectId to string
    //   specifications: p.specifications ?? undefined,
    // }));

    return { products: products };
  });

const getProductsByCategory = os //done
  .route({ method: "GET", path: "/products/{category}" })
  .input(z.object({ category: z.string() }))
  .output(z.array(z.any()))
  .handler(async ({ input }) => {
    const docs = await ProductModel.find({ category: input.category }).lean();
    return docs;
  });

const addToCart = os //done
  .route({ method: "PUT", path: "/addToCart" })
  .input(
    z.object({
      productId: z.union([z.string(), z.any()]),
      userId: z.union([z.string(), z.any()]),
      quantity: z.number(),
    })
  )
  .output(z.any())
  .handler(async ({ input }) => {
    const user = await UserModel.findById(input.userId);
    const product = await ProductModel.findById(input.productId);
    console.log(user);
    console.log(product);
    if (!user || !product) {
      return "User or Product not found";
    }

    user.cart.push({
      productId: product._id,
      quantity: input.quantity,
    });

    await user.save();

    return "product added successfuly";
  });

const buyProduct = os
  .route({ method: "POST", path: "/buy/product" })
  .input(
    z.object({
      productId: z.union([z.string(), z.any()]),
      userId: z.union([z.string(), z.any()]),
      quantity: z.number(),
    })
  )
  .output(z.any())
  .handler(async ({ input }) => {
    const user = await UserModel.findById(input.userId);
    const product = await ProductModel.findById(input.productId);
    console.log(user);
    console.log(product);

    if (!user || !product) {
      return "User or Product not found";
    }

    product.quantity;
  });
// --------------------------------------------------------------user

const register = os //done
  .route({ method: "POST", path: "/auth/register" })
  .input(userValidationSchema)
  .output(z.any())
  .handler(async ({ input }) => {
    const existing = await UserModel.findOne({ email: input.email });
    if (existing) throw new Error("Email already exists");

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await UserModel.create({
      ...input,
      passwordHash,
    });

    const plainUser = user.toObject();
    // delete plainUser.passwordHash;

    return userValidationSchema.omit({ password: true }).parse(plainUser);
  });

const login = os //done
  .route({ method: "POST", path: "/auth/login" })
  .input(z.object({ email: z.string().email(), password: z.string() }))
  .output(z.object({ token: z.string() }))
  .handler(async ({ input: { email, password } }) => {
    console.log("login req recieved");
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(password, user.passwordHash); //password is the passed password but user.password is the original password
    if (!valid) throw new Error("Invalid email or password");

    console.log("signing");
    const token = signToken({
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    });
    console.log("signed done");
    console.log(user._id);

    return { token };
  });

export const router = {
  products: {
    getProducts: getProducts,
    makeProduct: makeProduct,
    getProductsByCategory: getProductsByCategory,
    addToCart: addToCart,
  },
  user: {
    register: register,
    login: login,
  },
};
