import { Router, type Request, type Response } from "express";
import { createTodo, deleteTodo, fetchTodoByID, fetchTodos, updateTodo } from "./controllers/todo_controllers.ts";

const router = Router()

router.post('/todo', createTodo)
router.get('/todo', fetchTodos)
router.get('/todo/:id', fetchTodoByID)
router.patch('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

export default router