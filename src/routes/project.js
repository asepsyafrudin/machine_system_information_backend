import express from "express";
import {
  createProject,
  deleteProjectByProjectId,
  getAllProject,
  getAllProjectByPage,
  getProjectById,
  getProjectByPageAndUser,
  getProjectBySectioIdAndPageController,
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
router.get(
  "/getProjectBySectionIdAndPage/:page/:sectionId",
  getProjectBySectioIdAndPageController
);
export default router;
