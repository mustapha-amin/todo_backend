import { Router } from "express";
import { fetchUsers } from "../controllers/user_controller.ts";

const usersRouter = Router()

usersRouter.get('/', fetchUsers)

export default usersRouter