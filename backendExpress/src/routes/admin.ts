// import mongoose from "mongoose";
// import { Router } from "express";
import express from "express";
import Product from "../models/Product.ts";
import { productValidation } from "../validation/productValidation.ts";
// import { userValidation } from "../validation/userValidation.ts";
// import { requireRole } from "../middlewares/authorization.ts";
// import { email } from "zod/v4";
import User from "../models/User.ts";
import createOfferValidation from "../validation/creatOfferVaidation.ts";
const adminRouter = express.Router();

//create product
//only admins
adminRouter.post("/product", async (req, res) => {
  try {
    await productValidation.validateAsync(req.body);

    const createdProduct = await Product.create(req.body);
    res.status(201).send({ data: { createdProduct } });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

//remove Products
adminRouter.delete("/product", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.productId);

    const isExist = await Product.findById(req.body.product);
    if (!isExist) {
      res.status(201).send({ message: "product deleted successfuly" });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

//getUserByEmail
adminRouter.get("/userEmail/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  const user = await User.find({ email: userEmail });
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

export default adminRouter;
