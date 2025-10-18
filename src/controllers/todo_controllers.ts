import { type Request, type Response } from "express";
import { Todo } from "../models/todo.ts";

export async function createTodo(req: Request, res: Response) {
    try {
        const { title, description } = req.body
        if (!title || !description) {
            res.status(400).json({
                "message": "Missing required parameters"
            })
            return
        }

        const newTodo = await Todo.create({
            title,
            description,
        })

        await newTodo.save()

        res.status(201).send({
            "message": "todo created succesfully"
        })

        console.log("todo created");
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({
            "message": "Internal server error"
        });
    }
}

export async function fetchTodos(req: Request, res: Response) {
    try {
        const todos = await Todo.find({}, "id title completed description");
        res.status(200).send({
            "message": "todos fetched successfully",
            "data": todos
        })
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function fetchTodoByID(req: Request, res: Response) {
    try {
        const { id } = req.params
        const todo = await Todo.findOne({ id }, "id title completed description")
        if (!todo) {
            res.status(404).json({
                message: "Todo not found"
            })
            return
        }
        res.status(200).send(todo)
    } catch (error) {
        console.error("Error fetching todo", error)
        res.status(500).json({
            message: "Internal serve error"
        })
    }
}

export async function updateTodo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updatedTodo = await Todo.findOneAndUpdate({ id }, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).send({
            message: "Todo updated",
            data: updatedTodo
        })
    } catch (error) {
        console.error("Error updating todo", error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


export async function deleteTodo(req: Request, res:Response) {
    try {
          const { id } = req.params;
          await Todo.deleteOne({id})
          res.status(204).send({
            message: "Todo deleted successfully"
          })
    } catch (error) {
          console.error("Error deleting todo", error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}