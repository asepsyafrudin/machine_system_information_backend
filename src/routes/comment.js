import express from "express";
import {
  createComment,
  deleteComment,
  getCommentByVideoId,
} from "../controller/comment.js";

const router = express.Router();

router.post("/create", createComment);
router.get("/get/:id/:page", getCommentByVideoId);
router.delete("/delete/:id", deleteComment);

export default router;
