import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Authenticate using the service account JSON
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: [process.env.DRIVE_SCOPE || "https://www.googleapis.com/auth/drive"],
});

// Create Drive client
const drive = google.drive({ version: "v3", auth });

// Grant access to a user (reader/writer)
export async function grantAccess(folderId, userEmail, role = "reader") {
  try {
    const res = await drive.permissions.create({
      fileId: folderId,
      requestBody: {
        type: "user",
        role: role,        // "reader", "writer", or "commenter"
        emailAddress: userEmail,
      },
      sendNotificationEmail: true, // user will get an email
      fields: "id",
      supportsAllDrives: true,
    });
    return { success: true, permissionId: res.data.id };
  } catch (err) {
    console.error("Drive grant error:", err.message);
    return { success: false, error: err.message };
  }
}

// Revoke access for a user
export async function revokeAccess(folderId, userEmail) {
  try {
    // Find the permission ID first
    const list = await drive.permissions.list({
      fileId: folderId,
      fields: "permissions(id,emailAddress)",
      supportsAllDrives: true,
    });

    const perm = list.data.permissions.find(
      (p) => p.emailAddress === userEmail
    );

    if (!perm) return { success: false, message: "Permission not found" };

    await drive.permissions.delete({
      fileId: folderId,
      permissionId: perm.id,
      supportsAllDrives: true,
    });

    return { success: true };
  } catch (err) {
    console.error("Drive revoke error:", err.message);
    return { success: false, error: err.message };
  }
}
