import { type NextFunction, type Request, type Response } from "express";
import { ApiError } from "../error/api_error.ts";
import mongoose from "mongoose";
import { mapMongoError } from "./mongodb_error_handler.ts";
import { StatusCodes } from "http-status-codes";

export function errorHandler(
    err: ApiError | Error | mongoose.Error | unknown,
    req: Request,
    res: Response,
) {
    let errorMessage: string
    let statusCode: number;
    if (err instanceof mongoose.Error) {
        let mongooseError = mapMongoError(err);
        errorMessage = mongooseError.message
        statusCode = mongooseError.status
    } else if (err instanceof ApiError) {
        errorMessage = err.message
        statusCode = err.statusCode
    } else {
        errorMessage = "Internal server error"
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }

    const logLevel = statusCode >= 500 ? 'error' : 'warn';
    console.log(` ${logLevel} ${req.method} ${req.url} - ${statusCode}: ${errorMessage}`);
    
    return res.status(statusCode).send({message:errorMessage})
}