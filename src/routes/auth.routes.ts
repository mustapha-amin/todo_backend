import { Router } from "express";
import { login, register, registerAsAdmin } from "../controllers/auth_controller.ts";

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/admin/register', registerAsAdmin)

export default authRouter;