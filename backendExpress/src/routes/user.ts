import express from "express";
import User from "../models/User.ts";
import { userValidation } from "../validation/userValidation.ts";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireAuth } from "../middlewares/authentcation.ts";
const userRouter = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES = "1d";

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

///
userRouter.get("/me", requireAuth, async (req, res) => {
  try {
    const userPayload = req.user;
    if (!userPayload) {
      return res.status(500).send({ message: " user not found" });
    }
    const userIdFromPayload = userPayload.id;

    if (!userIdFromPayload) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userIdFromPayload).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update User Profile
userRouter.put("/me", requireAuth, async (req, res) => {
  try {
    const userPayload = req.user;
    if (!userPayload) {
      return res.status(500).send({ message: " user not found" });
    }
    const userIdFromPayload = userPayload.id;

    if (!userIdFromPayload) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userIdFromPayload);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, password, phone, shippingAddress } = req.body;

    if (email && email != user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      user.email = email;
    }

    if (password && password.trim() != "") {
      const passwordHash = await bcrypt.hash(password, 10);
      user.passwordHash = passwordHash;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    if (shippingAddress) {
      user.shippingAddress = {
        ...user.shippingAddress,
        ...shippingAddress,
      };
    }

    const updatedUser = await user.save();

    const userObject =
      updatedUser instanceof Object
        ? JSON.parse(JSON.stringify(updatedUser))
        : updatedUser;
    delete userObject.passwordHash;

    res.status(200).json({
      message: "Profile updated successfully",
      user: userObject,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    res.status(500).json({ message: errorMessage });
  }
});
///

////

////

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

//user login
userRouter.post("/login", async (req, res) => {
  try {
    // console.log(process.env.JWT_SECRET);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });
    // Compare password
    else if (user.passwordHash) {
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match)
        return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES,
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An error occurred";

    res.status(500).json({ message: errorMessage });
  }
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

export default userRouter;
