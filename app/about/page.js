import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="overflow-hidden rounded-[2rem] bg-emerald-950 px-6 py-12 text-white shadow-xl sm:px-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Made for Islamabad</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Your local marketplace, closer to home.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-100">
            Margilla Market brings useful products and local discovery together for people across Islamabad and the surrounding communities.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["Local first", "Find products that make sense for life in Islamabad, from everyday essentials to thoughtful finds."],
            ["Simple shopping", "Browse a focused catalog, search naturally, and move from discovery to checkout with ease."],
            ["Built for community", "We want local buyers and sellers to have a welcoming, dependable place to connect."],
          ].map(([title, description]) => (
            <article key={title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Ready to explore?</h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">Take a look around and discover what is waiting for you in the Margilla Market marketplace.</p>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">
            Browse products
          </Link>
        </section>
      </div>
    </main>
  );
}
