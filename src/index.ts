import express from "express";
import { connectDB } from "./config/db.ts";
import router from "./routes/todo.routes.ts";
import logger from "./middleware/logger.ts";
import { notFoundHandler } from "./middleware/not_found.ts";
import { errorHandler } from "./middleware/error_handler.ts";
import todoRouter from "./routes/todo.routes.ts";

const app = express()
const port = 3001;

app.use(express.json())
await connectDB()

app.use(logger)
app.use('/api', todoRouter)
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`⚡ express app running on port ${port}`)
})