import { Router, type Request, type Response } from "express";
import { createTodo, deleteAllTodos, deleteTodo, fetchTodoByID, fetchTodos, updateTodo } from "../controllers/todo_controllers.ts";

const todoRouter = Router()

todoRouter.post('/', createTodo)
todoRouter.get('/', fetchTodos)
todoRouter.get('/:id', fetchTodoByID)
todoRouter.patch('/:id', updateTodo)
todoRouter.delete('/:id', deleteTodo)
// todoRouter.delete('/admin/todos', deleteAllTodos)

export default todoRouter