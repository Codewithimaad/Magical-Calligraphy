
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// Register new user
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, whatsapp } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Payment screenshot is required",
            });
        }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "payment_screenshots",
        });

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            whatsapp,
            paymentScreenshot: result.secure_url, // ✅ save Cloudinary URL
        });

        res.status(201).json({
            success: true,
            message:
                "Registration successful! We will verify your payment and contact you soon.",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                status: user.status,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);

        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validationErrors,
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};




