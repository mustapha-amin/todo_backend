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
        const todos = await Todo.find();
        res.status(200).send({
            "message": "todo fetched successfully",
            "data": todos
        })
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}