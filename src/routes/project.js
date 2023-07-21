import express from "express";
import {
  createProject,
  deleteProjectByProjectId,
  getAllProject,
  getAllProjectByPage,
  getProjectById,
  getProjectByPageAndUser,
  getProjectByUser,
  searchProject,
  updateProject,
  updateStatusProject,
} from "../controller/project.js";

const router = express.Router();
router.post("/create", createProject);
router.put("/update", updateProject);
router.get("/getAllProject", getAllProject);
router.get("/getAllProjectByPage/:page", getAllProjectByPage);
router.put("/updateStatus", updateStatusProject);
router.get("/getProjectById/:id", getProjectById);
router.delete("/delete/:id", deleteProjectByProjectId);
router.get("/getProjectByPageAndUser/:page/:user", getProjectByPageAndUser);
router.post("/search", searchProject);
router.get("/getProjectByUser/:userId", getProjectByUser);

export default router;
