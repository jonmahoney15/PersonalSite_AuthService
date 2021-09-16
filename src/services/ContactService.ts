import { Router } from "express";
import { auth, verifyAdmin, rateLimiter } from "../Middleware";
import { apiAdapter } from "../util/apiAdapter";
import { config }  from '../config';

const baseURL = config.contactService;
const api = apiAdapter(baseURL);
const router = Router();

router.get("/contact/Health", auth, verifyAdmin, (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/contact/Contact", auth, rateLimiter, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  });
});

export { router as ContactService };
