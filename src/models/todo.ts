import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    completed: Boolean,
})
  
export const Todo = mongoose.model("Todo", TodoSchema)