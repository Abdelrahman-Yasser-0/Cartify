import express from "express";
import { connect } from "mongoose";
import userRouter from "./routes/user.ts";
import productRouter from "./routes/product.ts";
import cartRouter from "./routes/cart.ts";
import { requireAuth } from "./middlewares/authentcation.ts";
import wishingListRouter from "./routes/wishingList.ts";

connect("mongodb://127.0.0.1:27017/s9")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", requireAuth, cartRouter);
app.use("/wishingList", requireAuth, wishingListRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3000);
