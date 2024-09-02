const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const courseRoutes = require("./routes/courseRoute");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
