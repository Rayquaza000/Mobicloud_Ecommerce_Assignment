import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.DATABASE_URL);
const db=mongoose.connection;

db.on("open",()=>{
    console.log("Database connection successful")
})

db.on("error",()=>{
    console.log("Database connection error")
})

export default db;