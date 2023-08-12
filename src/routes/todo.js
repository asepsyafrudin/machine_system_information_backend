import express from "express";
import { createTodo, getTodoByProjectId } from "../controller/todo.js";

const router = express.Router();
router.post("/create", createTodo);
router.get("/getTodoByProjectId/:id/:page", getTodoByProjectId);

export default router;
