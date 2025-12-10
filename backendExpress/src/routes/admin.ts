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

//products statistics
adminRouter.get(
  "/product/stats",
  // requireAuth,
  // requireRole("admin"),
  async (req, res) => {
    try {
      const stats = await Product.aggregate([
        {
          $facet: {
            totalProducts: [{ $count: "count" }],

            stockStats: [
              {
                $group: {
                  _id: null,
                  totalQuantity: { $sum: "$quantity" },
                  totalSoldQuantity: { $sum: "$soldQuantity" },
                  inStockProducts: {
                    $sum: { $cond: ["$inStock", 1, 0] },
                  },
                  outOfStockProducts: {
                    $sum: { $cond: ["$inStock", 0, 1] },
                  },
                },
              },
            ],

            discountStats: [
              {
                $group: {
                  _id: null,
                  productsWithDiscount: {
                    $sum: { $cond: ["$hasDiscount", 1, 0] },
                  },
                  avgDiscountValue: { $avg: "$discount" },
                },
              },
            ],

            ratingStats: [
              {
                $group: {
                  _id: null,
                  avgRating: { $avg: { $toDouble: "$rate" } },
                },
              },
            ],

            categories: [
              {
                $group: {
                  _id: "$category",
                  count: { $sum: 1 },
                },
              },
              { $sort: { count: -1 } },
            ],

            priceStats: [
              {
                $group: {
                  _id: null,
                  minPrice: { $min: "$price" },
                  maxPrice: { $max: "$price" },
                  avgPrice: { $avg: "$price" },
                },
              },
            ],

            lowStock: [
              { $match: { quantity: { $lte: 5 } } },
              {
                $project: {
                  title: 1,
                  quantity: 1,
                },
              },
            ],
          },
        },
      ]);

      res.json({ success: true, stats: stats[0] });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      return res.status(500).send({ message: errorMessage });
    }
  }
);

export default adminRouter;
