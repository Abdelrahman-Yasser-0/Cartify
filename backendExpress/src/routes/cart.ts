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
//edit product quantity
cartRouter.put("/editProductQuantity", async (req, res) => {
  try {
    const userPayload = req.user;
    if (!userPayload) {
      return res.status(500).send({ message: " user not found" });
    }
    const userIdFromPayload = userPayload.id;

    console.log("started adding to cart");
    await addToCartValidation.validateAsync(req.body);

    const product = await Product.findById(req.body.productId);
    const user = await User.findById(userIdFromPayload);

    if (!product || !user) {
      return res
        .status(404)
        .send({ message: "product or user is not existing" });
    }
    console.log("elements existing");

    if (product && product.quantity < req.body.quantity) {
      return res.status(406).send({ message: "quantity unavailable" });
    }
    console.log("quantity available", req.body.quantity);
    //
    const existingProduct = user.cart.find((element) => {
      return element.productId == req.body.productId;
    });
    if (existingProduct) {
      console.log(existingProduct);
      existingProduct.quantity += req.body.quantity;
    } else {
      user?.cart.push({
        productId: req.body.productId,
        quantity: req.body.quantity,
      });
    }
    await user?.save();
    console.log("done");
    res.status(201).send({ cart: user?.cart });
    //
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

// get the user cart
cartRouter.get("/", async (req, res) => {
  const userPayload = req.user;

  if (!userPayload) {
    return res.status(500).send({ message: " user not found" });
  }
  const userIdFromPayload = userPayload.id;

  const user = await User.findById(userIdFromPayload);
  if (!user) {
    return res.status(400).send({ message: "user not found" });
  } else if (user.cart.length == 0) {
    return res.status(400).send({ message: "cart is empty" });
  }

  return res.status(200).send({ userCart: user?.cart });
});

//delete the full cart
cartRouter.delete("/delete", async (req, res) => {
  const userPayload = req.user;

  if (!userPayload) {
    return res.status(500).send({ message: " user not found" });
  }
  const userIdFromPayload = userPayload.id;

  const user = await User.findById(userIdFromPayload);
  if (!user) {
    return res.status(404).send({ message: "user not found " });
  } else if (user.cart.length == 0) {
    return res.status(404).send({ message: "user's cart is empty" });
  } else {
    user.cart.splice(0);
    await user.save();
    console.log(user.cart);
    res.status(200).send(user.cart);
  }
});

//buy the full cart
cartRouter.put("/buy", async (req, res) => {
  const userPayload = req.user;

  if (!userPayload) {
    return res.status(500).send({ message: " user not found" });
  }
  const userIdFromPayload = userPayload.id;
  const user = await User.findById(userIdFromPayload);
  if (!user) {
    return res.status(404).send({ message: "user not found" });
  } else if (user.cart.length == 0) {
    return res.status(404).send({ message: "cart is empty" });
  } else {
    try {
      for (const item of user.cart) {
        const productId = item.productId;
        const qty = Number(item.quantity);

        if (!Number.isFinite(qty) || qty <= 0) {
          continue;
        }

        // const product = await Product.findById(productId);
        // if (!product) {
        //   continue;
        // }
        const product = await Product.findByIdAndUpdate(
          productId,
          {
            $inc: {
              quantity: -qty,
              soldQuantity: qty,
            },
          },
          { new: true }
        );

        if (!product) {
          continue;
        }

        // const currentQty =
        //   typeof product.quantity === "number" ? product.quantity : 0;
        // const newQty = currentQty - qty;

        // product.quantity = Number.isFinite(newQty) ? newQty : 0;
        await product.save();

        user.purchased.push({
          productId: productId,
          quantity: qty,
          status: "It is being delivered and you will be contacted....",
          date: new Date(),
        });
      }

      // clear cart and save
      user.cart.splice(0);
      await user.save();

      console.log(user);
      return res.send({ userCart: user.cart, userPurchased: user.purchased });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      return res.status(500).send({ message: errorMessage });
    }
  }
});

export default cartRouter;
