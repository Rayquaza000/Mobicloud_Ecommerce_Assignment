import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import db from "./db.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { orderRoutes } from "./Routes/orders.routes.js";
import { productRoutes } from "./Routes/products.routes.js";
import { userRoutes } from "./Routes/users.routes.js";

dotenv.config();

const app=new express();

const allowedOrigins = [
  process.env.CLIENT_URL || "https://mobicloud-ecommerce-assignment.onrender.com",
  process.env.ADMIN_URL || "https://mobicloud-ecommerce-admin.onrender.com",
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

orderRoutes(app);
productRoutes(app);
userRoutes(app);
app.listen(process.env.PORT,()=>{
    console.log("Server is listening on PORT: "+process.env.PORT);
});