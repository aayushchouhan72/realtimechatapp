import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/soket.js";

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
/* ------------------ middlewares ------------------ */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

const frontendDistPath = path.join(__dirname, "../frontend/dist");
const hasFrontendDist = fs.existsSync(frontendDistPath);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" || hasFrontendDist
        ? true
        : "http://localhost:5173",
    credentials: true,
  })
);

/* ------------------ routes ------------------ */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ------------------ serve frontend ------------------ */
// Serve frontend build when present (works in production and in monorepo deploys
// where the frontend is built into `frontend/dist`). This removes strict
// dependence on NODE_ENV and helps cases where the dist exists but NODE_ENV
// may not be set exactly to "production".
if (hasFrontendDist) {
  app.use(express.static(frontendDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

/* ❌ REMOVE THIS — VERY IMPORTANT
app.get("/", (req, res) => {
  res.send("How are you ");
});
*/

/* ------------------ start server ------------------ */
server.listen(PORT, async () => {
  console.log("Server running on port", PORT);
  await connectDB();
});

/* ------------------ error handling ------------------ */
server.on("error", (err) => {
  console.error("Server error:", err);
  if (err?.code === "EADDRINUSE") {
    console.error(`Port ${PORT} already in use`);
    process.exit(1);
  }
});
