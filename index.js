import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import websitesRoute from "./routes/website.js";

const app = express();
dotenv.config();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO); // onlien
    // await mongoose.connect(process.env.MONGOOFFLINE);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

/**
 * Middleware: it is able to reatch our request and response befor sending the result to the user
 * next is a callback function. it is used to redirect to next middleware
 */

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
app.use("/users", usersRoute);

app.use("/website", websitesRoute);

app.use("/test", (req, res) => {
  res.status(200).json("the booking api  is working correctly");
});

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Error Occured!";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack // stack gave more details about error
  });
});

app.listen(5000, () => {
  connect();
  console.log("Connected to the backend");
});
