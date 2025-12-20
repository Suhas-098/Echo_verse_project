import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { io, app, server } from "./lib/socket.js";


import authroutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import "./lib/worker.js"; // Start the BullMQ worker for scheduled messages


dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authroutes);
app.use("/api/messages", messagesRoutes);

// ✅ Serve frontend in production (Express 5 compatible)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Front-End/dist")));

  // 👇 Use regex-based route for SPA fallback
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-End/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`✅ The Server is Running on Port ${PORT}`);
  connectDB();
});
