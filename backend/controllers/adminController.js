import Admin from "../models/Admin.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { revokeAccess } from "../googleDrive.js"; // your function to revoke access
import mongoose from "mongoose";


// Helper function to send course link email
const sendCourseLinkEmail = async (user) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: user.email,
            subject: "✨ Your Magical Calligraphy Course Access is Now Active ✨",
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; color: #333;">
                <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
                  
                  <!-- Header -->
                  <div style="background: linear-gradient(135deg, #6b46c1, #3182ce); padding: 25px; text-align: center; color: #fff;">
                    <h1 style="margin: 0; font-size: 24px;">Magical Calligraphy</h1>
                  </div>
                  
                  <!-- Body -->
                  <div style="padding: 25px;">
                    <h2 style="color: #1a202c; font-size: 20px; margin-top: 0;">Welcome, ${user.fullName}!</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
                      We’re thrilled to inform you that your <strong>payment has been verified</strong> and your course access is now active! 🎉
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
                      <strong>Start your journey here:</strong>
                    </p>
                    <p style="text-align: center; margin: 30px 0;">
                      <a href="https://drive.google.com/drive/folders/1o0nbIjlwAJKwh-3r2UzTSVKfL8cju1Be?usp=drive_link" target="_blank" 
                        style="background-color: #6b46c1; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: bold;">
                        Access Your Course
                      </a>
                    </p>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
                      You can now begin your handwriting transformation journey. We look forward to seeing your progress!
                    </p>
                    
                    <p style="margin-top: 30px; font-size: 14px; color: #718096;">
                      Best regards,<br>
                      <strong>Magical Calligraphy Team</strong>
                    </p>
                  </div>
                </div>
              </div>
            `,
        });

    } catch (error) {
        console.error('Email sending error:', error);
        throw new Error('Failed to send email');
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;

        // Simple validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required."
            });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        // Set token expiry based on rememberMe
        const tokenExpiry = rememberMe ? "7d" : "1d";
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: tokenExpiry });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
        });

        res.json({
            success: true,
            admin: { id: admin._id, username: admin.username },
        });

    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




export const logoutAdmin = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        expires: new Date(0), // expire immediately
    });
    res.json({ success: true, message: "Logged out successfully" });
};


// Update Admin Name
export const updateAdminName = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        // admin id from protect middleware
        const adminId = req.admin;

        const admin = await Admin.findByIdAndUpdate(
            adminId,
            { name },
            { new: true, runValidators: true }
        );

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Admin name updated successfully",
            admin,
        });
    } catch (error) {
        console.error("Update admin name error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating admin name",
        });
    }
};






export const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const adminId = req.admin;

        // Validate input
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'New passwords do not match' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        // Password strength check
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain uppercase, lowercase, number, and special character'
            });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Save changes
        admin.password = hashedPassword;
        admin.passwordChangedAt = new Date();
        admin.updatedAt = new Date();

        await admin.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });

    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export const deleteAccount = async (req, res) => {
    const adminId = req.admin; // assuming req.user is set by auth middleware

    if (!adminId) {
        res.status(401);
        throw new Error('Admin not found you cannot delete account.');
    }

    try {
        await Admin.findByIdAndDelete(adminId);
        // Optionally, clear cookies or session here
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ message: 'Failed to delete account' });
    }
};

// 🔹 Fetch admin profile
export const getAdminProfile = async (req, res) => {
    try {
        const adminId = req.admin; // or req.adminId, depending on your auth middleware
        const admin = await Admin.findById(adminId).select("name username");

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ name: admin.name, username: admin.username });
    } catch (error) {
        console.error("Error fetching admin profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};




// Get all users (for admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
};

// Get single user
export const getUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
        }

        const user = await User.findById(req.params.id).select(
            'fullName email whatsapp status createdAt driveFolderId paymentScreenshot'
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user'
        });
    }
};


// Delete user (for admin) and remove access
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Revoke Google Drive access if folderId exists
    if (user.driveFolderId && user.email) {
      const revokeRes = await revokeAccess(user.driveFolderId, user.email);
      if (!revokeRes.success) {
        console.warn(`Failed to revoke access for ${user.email}: ${revokeRes.error || revokeRes.message}`);
      }
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "User deleted and access removed successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};


export const updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Update user with validation
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // If approved, send course link email
        if (status === "approved") {
            try {
                await sendCourseLinkEmail(user);
            } catch (emailError) {
                console.error("Email sending failed:", emailError);
                // Don’t fail the whole request just because email didn’t send
            }
        }

        return res.status(200).json({
            success: true,
            message: "User status updated successfully",
            user,
        });
    } catch (error) {
        console.error("Update user error:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating user",
        });
    }
};


export const sendCourseLink = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.paid) {
            return res.status(400).json({
                success: false,
                message: "Payment not completed"
            });
        }

        await sendCourseLinkEmail(user);

        res.json({
            success: true,
            message: "Course link sent successfully"
        });
    } catch (error) {
        console.error('Send course link error:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending course link'
        });
    }
};



export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const pendingUsers = await User.countDocuments({ status: 'pending' });
        const approvedUsers = await User.countDocuments({ status: 'approved' });
        const rejectedUsers = await User.countDocuments({ status: 'rejected' });

        res.json({
            success: true,
            stats: {
                totalUsers,
                pendingUsers,
                approvedUsers,
                rejectedUsers
            }
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard stats'
        });
    }
};
