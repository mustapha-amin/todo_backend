import express, { type Request, type Response } from "express";
import { connectDB } from "./config/db.ts";
import router from "./routes.ts";
import logger from "./middleware/logger.ts";
import { notFoundHandler } from "./middleware/not_found.ts";

const app = express()
const port = 3001;

app.use(express.json())
await connectDB()

app.use(logger)

app.use(notFoundHandler)

app.listen(port, () => {
    console.log(`⚡ express app running on port ${port}`)
})