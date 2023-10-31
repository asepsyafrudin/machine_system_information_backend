import express from "express";
import {
  createTodo,
  deleteTodoListById,
  getTodoByProjectId,
  getTodoListByUserId,
} from "../controller/todo.js";

const router = express.Router();
router.post("/create", createTodo);
router.delete("/delete/:id", deleteTodoListById);
router.get("/getTodoByProjectId/:id/:page", getTodoByProjectId);
router.get("/get/:userId", getTodoListByUserId);

export default router;
