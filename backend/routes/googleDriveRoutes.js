import express from "express";
import { grantDriveAccess, revokeDriveAccess } from "../controllers/googleDriveController.js";

const router = express.Router();

// POST /api/drive/grant
router.post("/grant", grantDriveAccess);

// POST /api/drive/revoke
router.post("/revoke", revokeDriveAccess);

export default router;
