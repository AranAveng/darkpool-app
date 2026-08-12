import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          🚀 Powered by Flare
        </span>

        <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-tight text-white md:text-7xl">
          Private Prediction
          <br />
          Markets for Everyone
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Trade on real-world events while keeping your positions private.
          Built on Flare with confidential trading at its core.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/markets"
            className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400"
          >
            Explore Markets
          </Link>

          <Link
            href="/create"
            className="rounded-xl border border-gray-700 px-8 py-4 font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-400"
          >
            Create Market
          </Link>
        </div>
      </div>
    </section>
  );
}