import express from "express";
import {
  createFeedbackComment,
  deleteFeedback,
  getFeedbackById,
} from "../controller/feedbackComment.js";

const router = express.Router();
router.post("/create", createFeedbackComment);
router.delete("/delete/:id", deleteFeedback);
router.get("/getFeedbackById/:id", getFeedbackById);

export default router;
