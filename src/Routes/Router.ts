import { Router } from "express";
import { Register, Login, generateToken } from "../Auth/AuthController";
import { auth, verifyAdmin, rateLimiter, largeLimiter } from "../Middleware";

const router = Router();

router.get("/auth/health", auth, verifyAdmin, (req, res) =>
  res.status(200).json({ Status: "Success", message: "Auth is Healthy" })
);
router.post("/auth/login", auth, rateLimiter, Login);
router.post("/auth/register", auth, verifyAdmin, Register);
router.get("/auth/token", largeLimiter, generateToken);

export { router as Router };
