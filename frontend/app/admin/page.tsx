"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { getReadContract } from "@/lib/contract";

export default function AdminPage() {
  const { address } = useWallet();
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
    <main className="mx-auto max-w-7xl p-8 text-white">
      <h1 className="text-4xl font-bold">
        DarkPool Admin Dashboard
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-[#111827] p-6">
          <p className="text-white">Total Markets</p>
          <h2 className="mt-2 text-3xl font-bold">
  {totalMarkets}
</h2>
        </div>

        <div className="rounded-xl bg-[#111827] p-6">
          <p className="text-white">Treasury Balance</p>
          <h2 className="mt-2 text-3xl font-bold">-- FLR</h2>
        </div>

        <div className="rounded-xl bg-[#111827] p-6">
          <p className="text-white">Active Markets</p>
          <h2 className="mt-2 text-3xl font-bold">
  {activeMarkets}
</h2>
        </div>

      </div>
    </main>
  );
}