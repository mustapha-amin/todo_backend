import { type NextFunction, type Request, type Response } from "express";
import BadRequestError from "../error/bad_request_error.ts";
import { StatusCodes } from "http-status-codes";

export const authorize = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Authentication required"
            });
        }
        console.log(`User role: ${user.role}`)
        if (!allowedRoles.includes(user.role)) {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: `Insufficient permissions. Required roles: ${allowedRoles.join(', ')}`
            });
        }
        
        next();
    };
};