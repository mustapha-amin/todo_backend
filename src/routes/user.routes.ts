import { Router } from "express";
import { deleteAllUsers, fetchUsers } from "../controllers/user_controller.ts";

const usersRouter = Router()

usersRouter.get('/', fetchUsers)
usersRouter.delete('/', deleteAllUsers)

export default usersRouter