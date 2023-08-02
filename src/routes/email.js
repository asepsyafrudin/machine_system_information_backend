import express from "express";
import {
  sendEmail,
  sendFeedback,
  shareFinishProjectForCommon,
  shareFinishProjectForElctronictSMDNewModel,
} from "../controller/email.js";

const router = express.Router();
router.post("/send", sendEmail);
router.post("/sendFeedback", sendFeedback);
router.post(
  "/shareFinishProjectForSMD",
  shareFinishProjectForElctronictSMDNewModel
);
router.post("/shareFinishProjectCommon", shareFinishProjectForCommon);

export default router;
