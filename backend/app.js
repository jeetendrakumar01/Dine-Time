import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// Database connection
dbConnection();

// Middleware
app.use(
  cors({
    origin: ["https://dine-time-c9cb.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow necessary methods
    credentials: true, // Allow credentials (cookies/auth headers)
  })
);
app.use(express.json());
mongoose.connect('mongodb+srv://Jeetendra5861:Jeetendra5861@cluster0.h6hsj.mongodb.net/?retryWrites=true') 
app.use(express.urlencoded({ extended: true }));

// Preflight request handling
app.options("*", cors());

// Routes
app.use("/api/v1/reservation", reservationRouter);
app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN",
  });
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
