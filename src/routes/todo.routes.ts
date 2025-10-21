import { Router, type Request, type Response } from "express";
import { createTodo, deleteAllTodos, deleteTodo, fetchTodoByID, fetchTodos, updateTodo } from "../controllers/todo_controllers.ts";

const todoRouter = Router()

todoRouter.post('/todo', createTodo)
todoRouter.get('/todo', fetchTodos)
todoRouter.get('/todo/:id', fetchTodoByID)
todoRouter.patch('/todo/:id', updateTodo)
todoRouter.delete('/todo/:id', deleteTodo)
todoRouter.delete('/admin/todos', deleteAllTodos)

export default todoRouter