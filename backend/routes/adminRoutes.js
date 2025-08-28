import express from "express";
import {
    loginAdmin,
    updateUserStatus,
    sendCourseLink,
    getDashboardStats,
    deleteUser,
    getUser,
    getAllUsers,
    logoutAdmin,
    updateAdminName,
    getAdminProfile,
    updatePassword,
    deleteAccount
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
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);         // ✅ get single user by ID
router.put("/update", protect, updateAdminName);
router.get("/profile", protect, getAdminProfile);
router.put("/change-password", protect, updatePassword);
router.delete('/delete-account', protect, deleteAccount);




export default router;
