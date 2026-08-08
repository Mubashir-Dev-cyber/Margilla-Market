"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { addToCart } from "../lib/cart";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/products").then((response) => response.json()).then(setProducts).catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const response = await fetch("/api/ai-search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: trimmedQuery }) });
    const data = await response.json();
    if (response.ok) setProducts(data);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Margilla Market catalog</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Products</h1>
            <div className="mt-5 flex max-w-xl gap-2"><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleSearch()} type="search" placeholder="Search products..." className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" /><button type="button" onClick={handleSearch} className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">Search</button></div>
          </div>
          <div className="rounded-3xl bg-white px-5 py-4 text-center shadow-sm ring-1 ring-slate-200"><p className="text-sm text-slate-500">Products found</p><p className="mt-1 text-2xl font-semibold text-slate-900">{products.length}</p></div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{products.length === 0 ? <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">Loading products...</div> : products.map((product) => <article key={product._id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"><Link href={`/products/${product._id}`} className="block h-48 bg-slate-100"><img src={product.image} alt={product.title} className="h-full w-full object-cover" /></Link><div className="space-y-4 p-5"><div><p className="text-sm uppercase tracking-[0.25em] text-slate-500">{product.category}</p><Link href={`/products/${product._id}`} className="mt-2 block text-xl font-semibold text-slate-900 hover:text-emerald-700">{product.title}</Link></div><p className="text-sm leading-6 text-slate-600">{product.description}</p><div className="flex items-center justify-between gap-3"><span className="text-lg font-bold text-slate-900">PKR {product.price?.toFixed(2)}</span><button onClick={() => addToCart(product)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">Add to cart</button></div></div></article>)}</div>
      </div>
    </main>
  );
}
