import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config();

// Database connection
dbConnection();

// Middleware
app.use(
  cors({
    origin: ["https://dine-time-webapplication.netlify.app"], // Netlify frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    credentials: true, // Allow credentials (cookies/auth headers)
  })
);
app.use(express.json());
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
