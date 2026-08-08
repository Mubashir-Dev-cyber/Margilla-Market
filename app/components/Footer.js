import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">Margilla Market</Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">A welcoming marketplace for discovering useful products across Islamabad.</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Explore</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600"><Link href="/" className="hover:text-emerald-700">Home</Link><Link href="/products" className="hover:text-emerald-700">Products</Link><Link href="/about" className="hover:text-emerald-700">About us</Link></div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Your order</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600"><Link href="/cart" className="hover:text-emerald-700">Shopping cart</Link><Link href="/checkout" className="hover:text-emerald-700">Checkout</Link><span>Cash on delivery available</span></div>
        </div>
      </div>
      <div className="border-t border-slate-100"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><span>© {new Date().getFullYear()} Margilla Market</span><span>Made with <span className="text-red-500" aria-label="love">♥</span> by Mubashir</span></div></div>
    </footer>
  );
}
