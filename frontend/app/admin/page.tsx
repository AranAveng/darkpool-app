"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useMarkets } from "@/hooks/useMarkets";
import { getReadContract } from "@/lib/contract";

export default function AdminPage() {
  const { address } = useWallet();
  const { markets } = useMarkets();
  const [totalMarkets, setTotalMarkets] = useState(0);
  const [activeMarkets, setActiveMarkets] = useState(0);

  const ADMIN =
    "0xa1A6d000859955f62C8fDbFB101f70a00F3cc856".toLowerCase();
    useEffect(() => {
  async function loadStats() {
    try {
      const contract = getReadContract();

      const nextMarketId = await contract.nextMarketId();

      setTotalMarkets(Number(nextMarketId));

      let active = 0;

for (let i = 0; i < Number(nextMarketId); i++) {
  const market = await contract.getMarket(i);

  // Status = Open (0)
  if (Number(market.status) === 0) {
    active++;
  }
}

setActiveMarkets(active);
    } catch (err) {
      console.error(err);
    }
  }

  loadStats();
}, []);

  if (!address) {
    return (
      <main className="mx-auto max-w-7xl p-8 text-white">
        Connect your wallet.
      </main>
    );
  }

  if (address.toLowerCase() !== ADMIN) {
    return (
      <main className="mx-auto max-w-7xl p-8 text-red-400">
        ❌ Access Denied
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
  <div className="mx-auto max-w-7xl p-8"></div>
      <h1 className="text-4xl font-bold">
        DarkPool Admin Dashboard
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

        <div className="rounded-xl bg-[#111827] p-6">
          <p className="text-white">Total Markets</p>
          <h2 className="mt-2 text-3xl font-bold">
  {totalMarkets}
</h2>
        </div>

       <div className="rounded-xl bg-[#111827] p-6">
          <p className="text-white">Active Markets</p>
          <h2 className="mt-2 text-3xl font-bold">
  {activeMarkets}
</h2>
        </div>

      </div>

      {/* Overdue Markets Alert */}
      {(() => {
        const now = Math.floor(Date.now() / 1000);
        const overdue = markets.filter(
          (m) => !m.resolved && m.endTime <= now
        );

        if (overdue.length === 0) return null;

        return (
          <div className="mt-8 rounded-xl border border-yellow-500 bg-yellow-500/10 p-6">
            <p className="mb-3 font-bold text-yellow-400">
              ⚠️ {overdue.length} market{overdue.length > 1 ? "s" : ""} ended but not resolved yet
            </p>
            <div className="space-y-2">
              {overdue.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-lg bg-[#0B1120] p-3"
                >
                  <span className="text-sm text-white">
                    {m.question}
                  </span>
                  <span className="text-xs text-white/60">
                    Creator: {m.creator?.slice(0, 6)}...{m.creator?.slice(-4)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* All Markets List */}
      <div className="mt-8 rounded-xl bg-[#111827] p-6">
        <h2 className="mb-5 text-2xl font-bold">
          All Markets
        </h2>

        <div className="space-y-3">
          {markets.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between rounded-lg bg-[#0B1120] p-4"
            >
              <div>
                <p className="font-semibold text-white">
                  #{m.id} — {m.question}
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Creator: {m.creator?.slice(0, 6)}...{m.creator?.slice(-4)}
                  {" • "}
                  Ends: {new Date(m.endTime * 1000).toLocaleString([], {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  m.resolved
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {m.resolved ? "✅ Resolved" : "🟢 Active"}
              </span>
            </div>
          ))}
        </div>
       </div>
    </main>
  );
}