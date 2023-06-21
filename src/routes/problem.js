import express from "express";
import {
  createProblem,
  deleteProblem,
  getAllProblemList,
  getProblemById,
  getProblemByMachieId,
} from "../controller/problem.js";

const router = express.Router();

router.post("/create", createProblem);
router.get("/getProblemById/:id", getProblemById);
router.get("/getProblemByMachineId/:machineId", getProblemByMachieId);
router.get("/getAllProblem/:page", getAllProblemList);
router.delete("/deleteProblem/:id", deleteProblem);
export default router;
