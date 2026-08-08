import OpenAI from "openai";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

/*
  Previous implementation kept for learning/reference.

  It was replaced because it required exactly 10 AI-generated keywords and
  could fail when OpenAI returned fewer keywords. The active implementation
  below accepts up to 10 keywords and also works without an OpenAI key.

  export async function previousPOST(req) {
    try {
      const { query } = await req.json();
      const trimmedQuery = query?.trim();

      if (!trimmedQuery) {
        return Response.json({ error: "Search query is required" }, { status: 400 });
      }

      const aiRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
          role: "user",
          content: `Convert this product search into exactly 10 relevant product keywords.
Return only the keywords as a single comma-separated line, with no numbering or extra text.
Search: ${trimmedQuery}`,
        }],
      });

      const keywords = aiRes.choices[0].message.content
        .split(",")
        .map((keyword) => keyword.trim().replace(/^[-\\d.)\\s]+/, ""))
        .filter(Boolean)
        .slice(0, 10);

      if (keywords.length !== 10) {
        return Response.json({ error: "AI did not return exactly 10 keywords" }, { status: 502 });
      }

      await connectDB();
      return Response.json(await Product.find({
        $or: keywords.flatMap((keyword) => {
          const regex = { $regex: escapeRegex(keyword), $options: "i" };
          return [{ title: regex }, { description: regex }, { category: regex }];
        }),
      }));
    } catch (error) {
      console.error("Error searching products:", error);
      return Response.json({ error: "Error searching products" }, { status: 500 });
    }
  }
*/

/*
  Previous MongoDB vector-search experiment kept for learning/reference.
  The missing `queryEmbedding` and `results` variables were the runtime
  errors in this version.

  // Approach A (slower): Find products with similar embeddings using cosine similarity
  // Convert this query to embeddings
  // const queryEmbedding = await generateVector(query);

  // find products with similar embeddings (This is a simple cosine similarity search)
  // const allProducts = await Product.find({});
  // const productsWithSimilarity = allProducts.map(product => {
  //   const similarity = cosineSimilarity(queryEmbedding, product.embedding);
  //   return { ...product.toObject(), similarity };
  // });

  // Sort products with similarity in descending order
  // productsWithSimilarity.sort((a, b) => b.similarity - a.similarity);
  // const topProducts = productsWithSimilarity.slice(0, 10);

  // only keep products with similarity above a certain threshold (e.g., 0.7)
  // const filteredTopProducts = topProducts.filter(product => product.similarity > 0.7);
  // const topProductData = filteredTopProducts.slice(0, 10);

  // Approach B (faster): Use MongoDB's vector search
  // measuring the time of the query

  const results = await Product.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "query_embedding",
        queryVector: queryEmbedding,
        numCandidates: 10,
        limit: 10,
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        price: 1,
        category: 1,
        image: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ]);

  // The intended flow was:
  // const queryEmbedding = await generateVector(query);
  // const results = await Product.aggregate([...]);
  // return Response.json(results);
*/

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function getKeywords(query) {
  if (!process.env.OPENAI_API_KEY) return query.split(/\s+/).filter(Boolean).slice(0, 10);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "user",
      content: `Return up to 10 comma-separated product search keywords for: ${query}`,
    }],
  });

  return response.choices[0].message.content
    .split(",")
    .map((keyword) => keyword.trim().replace(/^[-\d.)\s]+/, ""))
    .filter(Boolean)
    .slice(0, 10);
}

async function searchProducts(query) {
  const keywords = await getKeywords(query);
  const conditions = keywords.flatMap((keyword) => {
    const regex = { $regex: escapeRegex(keyword), $options: "i" };
    return [{ title: regex }, { description: regex }, { category: regex }];
  });

  await connectDB();
  return Product.find({ $or: conditions }).limit(50);
}

export async function POST(request) {
  try {
    const { query } = await request.json();
    if (!query?.trim()) return Response.json({ error: "Search query is required" }, { status: 400 });
    return Response.json(await searchProducts(query.trim()));
  } catch (error) {
    console.error("Error searching products:", error);
    return Response.json({ error: "Error searching products" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const query = new URL(request.url).searchParams.get("query")?.trim();
    if (!query) return Response.json({ error: "Search query is required" }, { status: 400 });
    return Response.json(await searchProducts(query));
  } catch (error) {
    console.error("Error searching products:", error);
    return Response.json({ error: "Error searching products" }, { status: 500 });
  }
}
