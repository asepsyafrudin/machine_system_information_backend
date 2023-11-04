import express from "express";
import {
  createTodo,
  deleteTodoListById,
  getTodoByProjectId,
  getTodoListByUserId,
  updateTodoList,
} from "../controller/todo.js";

const router = express.Router();
router.post("/create", createTodo);
router.post("/update", updateTodoList);
router.delete("/delete/:id", deleteTodoListById);
router.get("/getTodoByProjectId/:id/:page", getTodoByProjectId);
router.get("/get/:userId/:page", getTodoListByUserId);

export default router;
