import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    whatsapp: {
        type: Number,
        required: [true, 'WhatsApp number is required'],
        trim: true
    },
    paymentScreenshot: {
        type: String, // URL to uploaded file
        required: [true, 'Payment screenshot is required']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    driveFolderId: {
        type: String, // Google Drive folder ID
    },

}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);
