import express from "express";
import dotenv from "dotenv";
import path from "path";
import authroutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/messages.routes.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`✅ The Server is Running on Port ${PORT}`);
});
