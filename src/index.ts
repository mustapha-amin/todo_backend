import express, { type Request, type Response } from "express";
import { connectDB } from "./config/db.ts";
import router from "./routes.ts";
import logger from "./middleware/logger.ts";
const app = express()
const port = 3001;

app.use(express.json())
await connectDB()

app.use(logger)
app.use('/api', router)

// app.use('(.*)', (req : Request, res: Response) => {
//     res.status(404).json({"message" : "invalid route"})
// }) 

app.listen(port, () => {
    console.log(`⚡ express app running on port ${port}`)
})