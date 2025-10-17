import mongoose from "mongoose";
import { MONGODB_URL } from "./env.ts";

export async function  connectDB() {
  await mongoose.connect(MONGODB_URL!).then((s) => {
    console.log("⚡ Mongo DB connected")
  }).catch((e) =>{
    console.log("An error occured")
    console.log(e)
  })
}