import { Router } from "express";
import { Register, Login, generateToken } from "../Auth/AuthController";
import { auth, verifyAdmin, rateLimiter, largeLimiter } from "../Middleware";

const router = Router();

router.get("/Auth/health", auth, verifyAdmin, (req, res) =>
  res.send({ Status: "Success", message: "Auth is Healthy" })
);
router.post("/Auth/Login", auth, rateLimiter, Login);
router.post("/Auth/Register", auth, verifyAdmin, Register);
router.get("/Auth/token", largeLimiter, generateToken);

export { router as Router };
