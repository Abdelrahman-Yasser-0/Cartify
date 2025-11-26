import type { IncomingHttpHeaders } from "node:http";
import { ORPCError, os } from "@orpc/server";
import * as z from "zod";
import ProductModel from "../models/productModel.ts";
import productValidationSchema from "../validation/productValidation.ts";
import { log } from "node:console";

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

export const router = {
  user: {
    getProducts: getProducts,
    makeProduct: makeProduct,
  },
};
