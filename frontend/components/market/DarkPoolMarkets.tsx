"use client";

import { useState } from "react";
import { useMarkets } from "@/hooks/useMarkets";
import MarketCard from "./MarketCard";

type Props = {
  search: string;
};

type Category = "active" | "ended" | "resolved";

export default function DarkPoolMarkets({
  search,
}: Props) {
  const { markets, loading } = useMarkets();
  const [category, setCategory] = useState<Category>("active");

  const now = Math.floor(Date.now() / 1000);

  const categorized = markets.filter((market) => {
    if (category === "active") {
      return !market.resolved && market.endTime > now;
    }
    if (category === "ended") {
      return !market.resolved && market.endTime <= now;
    }
    return market.resolved;
  });

  const filteredMarkets = categorized.filter((market) =>
    (market.question || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const tabs: { key: Category; label: string }[] = [
    { key: "active", label: "🟢 Active" },
    { key: "ended", label: "🟡 Ended (Not Resolved)" },
    { key: "resolved", label: "✅ Resolved" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-2">
        🔥 DarkPool Markets
      </h2>

      <p className="text-white mb-6">
        Prediction markets created on Flare.
      </p>

      <div className="mb-8 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCategory(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              category === tab.key
                ? "bg-cyan-500 text-black"
                : "border border-white/10 bg-[#111827] text-white hover:border-cyan-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-white">
          Loading markets...
        </p>
      ) : filteredMarkets.length === 0 ? (
        <p className="text-white">
          No markets in this category.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMarkets.map((market) => (
            <MarketCard
              key={`${market.id}-${market.question}`}
              market={market}
            />
          ))}
        </div>
      )}
    </section>
  );
}