import express from "express";
import {
  createProblem,
  deleteProblem,
  getAllProblemList,
  getProblemById,
  getProblemByMachieId,
  searchProblemByMachineId,
} from "../controller/problem.js";

const router = express.Router();

router.post("/create", createProblem);
router.get("/getProblemById/:id", getProblemById);
router.get("/getProblemByMachineId/:machineId", getProblemByMachieId);
router.get("/getAllProblem/:page", getAllProblemList);
router.delete("/deleteProblem/:id", deleteProblem);
router.get(
  "/searchProblemByMachineId/:machineId/:page",
  searchProblemByMachineId
);
export default router;
