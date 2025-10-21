import { asyncHandler } from "../middleware/async_handler.ts";
import { type Request, type Response } from "express";
import { User } from "../models/user.ts";
import NotFoundError from "../error/not_found_error.ts";
import { StatusCodes } from "http-status-codes";

export const fetchUsers = asyncHandler(async function (req:Request, res: Response) {
    const users = await User.find().select('-password')
    if(!users) {
        throw new NotFoundError("No users found");
    }

    return res.status(StatusCodes.OK).send({
        "message" : "users fetched successfully",
        "data" : users
    })
})