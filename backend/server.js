import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/configDB.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import GooleDriveRoutes from './routes/googleDriveRoutes.js'
import cloudinary from "./config/cloudinary.js"; // ✅ Imported
import cookieParser from "cookie-parser";
import helmet from "helmet"; // ✅ Added

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL
];

// ✅ Helmet middleware for security headers
app.use(helmet());

// ✅ CORS setup with multiple origins
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route ✅
app.get("/", (req, res) => {
    res.json({ success: true, message: "API running 🚀" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
// Mount drive routes
app.use("/api/drive", GooleDriveRoutes);

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
