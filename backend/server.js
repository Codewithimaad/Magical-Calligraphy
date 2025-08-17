import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/configDB.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL
];

app.use(helmet());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) callback(null, true);
        else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", adminRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server Error",
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`✅ Server running on port ${PORT}`)
);
