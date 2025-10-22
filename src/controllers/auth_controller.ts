import { JWT_EXPIRES_IN, JWT_KEY } from "../config/env.ts";
import { type Request, type Response } from "express";
import { registerSchema } from "../validators/auth_validator.ts";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.ts";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import BadRequestError from "../error/bad_request_error.ts";
import NotFoundError from "../error/not_found_error.ts";
import { asyncHandler } from "../middleware/async_handler.ts";


export const register = asyncHandler(async function (req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password")
    }

    const parsedInput = registerSchema.safeParse(req.body)
    if (!parsedInput.success) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            "message": "Invalid input. Please check your credentials."
        })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new BadRequestError("User already exists");
    }

    const user = await User.create({ email, password })
    if (!JWT_KEY) throw new Error("JWT_KEY is not defined. Set JWT_KEY in your environment.");
    const secret = JWT_KEY as Secret
    const signOpts = { expiresIn: JWT_EXPIRES_IN ?? "7d" } as SignOptions
    const token = jwt.sign({ userId: user.userId, role: user.role }, secret, signOpts)

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    return res.status(201).send({
        "message": "User registered successfully",
        token
    })
})

export const login = asyncHandler(async function (req: Request, res: Response) {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new NotFoundError("The user does not exist")
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        throw new BadRequestError("Incorrect password")
    }

    if (!JWT_KEY) throw new Error("JWT_KEY is not defined. Set JWT_KEY in your environment.");
    const secret = JWT_KEY as Secret
    const signOpts = { expiresIn: JWT_EXPIRES_IN ?? "7d" } as SignOptions
    const token = jwt.sign({ userId: user.userId, role: user.role }, secret, signOpts)

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    return res.status(200).send({
        "message": "User logged in successfully",
        token
    })
})