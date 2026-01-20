import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./db/connectMongoDb.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
connectMongoDb();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.set("view engine","ejs");

app.use("/auth",authRoutes);

app.listen(8080, () => {
  console.log("server running on PORT 8080");
});
