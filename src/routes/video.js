import express from "express";
import {
  createVideo,
  deleteVideo,
  getAllVideo,
  updateVideo,
  updateStatusVideo,
  searchVideo,
  getVideoById,
  getVideoByUserId,
  getVideoByPage,
  getVideoByPageAdmin,
  searchVideoForDashbordMenu,
  getVideoByProjectId,
} from "../controller/video.js";
import multer from "multer";
import { diskStorageVideo } from "../config/multer.js";

const router = express.Router();
const upload = multer({ storage: diskStorageVideo });
router.post("/create", upload.single("video"), createVideo);
router.get("/getAllVideo", getAllVideo);
router.delete("/delete/:id", deleteVideo);
router.patch("/updateVideo", upload.single("video"), updateVideo);
router.patch("/updateStatusVideo", updateStatusVideo);
router.get("/search/:searchValue/:page", searchVideo); //for search engine
router.get("/getVideo/:id", getVideoById);
router.get("/getVideoByUserId/:userId/:page", getVideoByUserId);
router.get("/getVideoByPage/:page", getVideoByPage);
router.get("/getVideoByPageAdmin/:page", getVideoByPageAdmin);
router.get(
  "/searchVideoDashboard/:searchValue/:page/:userId",
  searchVideoForDashbordMenu
);
router.get("/getVideoByProjectId/:projectId", getVideoByProjectId);

export default router;
