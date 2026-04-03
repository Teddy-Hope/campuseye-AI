/**
 * CampusEye AI - Backend Server
 * AI-Powered Campus Problem Reporting System
 * 
 * Author: Teddy Hope (Main Backend)
 * Contributor: Abusha (Improved server setup + documentation)
 * 
 * This is the main entry point for the CampusEye AI backend.
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const reportRoutes = require("./routes/reportRoutes");

const app = express();

// Middleware
app.use(cors());                    // Enable Cross-Origin Resource Sharing
app.use(express.json());            // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Basic Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ CampusEye AI Backend is running successfully",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/reports", reportRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server"
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 CampusEye AI Server is running on port ${PORT}`);
  console.log(`📍 Health Check: http://localhost:${PORT}`);
});
