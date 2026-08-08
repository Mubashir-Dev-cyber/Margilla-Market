"use client";

import { useState } from "react";
import { useEffect } from "react";
import { getCart } from "../lib/cart";

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setCart(getCart()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <section className="w-full max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">✓</div>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">Order received</h1>
          <p className="mt-3 leading-7 text-slate-600">Thanks for shopping with Margilla Market. We’ll confirm your order and delivery details soon.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Almost there</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">Checkout</h1>
          <p className="mt-2 text-slate-600">Tell us where to deliver your order in Islamabad.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">Delivery details</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2"><span className="text-sm font-semibold text-slate-700">Full name</span><input required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" /></label>
              <label><span className="text-sm font-semibold text-slate-700">Phone number</span><input required type="tel" placeholder="03XX XXXXXXX" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" /></label>
              <label><span className="text-sm font-semibold text-slate-700">Area</span><select className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"><option>F-6</option><option>F-7</option><option>F-8</option><option>G-9</option><option>G-11</option><option>I-8</option><option>Bahria Town</option><option>DHA Islamabad</option></select></label>
              <label className="sm:col-span-2"><span className="text-sm font-semibold text-slate-700">Street address</span><textarea required rows="3" placeholder="House number, street, and nearby landmark" className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" /></label>
            </div>
            <button type="submit" className="mt-7 w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-700">Place order</button>
          </form>

          <aside className="h-fit rounded-3xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
            <h2 className="text-xl font-bold">Order summary</h2>
            <div className="mt-6 space-y-4 border-b border-slate-700 pb-6 text-sm text-slate-300"><div className="flex justify-between"><span>Products ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span><span>PKR {subtotal.toFixed(2)}</span></div><div className="flex justify-between"><span>Delivery in Islamabad</span><span>PKR 250</span></div></div>
            <div className="mt-6 flex justify-between text-lg font-bold"><span>Estimated total</span><span>PKR {(subtotal + 250).toFixed(2)}</span></div>
            <p className="mt-5 text-sm leading-6 text-slate-400">Cash on delivery is available. Our team will contact you to confirm the final order total.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
