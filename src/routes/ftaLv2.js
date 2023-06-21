import express from "express";
import { createFtaLv2 } from "../controller/ftaLv2.js";
import { diskStorageFile } from "../config/multer.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: diskStorageFile });
router.post("/create", upload.single("file"), createFtaLv2);

export default router;
