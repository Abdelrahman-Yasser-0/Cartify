import mongoose from "mongoose";
import { Router } from "express";
import express from "express";
import Product from "../models/Product.ts";
import { productValidation } from "../validation/productValidation.ts";
import { userValidation } from "../validation/userValidation.ts";
import User from "../models/User.ts";
import Joi from "joi";
import { addToCartValidation } from "../validation/addToCartValidation.ts";
const cartRouter = express.Router();

// add product to the user cart
cartRouter.put("/addProduct", async (req, res) => {
  try {
    console.log("started adding to cart");
    await addToCartValidation.validateAsync(req.body);

    const product = await Product.findById(req.body.productId);
    const user = await User.findById(req.body.userId);

    if (!product || !user) {
      res.status(404).send({ message: "product or user is not existing" });
    }
    console.log("elements existing");

    if (product && product.quantity < req.body.quantity) {
      res.status(406).send({ message: "quantity unavailable" });
    }
    console.log("quantity available", req.body.quantity);

    user?.cart.push({
      productId: req.body.productId,
      quantity: req.body.quantity,
    });
    user?.save();
    console.log("done");
    res.status(201).send({ cart: user?.cart });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

cartRouter.get("/userId/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(400).send({ message: "user not found" });
  } else if (user.cart.length == 0) {
    res.status(400).send({ message: "cart is empty" });
  }

  res.status(200).send({ userCart: user?.cart });
});
export default cartRouter;
