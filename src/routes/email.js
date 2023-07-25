import express from "express";
import { sendEmail } from "../controller/email.js";

const router = express.Router();
router.post("/send", sendEmail);

export default router;
