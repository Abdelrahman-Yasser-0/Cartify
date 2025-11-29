import express from "express";
import User from "../models/User.ts";
import userValidationSchema from "../validation/userValidation.ts";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    await userValidationSchema.validateAsync(req.body);
    const user = await User.create(req.body);
    res.status(201).send({ message: "User created", data: { user } });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    res.status(400).send({ message: errorMessage });
  }
});
