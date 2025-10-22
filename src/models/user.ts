import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import {v4} from "uuid";

interface IUser extends mongoose.Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

const userSchema = new mongoose.Schema<IUser>({
  userId : {
    type:String,
    default: v4
  },
  username: {
    type: String,
    unique: true,
    sparse:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user']
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(candidatePassword:string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);