import express from "express";

import {
  createDocument,
  getDocumentByPage,
  searchDocumentByPage,
  getDocumentByUserIdAndPage,
  searchDocumentForDashboardMenu,
  deleteDocumentbyId,
  changeStatusDocument,
  getDocumentById,
  updateDocumentById,
} from "../controller/document.js";
import multer from "multer";
import { diskStorageFile } from "../config/multer.js";

const router = express.Router();
const upload = multer({ storage: diskStorageFile });

router.post("/create", upload.array("file", 10), createDocument);
router.get("/getDocumentByPage/:page", getDocumentByPage);
router.get(
  "/getDocumentByUserIdAndPage/:userId/:page",
  getDocumentByUserIdAndPage
);

//search for searchEngine Page
router.get("/search/:searchValue/:page", searchDocumentByPage);

//search for dahsboard page
router.get(
  "/searchDashboard/:searchValue/:page/:userId",
  searchDocumentForDashboardMenu
);

router.delete("/delete/:id", deleteDocumentbyId);
router.patch("/changeStatus", changeStatusDocument);
router.get("/getDocumentById/:id", getDocumentById);
router.patch("/update", upload.array("file", 10), updateDocumentById);

export default router;
