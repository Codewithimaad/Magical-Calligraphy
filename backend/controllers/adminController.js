import Admin from "../models/Admin.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

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
                      <a href="https://your-course-link.com" target="_blank" 
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
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({
            success: true,
            token,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
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
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user'
        });
    }
};


// Delete user (for admin)
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting user'
        });
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
