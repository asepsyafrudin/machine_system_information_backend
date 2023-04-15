import express from "express";
import multer from "multer";
import { diskStorageGeneral } from "../config/multer.js";
import {
  createFileUploadGeneral,
  deleteFileUploadGeneral,
} from "../controller/fileUpload.js";

const upload = multer({ storage: diskStorageGeneral });
const router = express.Router();
router.post("/create", upload.array("file_upload"), createFileUploadGeneral);
router.delete("/delete/:id", deleteFileUploadGeneral);

export default router;
