import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "supersecretkey";

interface AuthTokenPayload extends JwtPayload {
  userId: string;
  role: string;
  email: string;
}
// augment Express Request to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        email: string;
      };
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET as string) as AuthTokenPayload;

    req.user = { id: decoded.userId, role: decoded.role, email: decoded.email };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
