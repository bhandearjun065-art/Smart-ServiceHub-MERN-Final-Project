import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import serviceRoutes from "./routes/service.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Smart ServiceHub API is running",
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Smart ServiceHub",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});