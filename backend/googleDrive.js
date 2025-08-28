import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Get the JSON string from environment variable
const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

if (!serviceAccountJson) {
  throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON environment variable is required");
}

let credentials;
try {
  // Parse the JSON string
  credentials = JSON.parse(serviceAccountJson);
  
  // Ensure private key has proper newlines (in case they got escaped)
  if (credentials.private_key) {
    credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
  }
} catch (error) {
  throw new Error("Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON: " + error.message);
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: [process.env.DRIVE_SCOPE || "https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// Grant access to a user
export async function grantAccess(folderId, userEmail, role = "reader") {
  try {
    const res = await drive.permissions.create({
      fileId: folderId,
      requestBody: {
        type: "user",
        role,
        emailAddress: userEmail,
      },
      sendNotificationEmail: true,
      fields: "id",
      supportsAllDrives: true,
    });
    return { success: true, permissionId: res.data.id };
  } catch (err) {
    console.error("Drive grant error:", err.message);
    return { 
      success: false, 
      error: err.message,
      code: err.code 
    };
  }
}

// Revoke access for a user
export async function revokeAccess(folderId, userEmail) {
  try {
    const list = await drive.permissions.list({
      fileId: folderId,
      fields: "permissions(id,emailAddress,type,role,deleted)",
      supportsAllDrives: true,
    });

    const userPermission = list.data.permissions.find(
      (p) => p.emailAddress === userEmail && p.type === "user" && !p.deleted
    );

    // Treat "no explicit permission" as success
    if (!userPermission) {
      return { 
        success: true, 
        permissionId: null,
        message: `User ${userEmail} had no explicit access.`
      };
    }

    await drive.permissions.delete({
      fileId: folderId,
      permissionId: userPermission.id,
      supportsAllDrives: true,
    });

    return { 
      success: true, 
      permissionId: userPermission.id,
      message: `Access revoked for ${userEmail}`
    };
  } catch (err) {
    console.error("Drive revoke error:", err.message);
    
    if (err.code === 404) {
      return { success: false, error: "File/folder not found", code: 404 };
    } else if (err.code === 403) {
      return { success: false, error: "Permission denied", code: 403 };
    }

    return { success: false, error: err.message, code: err.code };
  }
}


