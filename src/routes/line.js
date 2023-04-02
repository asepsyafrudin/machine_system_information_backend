import express from "express";
import {
  createLine,
  getAllLine,
  searchLine,
  updateLine,
  updateStatusLine,
  deleteLine,
} from "../controller/line.js";

const router = express.Router();

router.post("/create", createLine);
router.get("/getAllLine", getAllLine);
router.patch("/updateLine", updateLine);
router.patch("/updateStatusLine", updateStatusLine);
router.delete("/delete/:id", deleteLine);
router.get("/:searchValue", searchLine);

export default router;
