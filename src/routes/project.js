import express from "express";
import {
  createProject,
  deleteProjectByProjectId,
  getAllProject,
  getAllProjectByFilterAndPage,
  getAllProjectByPage,
  getProjectById,
  getProjectByPageAndUser,
  getProjectBySectioIdAndPageController,
  getProjectByUser,
  searchProject,
  updateProject,
  updateStatusProject,
  updateProjectByDate
} from "../controller/project.js";

const router = express.Router();
router.post("/create", createProject);
router.put("/update", updateProject);
router.put("/updateDate", updateProjectByDate);
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
router.post("/getAllProjectByPageAndFilter", getAllProjectByFilterAndPage);
// router.post("/getProjectBySectionAndFilter", getProjectBySectionAndFilter);
// router.post("/getProjectByUserAndFilter", getProjectByUserAndFilter);
export default router;
