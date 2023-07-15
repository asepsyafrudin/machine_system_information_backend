import express from "express";
import {
  createActivity,
  getActivityByProjectId,
  getAllActivityController,
} from "../controller/activity.js";

const router = express.Router();

router.post("/create", createActivity);
router.get("/getActivityByProjectId/:projectId", getActivityByProjectId);
router.get("/getAll", getAllActivityController);

export default router;
