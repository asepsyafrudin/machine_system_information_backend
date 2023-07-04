import express from "express";
import {
  createActivity,
  getActivityByProjectId,
} from "../controller/activity.js";

const router = express.Router();

router.post("/create", createActivity);
router.get("/getActivityByProjectId/:projectId", getActivityByProjectId);

export default router;
