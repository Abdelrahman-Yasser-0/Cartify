import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface AuthTokenPayload extends JwtPayload {
  userId: string;
  role: string;
  email: string;
}
type Role = "user" | "admin" | "superadmin";

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
// export const requireRole = (role: string) => {
//   return (
//     req: Request & { user?: AuthTokenPayload },
//     res: Response,
//     next: NextFunction
//   ) => {
//     if (req.user?.role !== role) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     next();
//   };
// };

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    if (req.user.role !== role) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    next();
  };
};
