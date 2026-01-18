import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./db/connectMongoDb.js";

const app=express();
dotenv.config();
connectMongoDb();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["POST","GET","PUT","PATCH","DELETE"]
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(8080,()=>{
    console.log("server running on PORT 8080")
})