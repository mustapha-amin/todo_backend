import express from "express";
import { connectDB } from "./config/db.ts";
const app = express()
const port = 3001;

app.use(express.json())
await connectDB()
//app.use('/api', router)

// app.use('*', (_ : express.Request, res: express.Response) => {
//     res.status(404).json({"message" : "invalid route"})
// }) 

app.listen(port, () => {
    console.log(`⚡ express app running on port ${port}`)
})