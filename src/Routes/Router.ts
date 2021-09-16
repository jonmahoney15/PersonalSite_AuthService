import { Router } from "express";
import { auth, verifyAdmin } from "../Middleware";
import { AuthService } from "../services/AuthService";
import { BlogService } from "../services/BlogService";
import { ContactService } from "../services/ContactService";

const router = Router();

router.get("/Health", auth, verifyAdmin, (req, res) =>
  res.send({ Status: "Success", message: "Gateway is Healthy" })
);

router.use(AuthService);
router.use(BlogService);
router.use(ContactService);

export { router as Router };
