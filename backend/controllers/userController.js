import User from "../models/User.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const registerUser = async (req, res) => {
    const { name, email, phone } = req.body;
    const user = await User.create({ name, email, phone });
    res.json(user);
};

export const handlePayment = async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: { name: "Magical Calligraphy Course" },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success?userId=${userId}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
