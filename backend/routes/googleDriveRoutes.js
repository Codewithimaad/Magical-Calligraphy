import express from "express";
import { grantDriveAccess, revokeDriveAccess } from "../controllers/googleDriveController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/drive/grant
router.post("/grant",protect, grantDriveAccess);

// POST /api/drive/revoke
router.post("/revoke",protect, revokeDriveAccess);

export default router;
