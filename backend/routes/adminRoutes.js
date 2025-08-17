import express from "express";
import {
    loginAdmin,
    updateUserStatus,
    sendCourseLink,
    getDashboardStats,
    deleteUser,
    getUser,
    getAllUsers,
    logoutAdmin
} from "../controllers/adminController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/check-auth", protect, (req, res) => {
    res.json({ success: true, message: "Authenticated" });
});

// Protected routes
router.get("/dashboard-stats", protect, getDashboardStats);
router.put("/users/:id/status", protect, updateUserStatus);
router.post("/send-link/:id", protect, sendCourseLink);
router.delete("/users/:id", protect, deleteUser);   // ✅ delete user by ID
router.get("/users", protect, protect, getAllUsers);
router.get("/users/:id", protect, getUser);         // ✅ get single user by ID

export default router;
