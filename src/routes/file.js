import express from "express";
import { deleteFileById, getFile } from "../controller/file.js";

const router = express.Router();
router.delete("/delete/:id", deleteFileById);
router.get("/getFileByDocumentId/:id", getFile);

export default router;
