import { type NextFunction, type Request, type Response } from "express";
import UnauthenticatedError from "../error/unauthenticated_error.ts";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/env.ts";

export function authMiddleware(req: Request, _: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        throw new UnauthenticatedError("missing authorization header")
    };

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new UnauthenticatedError("Invalid authorization format")
    };

    try {
        const payload = jwt.verify(parts[1]!, JWT_KEY!) as any
        req.user = { userId: payload.userId }
        next()
    } catch (error) {
        console.log(error)
        throw new UnauthenticatedError("invalid or expired token")

    }
}