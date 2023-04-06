import express from "express";
import multer from "multer";

import {
  createUser,
  editUser,
  findUserById,
  getAllUser,
  deleteUser,
  findUser,
  getUserByUserId,
  getUserByPage,
  userCheckPassword,
  getUserByNPK,
  getUserByEmail,
  changePassword,
} from "../controller/user.js";

import { diskStorageProfile } from "../config/multer.js";

const upload = multer({ storage: diskStorageProfile });
const router = express.Router();

router.post("/create_users", upload.single("photo"), createUser);
router.get("/get_users", getAllUser);
router.patch("/update_user", upload.single("photo"), editUser);
router.get("/findUserById", findUserById);
router.delete("/delete_user/:id", deleteUser);
router.get("/findUser/:searchValue/:page", findUser);
router.get("/getUserByUserId/:userId", getUserByUserId);
router.get("/getUserByPage/:page", getUserByPage);
router.post("/comparePassword", userCheckPassword);
router.get("/getUserByNPK/:npk", getUserByNPK);
router.get("/getUserByEmail/:email", getUserByEmail);
router.patch("/changePassword", changePassword);

export default router;
