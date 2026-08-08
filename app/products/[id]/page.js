"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { addToCart } from "../../lib/cart";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        setProduct(await response.json());
      } finally {
        setLoading(false);
      }
    };

    loadProduct().catch(() => setProduct(null));
  }, [id]);

  if (loading) return <main className="min-h-screen bg-slate-50 p-10 text-center text-slate-500">Loading product...</main>;
  if (!product) return <main className="min-h-screen bg-slate-50 p-10 text-center"><h1 className="text-2xl font-bold text-slate-900">Product not found</h1><Link href="/" className="mt-4 inline-block text-emerald-700">Back to shop</Link></main>;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">← Back to shop</Link>
        <div className="mt-6 grid gap-8 overflow-hidden rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:grid-cols-2 md:p-8">
          <div className="overflow-hidden rounded-3xl bg-slate-100"><img src={product.image} alt={product.title} className="h-64 w-full object-cover sm:h-80 md:h-full md:min-h-80" /></div>
          <div className="flex flex-col justify-center p-2 md:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">{product.category}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{product.title}</h1>
            <p className="mt-5 text-3xl font-bold text-slate-900">PKR {product.price?.toFixed(2)}</p>
            <p className="mt-5 leading-7 text-slate-600">{product.description}</p>
            <button onClick={() => { addToCart(product); setAdded(true); }} className="mt-8 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700">{added ? "Added to cart ✓" : "Add to cart"}</button>
            {added && <Link href="/checkout" className="mt-3 text-center text-sm font-semibold text-slate-700 hover:text-emerald-700">Go to checkout →</Link>}
          </div>
        </div>
      </div>
    </main>
  );
}
