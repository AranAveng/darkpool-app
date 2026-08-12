import Link from "next/link";
import { useRouter } from "next/navigation";
import { useImportMarket } from "@/context/ImportMarketContext";
type MarketCardProps = {
  market: any;
};

export default function MarketCard({ market }: MarketCardProps) {
  const router = useRouter();
  const { setImportedMarket } = useImportMarket();

const isDarkPoolMarket = market.creator !== undefined;
const now = Math.floor(Date.now() / 1000);

const isEnded =
  market.endTime &&
  Number(market.endTime) <= now;

const isResolved = market.resolved === true;
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
        <div className="flex">
  {isResolved ? (
  market.yesWon ? (
    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
      🟢 YES Won
    </span>
  ) : (
    <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
      🔴 NO Won
    </span>
  )
) : isEnded ? (
    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-300">
      🟡 Ended
    </span>
  ) : (
    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
      🟢 Active
    </span>
  )}
</div>

       <div className="flex justify-between text-sm text-gray-400">
  <span>Liquidity</span>
  <span>
    💧 {Number(market.liquidity || 0).toLocaleString()} FLR
  </span>
</div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Ends</span>
          <span>
  {market.endTime
    ? new Date(Number(market.endTime) * 1000).toLocaleDateString()
    : "-"}
</span>
        </div>

        <div className="rounded-lg bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-300">
          🔒 Trade Privately on DarkPool
        </div>

 {isDarkPoolMarket ? (
  <Link href={`/market/${market.id}`}>
    <button className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400">
      Trade
    </button>
  </Link>
) : (
 <button
  onClick={() => {
    setImportedMarket({
      question: market.question,
      description: market.description,
      category: market.category || "General",
      endDate: market.endDate,
      image: market.image,
      outcomes: ["YES", "NO"],
      source: "Polymarket",
    });

    router.push("/create");
  }}
  className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white hover:bg-purple-500"
>
  Import to DarkPool
</button>
)}

      </div>
    </div>
  );
}