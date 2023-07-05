import express from "express";
import { createFile, deleteFileById, getFile } from "../controller/file.js";
import multer from "multer";
import { diskStorageFile } from "../config/multer.js";

const router = express.Router();
const upload = multer({ storage: diskStorageFile });

router.post("/create", upload.array("file", 10), createFile);
router.delete("/delete/:id", deleteFileById);
router.get("/getFileByDocumentId/:id", getFile);

export default router;
