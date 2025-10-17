import express from "express";

const app = express()
const port = 3001;
const MONGODB_URL = "mongodb+srv://mustaphaadinoyi75_db_user:<db_password>@cluster0.wbuuww8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json())
//app.use('/api', router)

// app.use('*', (_ : express.Request, res: express.Response) => {
//     res.status(404).json({"message" : "invalid route"})
// }) 

app.listen(port, () => {
    console.log(`⚡ express app running on port ${port}`)
})