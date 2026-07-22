"use client";

import { useMarkets } from "@/hooks/useMarkets";
import MarketCard from "./MarketCard";

type TrendingMarketsProps = {
  search: string;
};

export default function TrendingMarkets({
  search,
}: TrendingMarketsProps) {
const { markets, loading } = useMarkets();

  const filteredMarkets = markets.filter((market) =>
  (market.question || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-2">
        🔥 Trending Markets
      </h2>

      <p className="text-gray-400 mb-8">
        Live markets from Polymarket.
      </p>

      {loading ? (
        <p className="text-gray-400">Loading markets...</p>
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