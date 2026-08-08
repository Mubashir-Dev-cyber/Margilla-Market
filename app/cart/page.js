"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, saveCart } from "../lib/cart";

const DELIVERY_FEE = 250;

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setCart(getCart()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const updateQuantity = (id, change) => {
    const updated = cart
      .map((item) => item._id === id ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0);
    setCart(updated);
    saveCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    saveCart(updated);
  };

  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Your selection</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Shopping cart</h1>
            <p className="mt-2 text-slate-600">{itemCount === 0 ? "Nothing here yet." : `${itemCount} ${itemCount === 1 ? "item" : "items"} ready for checkout.`}</p>
          </div>
          {cart.length > 0 && <button type="button" onClick={clearCart} className="self-start text-sm font-semibold text-slate-500 underline-offset-4 hover:text-red-600 hover:underline sm:self-auto">Clear cart</button>}
        </div>

        {cart.length === 0 ? (
          <section className="mt-10 rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-4xl">🛍️</div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900">Your cart is waiting for something good.</h2>
            <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">Explore the Margilla Market catalog and add products you would like delivered in Islamabad.</p>
            <Link href="/products" className="mt-7 inline-flex rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">Browse products</Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <section className="space-y-4">
              {cart.map((item) => {
                const itemTotal = (item.price || 0) * item.quantity;
                return (
                    <article key={item._id} className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:gap-6 sm:p-5">
                    <Link href={`/products/${item._id}`} className="shrink-0"><img src={item.image} alt={item.title} className="h-48 w-full rounded-2xl object-cover sm:h-36 sm:w-36" /></Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 py-1">
                      <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.category}</p><Link href={`/products/${item._id}`} className="mt-1 block font-bold text-slate-900 hover:text-emerald-700">{item.title}</Link></div><button type="button" onClick={() => removeItem(item._id)} aria-label={`Remove ${item.title}`} className="text-xl leading-none text-slate-400 hover:text-red-600">×</button></div>
                      <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm text-slate-500">PKR {item.price?.toFixed(2)} each</p><div className="mt-2 flex items-center gap-3"><button type="button" onClick={() => updateQuantity(item._id, -1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-lg text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700">−</button><span className="min-w-5 text-center text-sm font-bold text-slate-900">{item.quantity}</span><button type="button" onClick={() => updateQuantity(item._id, 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-lg text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700">+</button></div></div><p className="font-bold text-slate-900">PKR {itemTotal.toFixed(2)}</p></div>
                    </div>
                  </article>
                );
              })}
              <Link href="/products" className="inline-flex pt-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800">← Continue shopping</Link>
            </section>

            <aside className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-lg sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Order summary</p>
              <div className="mt-6 space-y-4 text-sm"><div className="flex justify-between text-slate-300"><span>Subtotal</span><span>PKR {subtotal.toFixed(2)}</span></div><div className="flex justify-between text-slate-300"><span>Islamabad delivery</span><span>PKR {DELIVERY_FEE.toFixed(2)}</span></div></div>
              <div className="my-6 border-t border-slate-700" />
              <div className="flex items-end justify-between"><span className="text-lg font-bold">Total</span><span className="text-2xl font-bold">PKR {total.toFixed(2)}</span></div>
              <Link href="/checkout" className="mt-7 block rounded-xl bg-emerald-500 px-5 py-3.5 text-center font-bold text-white transition hover:bg-emerald-400">Continue to checkout</Link>
              <p className="mt-5 text-center text-xs leading-5 text-slate-400">Cash on delivery available across Islamabad.</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
