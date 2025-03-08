import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_PASSWORD = "asdasd";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  
  if (!header || !header.startsWith("Bearer ")) {
     res.status(401).json({ message: "You are not logged in" });
     return;
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_PASSWORD) as { id: string };

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
