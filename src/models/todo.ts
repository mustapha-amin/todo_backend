import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const TodoSchema = new mongoose.Schema({
  id: {
    type: String, 
    default: uuidv4, 
  },
  userId:{
    type:String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model("Todo", TodoSchema);
