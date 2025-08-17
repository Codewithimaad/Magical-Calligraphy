import express from "express";
import {
    loginAdmin,
    updateUserStatus,
    sendCourseLink,
    getDashboardStats,
    deleteUser,
    getUser,
    getAllUsers
} from "../controllers/adminController.js";

const router = express.Router();

// Public route
router.post("/login", loginAdmin);

// Protected routes
router.get("/dashboard-stats", getDashboardStats);
router.put("/users/:id/status", updateUserStatus);
router.post("/send-link/:id", sendCourseLink);
router.delete("/users/:id", deleteUser);   // ✅ delete user by ID
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);         // ✅ get single user by ID

export default router;
