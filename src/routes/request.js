import express from "express";
import {
  createRequest,
  getRequest,
  deleteRequest,
} from "../controller/request.js";

const router = express.Router();
router.post("/create", createRequest);
router.get("/get/:token", getRequest);
router.delete("/delete/:token", deleteRequest);

export default router;
