import express from "express";
import {
  createMachine,
  deleteMachine,
  getAllMachine,
  searchMachine,
  updateMachine,
  updateStatusMachine,
} from "../controller/machine.js";

const router = express.Router();

router.post("/create", createMachine);
router.get("/getAll", getAllMachine);
router.delete("/delete/:id", deleteMachine);
router.patch("/updateStatusMachine", updateStatusMachine);
router.patch("/updateMachine", updateMachine);
router.get("/search/:searchValue", searchMachine);

export default router;
