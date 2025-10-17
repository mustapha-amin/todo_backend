import { Router, type Request, type Response } from "express";
import { createTodo, fetchTodos } from "./controllers/todo_controllers.ts";

const router = Router()

router.post('/todo', createTodo)
router.get('/todo', fetchTodos)

export default router