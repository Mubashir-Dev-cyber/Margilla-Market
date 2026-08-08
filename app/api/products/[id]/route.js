import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET(_request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const product = await Product.findById(id);

        if (!product) {
            return Response.json({ error: "Product not found" }, { status: 404 });
        }

        return Response.json(product);
    } catch (error) {
        return Response.json({ error: "Invalid product id" }, { status: 400 });
    }
}
