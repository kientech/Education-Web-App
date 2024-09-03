const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const courseRoutes = require("./routes/courseRoute");
const cartRoutes = require("./routes/cartRoute");
const cors = require("cors");
const morgan = require("morgan"); // Import Morgan
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Create a write stream (in append mode) for logging to a file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Use Morgan for logging HTTP requests to the console and to the access.log file
app.use(morgan("combined", { stream: accessLogStream })); // Logs to file
app.use(morgan("dev")); // Logs to console in a simple, colored format

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
