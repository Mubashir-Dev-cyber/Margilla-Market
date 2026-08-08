import connectDB from "@/lib/db";
import Order from "@/models/Order";

const DELIVERY_FEE = 250;

export async function POST(request) {
    try {
        const { customer, items } = await request.json();
        if (!customer?.name || !customer?.phone || !customer?.area || !customer?.pincode || !customer?.address) {
            return Response.json({ error: "All delivery details are required" }, { status: 400 });
        }
        if (!Array.isArray(items) || items.length === 0) {
            return Response.json({ error: "Your cart is empty" }, { status: 400 });
        }

        const orderItems = items.map((item) => ({
            productId: String(item._id),
            title: item.title,
            price: Number(item.price) || 0,
            quantity: Math.max(1, Number(item.quantity) || 1),
            image: item.image,
        }));
        const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await connectDB();
        const order = await Order.create({ customer, items: orderItems, subtotal, deliveryFee: DELIVERY_FEE, total: subtotal + DELIVERY_FEE });
        return Response.json({ orderId: order._id }, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return Response.json({ error: "Unable to place order" }, { status: 500 });
    }
}
