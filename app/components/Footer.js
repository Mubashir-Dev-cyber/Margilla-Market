import Link from "next/link";

const linkClass = "transition-colors hover:text-emerald-700";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12 md:py-12 lg:px-8">
        <div className="col-span-2 md:col-span-1 md:pr-8">
          <Link href="/" className="inline-block text-xl font-bold tracking-tight text-slate-900 transition-colors hover:text-emerald-700">
            Margilla Market
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
            A welcoming marketplace for discovering useful products across Islamabad.
          </p>
          <p className="mt-5 inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            Local shopping, made simple.
          </p>
        </div>

        <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Explore</h2>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-600" aria-label="Explore">
              <Link href="/" className={linkClass}>Home</Link>
              <Link href="/products" className={linkClass}>Products</Link>
              <Link href="/about" className={linkClass}>About us</Link>
            </nav>
        </div>

        <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Your order</h2>
            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-600" aria-label="Your order">
              <Link href="/cart" className={linkClass}>Shopping cart</Link>
              <Link href="/checkout" className={linkClass}>Checkout</Link>
              <span>Cash on delivery</span>
            </nav>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-5 text-center text-xs text-slate-500 sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <span>&copy; {new Date().getFullYear()} Margilla Market</span>
          <span>
            Made with <span className="text-red-500" aria-label="love">&hearts;</span> by Mubashir
          </span>
        </div>
      </div>
    </footer>
  );
}
