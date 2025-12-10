import mongoose from "mongoose";
import { Router } from "express";
import express from "express";
import Product from "../models/Product.ts";
import { productValidation } from "../validation/productValidation.ts";
// import { userValidation } from "../validation/userValidation.ts";
import { requireRole } from "../middlewares/authorization.ts";
import User from "../models/User.ts";
import { requireAuth } from "../middlewares/authentcation.ts";
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

//buy product
productRouter.put("/productId/:productId", requireAuth, async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product || product?.quantity <= 0) {
    return res
      .status(500)
      .send({ message: " product out of stock or not found" });
  }
  const userPayload = req.user;

  if (!userPayload) {
    return res.status(500).send({ message: " user not found" });
  }
  const userIdFromPayload = userPayload.id;
  const user = await User.findById(userIdFromPayload);
  if (!user) {
    res.status(404).send({ message: "user not found" });
  }

  const newProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $inc: {
        quantity: -1,
        soldQuantity: 1,
      },
    },
    { new: true }
  );

  const newUser = await User.findByIdAndUpdate(
    userIdFromPayload,
    {
      $push: {
        purchased: {
          productId,
          quantity: 1,
          status: "It is being delivered and you will be contacted.",
          date: new Date(),
        },
      },
    },
    { new: true }
  );

  res.send({ purchased: newUser?.purchased });
});

export default productRouter;
