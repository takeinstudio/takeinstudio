const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.json({ message: "TakeIN Studio API is running..." });
});

// Import Routes
const leadRoutes = require("./routes/lead.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
