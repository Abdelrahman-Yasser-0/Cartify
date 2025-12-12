import mongoose from "mongoose";
import { Router } from "express";
import express from "express";
import Product from "../models/Product.ts";
import { productValidation } from "../validation/productValidation.ts";
import { userValidation } from "../validation/userValidation.ts";
import User from "../models/User.ts";
import Joi from "joi";
import { addToCartValidation } from "../validation/addToCartValidation.ts";
const purchasedRouter = express.Router();

//get user purchased history
purchasedRouter.get("/", async (req, res) => {
  const userPayload = req.user;

  if (!userPayload) {
    return res.status(500).send({ message: " user not found" });
  }
  const userIdFromPayload = userPayload.id;

  const user = await User.findById(userIdFromPayload).populate(
    "purchased.productId"
  );
  if (!user) {
    return res.status(400).send({ message: "user not found" });
  } else if (user.wishingList.length == 0) {
    return res.status(400).send({ message: "purchased is empty" });
  }

  return res.status(200).send({ userpurchased: user?.purchased });
});

export default purchasedRouter;
