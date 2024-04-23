import express from "express";
import {
  sendEmail,
  sendFeedback,
  shareFinishProjectForCommon,
  shareFinishProjectForElctronictSMDNewModel,
  sendNotificationToPic,
  approvalManagerFileReport,
} from "../controller/email.js";

const router = express.Router();
router.post("/send", sendEmail);
router.post("/sendFeedback", sendFeedback);
router.post(
  "/shareFinishProjectForSMD",
  shareFinishProjectForElctronictSMDNewModel
);
router.post("/shareFinishProjectCommon", shareFinishProjectForCommon);
router.post("/sendNotificationToPic", sendNotificationToPic);
router.post("/approvalManagerFileReport", approvalManagerFileReport);

export default router;
