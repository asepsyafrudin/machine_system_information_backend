import express from "express";
import {
  sendEmail,
  sendFeedback,
  shareFinishProjectForCommon,
  shareFinishProjectForElctronictSMDNewModel,
  sendNotificationToPic,
  approvalManagerFileReport,
} from "../controller/email.js";
import multer from "multer";
import { diskStorageFile } from "../config/multer.js";
const upload = multer({ storage: diskStorageFile });

const router = express.Router();
router.post("/send", sendEmail);
router.post("/sendFeedback", sendFeedback);
router.post(
  "/shareFinishProjectForSMD",
  shareFinishProjectForElctronictSMDNewModel
);
router.post("/shareFinishProjectCommon", shareFinishProjectForCommon);
router.post("/sendNotificationToPic", sendNotificationToPic);
router.post(
  "/approvalManagerFileReport",
  upload.array("file", 10),
  approvalManagerFileReport
);

export default router;
