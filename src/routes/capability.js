import {
  createCapability,
  deleteCapability,
  getAllCapability,
  getCapabilityById,
  getCapabilityByUserId,
  updateCapability,
} from "../controller/capability.js";
import express from "express";

const router = express.Router();

router.post("/create", createCapability);
router.patch("/update", updateCapability);
router.delete("/delete/:id", deleteCapability);
router.get("/getAllCapability/:page", getAllCapability);
router.get("/getCapabilityByUserId/:user_id/:page", getCapabilityByUserId);
router.get("/getCapabilityById/:id", getCapabilityById);

export default router;
