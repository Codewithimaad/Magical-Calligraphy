import { grantAccess, revokeAccess } from "../googleDrive.js";
import User from '../models/User.js'
import dotenv from "dotenv";
dotenv.config();

const folderId = process.env.COURSE_DEFAULT_FOLDER_ID;

// Grant Google Drive access to a student
export const grantDriveAccess = async (req, res) => {
  try {
    const { email, role } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const result = await grantAccess(folderId, email, role || "reader");
    if (!result.success) {
      return res.status(500).json({ 
        error: result.error || "Failed to grant access",
        details: result.details 
      });
    }

    // Save folderId to user document
    const user = await User.findOne({ email });
    if (user) {
      user.driveFolderId = folderId; // store the folder ID
      await user.save();
    }

    return res.json({
      success: true,
      message: `Access granted to ${email}`,
      permissionId: result.permissionId,
    });
  } catch (err) {
    console.error("Grant access error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Revoke Google Drive access from a student
export const revokeDriveAccess = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: "Email is required" });

    const result = await revokeAccess(folderId, email);

    // Update user document to remove driveFolderId
    const user = await User.findOne({ email });
    if (user) {
      user.driveFolderId = null;
      await user.save();
    }

    if (result.success) {
      return res.json({ success: true, message: result.message || `Access revoked from ${email}` });
    }

    return res.status(result.code || 500).json({ success: false, error: result.error || "Failed to revoke access" });
  } catch (err) {
    console.error("Revoke access error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};


