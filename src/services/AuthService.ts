import { Router } from "express";
import { auth, verifyAdmin, rateLimiter, largeLimiter } from "../Middleware";
import { apiAdapter } from "../util/apiAdapter";
import { config }  from '../config';

const baseURL = config.authService;
const api = apiAdapter(baseURL);
const router = Router();

router.get("/Auth/Health", auth, verifyAdmin, (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/Auth/Login", auth, rateLimiter, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/Auth/Register", auth, verifyAdmin, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.get("/Auth/token", largeLimiter, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  });
});

export { router as AuthService };
