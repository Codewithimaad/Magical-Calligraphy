import express from "express";
import {
    registerUser,
} from "../controllers/userController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", upload.single('paymentScreenshot'), registerUser);


export default router;
