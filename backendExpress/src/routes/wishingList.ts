import mongoose from "mongoose";
import { Router } from "express";
import express from "express";
import Product from "../models/Product.ts";
import { productValidation } from "../validation/productValidation.ts";
import { userValidation } from "../validation/userValidation.ts";
import User from "../models/User.ts";
import Joi from "joi";
import { addToCartValidation } from "../validation/addToCartValidation.ts";
const wishingListRouter = express.Router();

// add product to the user wishing list
wishingListRouter.put("/add/product", async (req, res) => {
  try {
    const userPayload = req.user;
    if (!userPayload) {
      return res.status(500).send({ message: " user not found" });
    }
    const userIdFromPayload = userPayload.id;

    console.log("started adding to cart");
    // await addToCartValidation.validateAsync(req.body);

    const product = await Product.findById(req.body.productId);
    const user = await User.findById(userIdFromPayload);

    if (!product || !user) {
      return res
        .status(404)
        .send({ message: "product or user is not existing" });
    }
    console.log("elements existing");

    //
    const existingProduct = user.wishingList.find((element) => {
      return element.productId == req.body.productId;
    });

    if (existingProduct) {
      console.log(existingProduct);
      res.status(400).send({ message: "product already exists" });
    } else {
      user?.wishingList.push({
        productId: req.body.productId,
      });
    }
    await user?.save();
    console.log("done");
    res.status(201).send({ wishingList: user?.wishingList });
    //
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

// delete product to the user wishing list
wishingListRouter.put("/remove/product", async (req, res) => {
  try {
    const userPayload = req.user;
    if (!userPayload) {
      return res.status(500).send({ message: " user not found" });
    }
    const userIdFromPayload = userPayload.id;

    console.log("started adding to cart");
    // await addToCartValidation.validateAsync(req.body);

    const product = await Product.findById(req.body.productId);
    const user = await User.findById(userIdFromPayload);

    if (!product || !user) {
      return res
        .status(404)
        .send({ message: "product or user is not existing" });
    }
    console.log("elements existing");

    //
    const existingProduct = user.wishingList.find((element) => {
      return element.productId == req.body.productId;
    });

    if (!existingProduct) {
      console.log(existingProduct);
      res.status(400).send({ message: "product already not exists" });
    } else {
      //   user.wishingList= user.wishingList.filter(item => item.productId !== req.body.productId);

      const newUser = await User.findByIdAndUpdate(
        userIdFromPayload,
        { $pull: { wishingList: { productId: req.body.productId } } },
        { new: true }
      );
      await newUser?.save();
      console.log("done");
      res.status(201).send({ wishingList: newUser?.wishingList });
    }
    //
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

export default wishingListRouter;
