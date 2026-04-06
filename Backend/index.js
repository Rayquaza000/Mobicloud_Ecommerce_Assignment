import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import db from "./db.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app=new express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT,()=>{
    console.log("Server is listening on PORT: "+process.env.PORT);
});