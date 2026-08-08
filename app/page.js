import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] bg-emerald-950 px-6 py-14 text-white shadow-xl sm:px-12 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Welcome to Margilla Market</p>
          <div className="mt-5 grid gap-10 md:grid-cols-[1fr_300px] md:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">A marketplace made for Islamabad.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-100">Discover useful products, support local shopping, and get what you need closer to home.</p>
              <Link href="/products" className="mt-8 inline-flex rounded-full bg-white px-6 py-3.5 font-bold text-emerald-950 transition hover:bg-emerald-100">Explore products</Link>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur"><p className="text-sm text-emerald-200">Made for local life</p><p className="mt-3 text-3xl font-bold">Simple. Nearby. Yours.</p><p className="mt-3 leading-7 text-emerald-100">A focused shopping experience for people across Islamabad.</p></div>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Discover locally", "Find everyday essentials and thoughtful finds in one welcoming marketplace."],
            ["Search naturally", "Tell us what you are looking for and let smart search help you find it."],
            ["Delivered nearby", "Checkout with your Islamabad delivery details and keep shopping simple."],
          ].map(([title, description]) => <article key={title} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200"><h2 className="text-xl font-bold text-slate-900">{title}</h2><p className="mt-3 leading-7 text-slate-600">{description}</p></article>)}
        </section>

        <section className="mt-10 rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Your next find is waiting</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Start browsing the Margilla Market catalog.</h2>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">View all products</Link>
        </section>
      </div>
    </main>
  );
}
