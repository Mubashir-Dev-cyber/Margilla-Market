"use client"

import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: trimmedQuery }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Search failed");
      }

      setProducts(data);
    } catch (error) {
      console.error("Error searching products:", error);
    }             
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Shop</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">All Products</h1>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="mt-2 rounded-md border border-slate-300 bg-white text-black py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="mt-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 cursor-pointer mb-6"
            >
              Search
            </button>

            <p className="mt-2 max-w-2xl text-base text-slate-600">
              Browse the full product catalog. Each item is loaded from your backend and rendered with Tailwind CSS.
            </p>
          </div>
          <div className="rounded-3xl bg-white px-5 py-4 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total products</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{products.length}</p>
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 cursor-pointer">
          {products.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
              Loading products...
            </div>
          ) : (
            products.map((product) => (
              <article key={product._id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="h-48 bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{product.category}</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">{product.title}</h2>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">${product.price?.toFixed(2)}</span>
                    <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
                      View
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
