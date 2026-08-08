"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "../lib/cart";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCart().reduce((total, item) => total + item.quantity, 0));
    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);
    return () => window.removeEventListener("cart-updated", updateCartCount);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-xl text-white shadow-sm">
            ✦
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight text-slate-900">Margilla Market</span>
            <span className="block text-xs font-medium text-emerald-700">Islamabad marketplace</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-semibold text-slate-600 sm:gap-3">
          <Link href="/" className="rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700">
            Home
          </Link>
          <Link href="/products" className="rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700">
            Products
          </Link>
          <Link href="/about" className="rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700">
            About
          </Link>
          <Link href="/cart" className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-emerald-700">
            Cart{cartCount > 0 ? ` (${cartCount})` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}
