import mongoose from "mongoose";
import { Router } from "express";
import express from "express";
import Product from "../models/Product.ts";
// import { userValidation } from "../validation/userValidation.ts";
const productRouter = express.Router();

// userRouter.get("/", async (req, res) => {
//   const users = await User.find();
//   res.send(users);
// });
productRouter.post("/", async (req, res) => {
  const createdProduct = await Product.create(req.body);
  res.status(201).send({ data: { createdProduct } });
});

export default productRouter;
