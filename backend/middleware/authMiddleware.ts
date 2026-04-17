import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user as IUser;

      return next();
    } catch {
      return res
        .status(401)
        .json({ message: "Not authorized, token failed" });
    }
  }

  return res
    .status(401)
    .json({ message: "Not authorized, no token" });
};

export const isSeller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.user &&
    (req.user.role === "seller" || req.user.role === "admin")
  ) {
    return next();
  }

  return res
    .status(403)
    .json({ message: "Seller access required" });
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res
    .status(403)
    .json({ message: "Admin access required" });
};