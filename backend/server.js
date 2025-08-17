import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/configDB.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cloudinary from "./config/cloudinary.js"; // ✅ Imported

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();


const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL
];



app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route ✅
app.get("/", (req, res) => {
    res.json({ success: true, message: "API running 🚀" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server Error",
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
