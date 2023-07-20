import express from "express";
import {
  createSection,
  deleteSection,
  getSection,
} from "../controller/section.js";

const router = express.Router();
router.post("/create", createSection);
router.get("/getAll", getSection);
router.delete("/delete/:id", deleteSection);

export default router;
