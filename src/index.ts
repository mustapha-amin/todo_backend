import express from "express";
import { connectDB } from "./config/db.ts";
import router from "./routes/todo.routes.ts";
import logger from "./middleware/logger.ts";
import { notFoundHandler } from "./middleware/not_found.ts";
import { errorHandler } from "./middleware/error_handler.ts";
import todoRouter from "./routes/todo.routes.ts";
import authRouter from "./routes/auth.routes.ts";
import { authMiddleware } from "./middleware/auth_middleware.ts";

const app = express()
const port = 3001;

app.use(express.json())
await connectDB()

app.use(logger)

app.use('/api/v1/auth/', authRouter)
app.use('/api/v1/todos/', authMiddleware, todoRouter)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`⚡ express app running on port ${port}`)
})