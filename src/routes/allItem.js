import express from "express";
import { getAllItem } from "../controller/allitem.js";

const router = express.Router();
router.get("/getAll/:page", getAllItem);

export default router;
