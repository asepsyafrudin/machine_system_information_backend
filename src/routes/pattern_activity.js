import {
  createPatternActivity,
  getActivityPatternByPatternId,
  getAllActivityPattern,
} from "../controller/pattern_activity.js";
import express from "express";
const router = express.Router();
router.post("/create", createPatternActivity);
router.get(
  "/getActivityPatternByPatternId/:id/:idProject",
  getActivityPatternByPatternId
);
router.get("/getAllActivityPattern", getAllActivityPattern);

export default router;
