import OpenAI from "openai";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function POST(req) {
    try {
        const { query } = await req.json();
        const trimmedQuery = query?.trim();

        if (!trimmedQuery) {
            return Response.json({ error: "Search query is required" }, { status: 400 });
        }

        const aiRes = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Convert this product search into exactly 10 relevant product keywords.
Return only the keywords as a single comma-separated line, with no numbering or extra text.
Search: ${trimmedQuery}`,
                },
            ]
        });

        const keywords = aiRes.choices[0].message.content
            .split(",")
            .map((keyword) => keyword.trim().replace(/^[-\d.)\s]+/, ""))
            .filter(Boolean)
            .slice(0, 10);

        if (keywords.length !== 10) {
            return Response.json({ error: "AI did not return exactly 10 keywords" }, { status: 502 });
        }

        await connectDB();
        const products = await Product.find({
            $or: keywords.flatMap((keyword) => {
                const regex = { $regex: escapeRegex(keyword), $options: "i" };
                return [
                    { title: regex },
                    { description: regex },
                    { category: regex },
                ];
            }),
        });
        return Response.json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        return Response.json({ error: "Error searching products" }, { status: 500 });
    }
}
