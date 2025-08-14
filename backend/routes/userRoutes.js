import express from "express";
import { registerUser, handlePayment } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/payment", handlePayment);

export default router;
