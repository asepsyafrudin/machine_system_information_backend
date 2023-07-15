import express from "express";
import { createToken, getValidationToken } from "../controller/token.js";

const router = express.Router();
router.post("/createToken", createToken);
router.post("/getValidationFromToken", getValidationToken);

export default router;
