import express from "express";
import { loginAdmin, getUsers, sendCourseLink } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/users", protect, getUsers);
router.post("/send-link/:id", protect, sendCourseLink);

export default router;
