import express from "express";
import { createActivity } from "../controller/activity.js";

const router = express.Router();

router.post("/create", createActivity);

export default router;
