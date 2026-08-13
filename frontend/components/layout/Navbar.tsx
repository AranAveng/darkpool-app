"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useWallet } from "@/hooks/useWallet";
import WalletModal from "@/components/WalletModal";
import Toast from "@/components/Toast";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [balance, setBalance] = useState("0");

  const { address, isConnected, disconnect } = useWallet();

  useEffect(() => {
  setMounted(true);

  async function loadBalance() {
    if (!window.ethereum || !address) return;

    const provider = new ethers.BrowserProvider(window.ethereum);

    const bal = await provider.getBalance(address);

    setBalance(Number(ethers.formatEther(bal)).toFixed(2));
  }

  loadBalance();
}, [address]);

  

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

    const ADMIN =
  "0xa1A6d000859955f62C8fDbFB101f70a00F3cc856".toLowerCase();

const isAdmin =
  address?.toLowerCase() === ADMIN;

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
  <img
    src="/darkpool-logo.png"
    alt="DarkPool"
    className="h-full w-full object-cover"
  />
</div>

            <div>
              <h1 className="text-lg font-bold text-white">
                DarkPool
              </h1>
              <p className="text-xs text-gray-400">
                Private Prediction Markets
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
  <a href="/">Markets</a>
  <a href="/create">Create</a>
  <a href="/portfolio">Portfolio</a>
  <button
  type="button"
  onClick={() => {
    setShowComingSoon(true);

    setTimeout(() => {
      setShowComingSoon(false);
    }, 2500);
  }}
  className="text-gray-300 transition hover:text-white"
>
  Leaderboard
</button>
<a
  href="/how-it-works"
  className="text-gray-300 transition hover:text-white"
>
  How it works
</a>

  {isAdmin && (
    <a
      href="/admin"
      className="rounded-lg bg-cyan-500 px-3 py-2 font-semibold text-black hover:bg-cyan-400"
    >
      Admin
    </a>
  )}
</div>

          {/* Wallet */}
          {!mounted ? null : isConnected ? (
            <div className="relative">
              <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black transition hover:bg-cyan-400"
>
  <div className="text-left">
    <div className="text-xs">{balance} FLR</div>
    <div>{shortAddress}</div>
  </div>
</button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#111827] p-2 shadow-xl">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(address ?? "");
                      setMenuOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-white hover:bg-white/10"
                  >
                    📋 Copy Address
                  </button>

                  <button
                    onClick={() => {
                      disconnect();
                      setMenuOpen(false);
                    }}
                    className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-red-400 hover:bg-white/10"
                  >
                    🔌 Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black transition hover:bg-cyan-400"
            >
              Connect Wallet
            </button>
          )}
        </div>
 <Toast
  message={showComingSoon ? "🚧 Leaderboard coming soon!" : ""}
/>
      </nav>

      <WalletModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}