import mongoose from "mongoose";
import { Router } from "express";
import express from "express";
import Product from "../models/Product.ts";
import { productValidation } from "../validation/productValidation.ts";
// import { userValidation } from "../validation/userValidation.ts";
import { requireRole } from "../middlewares/authorization.ts";
const productRouter = express.Router();

//create product
//only admins
// productRouter.post("/", requireRole("admin"), async (req, res) => {
//   try {
//     await productValidation.validateAsync(req.body);

//     const createdProduct = await Product.create(req.body);
//     res.status(201).send({ data: { createdProduct } });
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "An error occurred";
//     res.status(400).send({ message: errorMessage });
//   }
// });

//get all products
productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

//get product by id
productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404).send({ message: "User not found" });
  }
  res.send(product);
});

export default productRouter;
