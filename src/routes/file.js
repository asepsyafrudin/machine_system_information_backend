import express from "express";
import { deleteFileById } from "../controller/file.js";

const router = express.Router();
router.delete("/delete/:id", deleteFileById);

export default router;
