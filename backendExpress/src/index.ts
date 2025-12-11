import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connect } from "mongoose";
import userRouter from "./routes/user.ts";
import productRouter from "./routes/product.ts";
import cartRouter from "./routes/cart.ts";
import { requireAuth } from "./middlewares/authentcation.ts";
import wishingListRouter from "./routes/wishingList.ts";
import adminRouter from "./routes/admin.ts";
import { requireRole } from "./middlewares/authorization.ts";
import seedProducts from "./seeders/productsSeeder.ts";
import seedUsers from "./seeders/userAndAdminSeeder.ts";
import purchasedRouter from "./routes/purchased.ts";

const uri = process.env.ATLAS_URI ?? "mongodb://127.0.0.1:27017/cartifyDepiDB";
// connect("mongodb://127.0.0.1:27017/cartifyDepiDB")
connect(uri)
  .then(async () => {
    console.log("MongoDB connected", uri);

    // Run seeder
    await seedProducts();
    await seedUsers();
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", requireAuth, cartRouter);
app.use("/wishingList", requireAuth, wishingListRouter);
app.use("/purchased", requireAuth, purchasedRouter);
app.use("/admin", requireAuth, requireRole("admin"), adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3000, () => console.log(`Server running on port 3000`));
