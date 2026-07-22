import Link from "next/link";
type MarketCardProps = {
  market: any;
};

export default function MarketCard({ market }: MarketCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121826] transition hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10">

      <img
        src={market.image || market.icon || "https://placehold.co/600x400"}
        alt={market.question}
        className="h-48 w-full object-cover"
      />

      <div className="space-y-4 p-5">

        <h3 className="text-lg font-bold text-white">
          {market.question}
        </h3>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Liquidity</span>
          <span>
            $
            {Number(market.liquidity || 0).toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Ends</span>
          <span>{market.endDate?.slice(0, 10)}</span>
        </div>

        <div className="rounded-lg bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-300">
          🔒 Trade Privately on DarkPool
        </div>

       <Link href={`/market/${market.id}`}>
  <button className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400">
    Trade
  </button>
</Link>

      </div>
    </div>
  );
}