import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config";
import * as User from "./enums/user";
import rateLimit from "express-rate-limit";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res
        .status(401)
        .json({
          Status: "Denied",
          message: "No authentication token, access denied",
        });
    }

    const verified = jwt.verify(token, config.jwtSecret);

    if (!verified) {
      return res
        .status(401)
        .json({
          Status: "Denied",
          message: "Token verification failed, authorization denied",
        });
    }

    return next();
  } catch (err: Error | any) {
    return res.status(500).json({ Status: "Error", message: "Error: " + err.message });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res
        .status(401)
        .json({
          Status: "Denied",
          message: "No authentication token, access denied",
        });
    }

    const verified = jwt.verify(token, config.jwtSecret);

    if (!verified)
      return res
        .status(401)
        .json({ Status: "Denied", message: "Invalid token content" });

    //@ts-ignore
    const user = verified.user;

    if (user !== User.user.ADMIN)
      return res
        .status(401)
        .json({ Status: "Denied", message: "User doesn't have Admin access" });

    return next();
  } catch (err: Error | any) {
    return res.status(500).json({ Status: "Error", message: err.message });
  }
};

export const rateLimiter = rateLimit({
  max: 5,
  windowMs: 24 * 60 * 60 * 1000, //one day
  message: "Too many attempts!",
});

export const largeLimiter = rateLimit({
  max: 50,
  windowMs: 24 * 60 * 60 * 1000, //one day
  message: "Too many attempts!",
});
