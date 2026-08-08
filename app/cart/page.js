"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, saveCart } from "../lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setCart(getCart()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const updateQuantity = (id, change) => {
    const updated = cart.map((item) => item._id === id ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0);
    setCart(updated);
    saveCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Your bag</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Shopping cart</h1>
        {cart.length === 0 ? (
          <section className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200"><p className="text-slate-600">Your cart is empty.</p><Link href="/" className="mt-5 inline-flex rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">Browse products</Link></section>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <section className="space-y-4">{cart.map((item) => <article key={item._id} className="flex gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200"><img src={item.image} alt={item.title} className="h-24 w-24 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><Link href={`/products/${item._id}`} className="font-bold text-slate-900 hover:text-emerald-700">{item.title}</Link><p className="mt-1 text-sm text-slate-500">PKR {item.price?.toFixed(2)}</p><div className="mt-3 flex items-center gap-3"><button onClick={() => updateQuantity(item._id, -1)} className="h-8 w-8 rounded-full border border-slate-300">−</button><span className="text-sm font-semibold">{item.quantity}</span><button onClick={() => updateQuantity(item._id, 1)} className="h-8 w-8 rounded-full border border-slate-300">+</button></div></div></article>)}</section>
            <aside className="h-fit rounded-3xl bg-slate-900 p-6 text-white"><h2 className="text-xl font-bold">Summary</h2><div className="mt-5 flex justify-between text-slate-300"><span>Subtotal</span><span>PKR {total.toFixed(2)}</span></div><div className="mt-3 flex justify-between text-slate-300"><span>Islamabad delivery</span><span>PKR 250</span></div><div className="my-5 border-t border-slate-700" /><div className="flex justify-between text-lg font-bold"><span>Total</span><span>PKR {(total + 250).toFixed(2)}</span></div><Link href="/checkout" className="mt-6 block rounded-xl bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400">Continue to checkout</Link></aside>
          </div>
        )}
      </div>
    </main>
  );
}
