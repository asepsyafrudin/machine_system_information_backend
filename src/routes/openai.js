import express from "express";
import { postOpenai } from "../controller/openai.js";

const router = express.Router();

router.post("/post", postOpenai);

export default router;
