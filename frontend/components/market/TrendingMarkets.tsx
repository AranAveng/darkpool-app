"use client";

import { useEffect, useState } from "react";
import { getTrendingMarkets } from "@/services/polymarket";
import MarketCard from "./MarketCard";

type TrendingMarketsProps = {
  search: string;
};

export default function TrendingMarkets({
  search,
}: TrendingMarketsProps) {
  const [markets, setMarkets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMarkets() {
      try {
        const data = await getTrendingMarkets();
        setMarkets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMarkets();
  }, []);

  const filteredMarkets = markets.filter((market) =>
    (market.question || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-2">
        🌍 Trending on Polymarket
      </h2>

      <p className="text-white mb-8">
        Discover popular prediction markets and import them into DarkPool.
      </p>

      {loading ? (
        <p className="text-white">
          Loading markets...
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMarkets.map((market) => (
            <MarketCard
              key={market.id}
              market={market}
            />
          ))}
        </div>
      )}
    </section>
  );
}