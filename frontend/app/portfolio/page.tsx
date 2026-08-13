"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/hooks/useWallet";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function PortfolioPage() {
  const { address } = useWallet();
  const { positions, loading } = usePortfolio();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    async function loadBalance() {
      if (!window.ethereum || !address) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const bal = await provider.getBalance(address);

      setBalance(Number(ethers.formatEther(bal)).toFixed(4));
    }

    loadBalance();
  }, [address]);

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">

        <h1 className="mb-2 text-4xl font-bold">
          My Portfolio
        </h1>

        <p className="mb-8 text-gray-400">
          View your prediction positions and rewards.
        </p>

        {/* Dashboard Cards */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-[#121826] p-6">
            <p className="text-sm text-gray-400">
              Wallet Balance
            </p>

            <p className="mt-3 text-3xl font-bold">
              {balance} FLR
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121826] p-6">
            <p className="text-sm text-gray-400">
              Open Positions
            </p>

            <p className="mt-3 text-3xl font-bold">
  {
    positions.filter(
      (p) => !p.resolved
    ).length
  }
</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121826] p-6">
            <p className="text-sm text-gray-400">
              Claimable Rewards
            </p>

            <p className="mt-3 text-3xl font-bold text-green-400">
  {
    positions.filter(
      (p) =>
        p.resolved &&
        p.won &&
        !p.claimed
    ).length
  }
</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121826] p-6">
            <p className="text-sm text-gray-400">
              Liquidity Provided
            </p>

            <p className="mt-3 text-3xl font-bold text-cyan-400">
              Coming Soon
            </p>
          </div>

        </div>

        {/* My Positions */}

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#121826] p-6">

          <h2 className="mb-5 text-2xl font-bold">
            My Positions
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

    <thead className="border-b border-white/10 text-left text-gray-400">
  <tr>
    <th className="pb-4">Market</th>
    <th className="pb-4">My Bet</th>
    <th className="pb-4">Amount</th>
    <th className="pb-4">Winning Side</th>
     <th className="pb-4">Status</th>
 </tr>
</thead>

              <tbody>

  {loading ? (

    <tr>
      <td
        colSpan={4}
        className="py-10 text-center text-gray-500"
      >
        Loading...
      </td>
    </tr>

  ) : positions.length === 0 ? (

    <tr>
      <td
        colSpan={4}
        className="py-10 text-center text-gray-500"
      >
        You haven't traded any markets yet.
      </td>
    </tr>

  ) : (

    positions.map((position, index) => (
  <tr
    key={index}
    className="border-b border-white/5"
  >
    {/* Market */}
    <td className="py-4">
      {position.market.question}
    </td>

    {/* My Bet */}
    <td
      className={`py-4 font-semibold ${
        position.side === "YES"
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      {position.side}
    </td>

    {/* Amount */}
    <td className="py-4">
      {position.amount} FLR
    </td>

    {/* Winning Side */}
    <td className="py-4">
      {!position.resolved ? (
        <span className="text-yellow-400">
          Pending
        </span>
      ) : position.market.yesWon ? (
        <span className="text-green-400 font-semibold">
          YES
        </span>
      ) : (
        <span className="text-red-400 font-semibold">
          NO
        </span>
      )}
    </td>
    <td className="py-4">
  {!position.resolved ? (
    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400">
      🟡 Active
    </span>
  ) : position.claimed ? (
    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-400">
      ✅ Reward Claimed
    </span>
  ) : position.won ? (
    <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
      🟢 Won
    </span>
  ) : (
    <span className="rounded-full bg-red-500/20 px-3 py-1 text-red-400">
      🔴 Lost
    </span>
  )}
</td>
  </tr>
))

  )}

</tbody>

            </table>

          </div>

        </div>

      </div>
    </main>
  );
}