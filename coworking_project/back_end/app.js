import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./route/auth.js";
import roomRoute from "./route/roomRoutes.js";
import usersRoute from "./route/user.js";
import adminRoute from "./route/admin.js"; // Import admin route
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors());
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/user", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/admin", adminRoute); // Add admin route

// Error-handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Start server
app.listen(4000, () => {
  connect();
  console.log("Connected to backend.");
});
