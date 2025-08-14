import Admin from "../models/Admin.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
};

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

export const sendCourseLink = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user.paid) return res.status(400).json({ message: "Payment not completed" });

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "Your Magical Calligraphy Course Link",
        text: "Here is your course link: https://your-course-link.com",
    });

    res.json({ message: "Course link sent successfully" });
};
