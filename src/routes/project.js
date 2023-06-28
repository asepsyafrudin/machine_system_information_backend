import express from "express";
import {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  updateStatusProject,
} from "../controller/project.js";

const router = express.Router();
router.post("/create", createProject);
router.put("/update", updateProject);
router.get("/getAllProjectByPage/:page", getAllProject);
router.put("/updateStatus", updateStatusProject);
router.get("/getProjectById/:id", getProjectById);

export default router;
