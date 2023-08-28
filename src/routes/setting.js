import express from "express";
import {
  getSettingByProjectId,
  saveSettingProjectActivity,
} from "../controller/setting.js";

const router = express.Router();

router.post("/save", saveSettingProjectActivity);
router.get("/getSetting/:id", getSettingByProjectId);

export default router;
