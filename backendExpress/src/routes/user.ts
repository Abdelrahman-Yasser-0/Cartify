import express from "express";
import User from "../models/User.ts";
import { userValidation } from "../validation/userValidation.ts";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userRouter = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES = "1d";

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

//user registeration
userRouter.post("/register", async (req, res) => {
  try {
    await userValidation.validateAsync(req.body);
    //
    const { name, email, password } = req.body;

    // Check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    //
    const user = await User.create({ ...req.body, passwordHash: passwordHash });
    //
    const userObject =
      user instanceof Object ? JSON.parse(JSON.stringify(user)) : user;
    delete userObject.passwordHash;
    res.status(201).send({ message: "User created", userData: { userObject } });

    // res.status(201).send({ message: "User created", data: { user } });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    res.status(400).send({ message: errorMessage });
  }
});

export default userRouter;
