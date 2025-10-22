import { type NextFunction, type Request, type Response } from "express";
import UnauthenticatedError from "../error/unauthenticated_error.ts";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/env.ts";
import { User } from "../models/user.ts";
import UnauthorizedError from "../error/unuthorized_error.ts";

export async function authMiddleware(req: Request, _: Response, next: NextFunction) {
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
        const userId = payload.userId
        const user = await User.findOne({userId})
        if(!user) {
            throw new UnauthorizedError("User no longer exists");
            
        }
        req.user = { userId: payload.userId, role: payload.role }
        next()
    } catch (error) {
        console.log(error)
        throw new UnauthenticatedError("invalid or expired token")

    }
}