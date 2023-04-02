import express from "express";
import {
  changeStatusNotifToRead,
  createNotification,
  getNotificationByUserId,
} from "../controller/notification.js";

const router = express.Router();
router.post("/create", createNotification);
router.get("/getNotification/:userId", getNotificationByUserId);
router.patch("/change/:id", changeStatusNotifToRead);

export default router;
