import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET is missing!");

export const signToken = (payload: object) => {
  return jwt.sign(payload, secret!, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
