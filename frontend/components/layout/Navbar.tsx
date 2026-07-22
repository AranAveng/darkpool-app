export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 font-bold text-black">
            D
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">DarkPool</h1>
            <p className="text-xs text-gray-400">
              Private Prediction Markets
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
          <a href="#">Markets</a>
          <a href="#">Create</a>
          <a href="#">Portfolio</a>
          <a href="#">Leaderboard</a>
        </div>

        {/* Wallet Button */}
        <button className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black transition hover:bg-cyan-400">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}