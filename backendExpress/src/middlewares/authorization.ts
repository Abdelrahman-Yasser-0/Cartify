import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface JwtUserPayload {
  userId: string;
  role: string;
}

export const requireRole = (role: string) => {
  return (
    req: Request & { user?: JwtUserPayload },
    res: Response,
    next: NextFunction
  ) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
