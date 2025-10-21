import dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URL = process.env.MONGODB_URL;
export const JWT_KEY = process.env.JWT_KEY;