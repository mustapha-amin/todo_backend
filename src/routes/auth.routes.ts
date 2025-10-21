import { Router } from "express";
import { register } from "../controllers/auth_controller.ts";

const authRouter = Router()

authRouter.post('/register', register)

export default authRouter;