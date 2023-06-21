import express from "express";

import multer from "multer";
import { diskStorageFile } from "../config/multer.js";
import { createFtaLv1 } from "../controller/ftaLv1.js";

const router = express.Router();

const upload = multer({ storage: diskStorageFile });
router.post("/create", upload.single("file"), createFtaLv1);

export default router;
