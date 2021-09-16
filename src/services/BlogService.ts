import { Router } from "express";
import { auth, verifyAdmin, rateLimiter, largeLimiter } from "../Middleware";
import { apiAdapter } from "../util/apiAdapter";
import { config }  from '../config';

const baseURL = config.blogService;
const api = apiAdapter(baseURL);
const router = Router();

router.get("/blog/Health", auth, verifyAdmin, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/blog/CreatePost", auth, verifyAdmin, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  })
});

router.get("/blog/Posts", auth, largeLimiter, (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/blog/EditPost", auth, verifyAdmin, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/blog/RemovePost", auth, verifyAdmin, (req, res) => {
  api.post(req.path).then(resp => {
    res.send(resp.data);
  })
});

export { router as BlogService };
