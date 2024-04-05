import {
  createPattern,
  updatePattern,
  getAllPattern,
  getPatternById,
  deletePattern,
} from "../controller/pattern.js";
import express from "express";
const router = express.Router();
router.post("/create", createPattern);
router.put("/update", updatePattern);
router.post("/getAllPattern", getAllPattern);
router.get("/getPatternById", getPatternById);
router.delete("/delete", deletePattern);

export default router;
