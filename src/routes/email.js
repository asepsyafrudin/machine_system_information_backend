import express from "express";
import {
  sendEmail,
  sendFeedback,
  shareFinishProjectForCommon,
  shareFinishProjectForElctronictSMDNewModel,
  sendNotificationToPic
} from "../controller/email.js";

const router = express.Router();
router.post("/send", sendEmail);
router.post("/sendFeedback", sendFeedback);
router.post(
  "/shareFinishProjectForSMD",
  shareFinishProjectForElctronictSMDNewModel
);
router.post("/shareFinishProjectCommon", shareFinishProjectForCommon);
router.post("/sendNotificationToPic", sendNotificationToPic)

export default router;
