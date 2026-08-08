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
      <div className="relative mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-lg text-white shadow-sm sm:h-10 sm:w-10 sm:text-xl">
            ✦
          </span>
          <span>
            <span className="block truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">Margilla Market</span>
            <span className="block text-xs font-medium text-emerald-700">Islamabad marketplace</span>
          </span>
        </Link>

        <nav className="grid w-full grid-cols-3 items-center gap-1 border-t border-slate-100 pt-2 text-center text-xs font-semibold text-slate-600 sm:flex sm:w-auto sm:gap-3 sm:border-0 sm:pt-0 sm:text-sm">
          <Link href="/" className="rounded-full px-2 py-2 transition hover:bg-emerald-50 hover:text-emerald-700 sm:px-3">
            Home
          </Link>
          <Link href="/products" className="rounded-full px-2 py-2 transition hover:bg-emerald-50 hover:text-emerald-700 sm:px-3">
            Products
          </Link>
          <Link href="/about" className="rounded-full px-2 py-2 transition hover:bg-emerald-50 hover:text-emerald-700 sm:px-3">
            About
          </Link>
          <Link href="/cart" className="absolute right-4 top-3 rounded-full bg-slate-900 px-3 py-2 text-xs text-white transition hover:bg-emerald-700 sm:static sm:px-4 sm:text-sm">
            Cart{cartCount > 0 ? ` (${cartCount})` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}
