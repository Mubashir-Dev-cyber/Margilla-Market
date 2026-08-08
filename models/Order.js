import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: String,
}, { _id: false });

const orderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        area: { type: String, required: true, trim: true },
        pincode: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
    },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["pending", "confirmed", "delivered", "cancelled"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
