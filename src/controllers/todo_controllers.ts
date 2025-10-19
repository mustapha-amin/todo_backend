import { type Request, type Response } from "express";
import { Todo } from "../models/todo.ts";
import BadRequestError from "../error/bad_request_error.ts";
import NotFoundError from "../error/not_found_error.ts";

export async function createTodo(req: Request, res: Response) {
    const { title, description } = req.body
    if (!title || !description) {
        throw new BadRequestError("Missing parameter");
    }
    await Todo.create({ title, description, })

    res.status(201).send({
        "message": "todo created succesfully"
    })

    console.log("todo created");

}

export async function fetchTodos(_: Request, res: Response) {
    const todos = await Todo.find({}, "id title completed description");
    res.status(200).send({
        "message": "Todos fetched successfully",
        "data": todos
    })
}

export async function fetchTodoByID(req: Request, res: Response) {
    const { id } = req.params
    const todo = await Todo.findOne({ id }, "id title completed description")
    if (!todo) {
        throw new NotFoundError("Todo not found")
    }
    res.status(200).send({message: "Todo fetched successfully", data : todo})
}

export async function updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const updatedTodo = await Todo.findOneAndUpdate({ id }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!updatedTodo) {
        throw new NotFoundError("Todo not found");
    }

    res.status(200).send({
        message: "Todo updated",
        data: updatedTodo
    })
}


export async function deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Todo.deleteOne({ id })

    if (result.deletedCount === 0) {
        throw new NotFoundError("Todo not found");
    }

    res.status(204).send({
        message: "Todo deleted successfully"
    })
}