import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import {v4} from "uuid";

const userSchema = new mongoose.Schema({
  userId : {
    type:String,
    default: v4
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.correctPassword = async function(candidatePassword:string) {
  return await bcrypt.compare(candidatePassword, this.userPassword);
};

export const User = mongoose.model('User', userSchema);