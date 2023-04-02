import express from "express";
import {
  createFeedbackComment,
  deleteFeedback,
} from "../controller/feedbackComment.js";

const router = express.Router();
router.post("/create", createFeedbackComment);
router.delete("/delete/:id", deleteFeedback);

export default router;
