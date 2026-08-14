export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1120]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
                <img
                  src="/darkpool-logo.png"
                  alt="DarkPool"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-lg font-bold text-white">
                DarkPool
              </h2>
            </div>
            <p className="text-sm text-white">
              Trade privately. Built on Flare.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center gap-3 text-sm text-white md:items-start">
            <a href="/" className="hover:text-cyan-400">
              Markets
            </a>
            <a href="/create" className="hover:text-cyan-400">
              Create
            </a>
            <a href="/portfolio" className="hover:text-cyan-400">
              Portfolio
            </a>
            <a href="/how-it-works" className="hover:text-cyan-400">
              How it works
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white">
          © 2026 DarkPool. All rights reserved.
        </div>
      </div>
    </footer>
  );
}