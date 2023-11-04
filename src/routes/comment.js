import express from "express";
import {
  createComment,
  deleteComment,
  getCommentBySelectedId,
  getCommentBySelectedIdOnly,
} from "../controller/comment.js";

const router = express.Router();

router.post("/create", createComment);
router.get("/get/:id/:page", getCommentBySelectedId);
router.delete("/delete/:id", deleteComment);
router.get("/getCommentBySelectedId/:id", getCommentBySelectedIdOnly);

export default router;
