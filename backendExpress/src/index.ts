import express from "express";
import { connect } from "mongoose";
// import userRouter from "./routes/users.ts";

connect("mongodb://127.0.0.1:27017/s9")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3000);
