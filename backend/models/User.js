import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    paid: { type: Boolean, default: false },
    paymentId: String,
});

export default mongoose.model("User", userSchema);
