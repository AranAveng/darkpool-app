"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useWallet } from "@/hooks/useWallet";
import { getReadContract } from "@/lib/contract";
import {
  getPredictionContract,
  getReadPredictionContract,
  resolveYes,
  resolveNo,
  claimReward,
  withdrawLiquidity,
  withdrawCreatorFees,
} from "@/lib/predictionContract";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function MarketPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const { address } = useWallet();

  const [market, setMarket] = useState<any>(null);
  const [resolved, setResolved] = useState(false);
  const [canClaim, setCanClaim] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedSide, setSelectedSide] = useState<"YES" | "NO">("YES");

  const [yesPool, setYesPool] = useState("0");
  const [noPool, setNoPool] = useState("0");

  const [yesShares, setYesShares] = useState("0");
  const [noShares, setNoShares] = useState("0");
  const [marketResolved, setMarketResolved] = useState(false);
const [winner, setWinner] = useState<boolean | null>(null);
const [rewardClaimed, setRewardClaimed] = useState(false);
const [liquidityWithdrawn, setLiquidityWithdrawn] = useState(false);

  const loadMarket = async () => {
    try {
      const contract = getReadContract();

      const data = await contract.getMarket(id);
      console.log(data);
      console.log("Creator:", data.creator);
console.log("End Time:", Number(data.endTime));
console.log("Current Time:", Math.floor(Date.now() / 1000));
console.log("Connected Wallet:", address);

      setMarket(data);
      const prediction = getReadPredictionContract();

setResolved(
  await prediction.resolved(Number(id))
);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  loadMarket();
}, [id, address]);

  const loadPools = async () => {
    try {
      const contract = getReadPredictionContract();

      const yes = await contract.yesPool(id);
      const no = await contract.noPool(id);
      
      const resolved = await contract.resolved(id);
const yesWon = await contract.yesWon(id);

setMarketResolved(resolved);
setWinner(resolved ? yesWon : null);
if (address) {
  const claimed = await contract.claimed(id, address);
  setRewardClaimed(claimed);
}

const withdrawn = await contract.liquidityWithdrawn(id);
setLiquidityWithdrawn(withdrawn);
      setYesPool(ethers.formatEther(yes));
      setNoPool(ethers.formatEther(no));

      if (address) {
        const myYes = await contract.yesShares(id, address);
        const myNo = await contract.noShares(id, address);

        setYesShares(ethers.formatEther(myYes));
        setNoShares(ethers.formatEther(myNo));
        const isResolved = await contract.resolved(id);

if (!isResolved || !address) {
  setCanClaim(false);
} else {
  const yesWon = await contract.yesWon(id);

  const myWinningShares = yesWon
    ? await contract.yesShares(id, address)
    : await contract.noShares(id, address);

  const alreadyClaimed = await contract.claimed(id, address);

  setCanClaim(
    myWinningShares > BigInt(0) && !alreadyClaimed
  );
}
        }
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPools();
  }, [id, address]);

  const handleBuyYes = async () => {
    try {
      const contract = await getPredictionContract();

      const tx = await contract.buyYes(id, {
        value: ethers.parseEther(amount),
      });

      await tx.wait();

      await loadPools();
      await loadMarket();

      alert("YES shares purchased!");
    } catch (err: any) {
  console.error(err);

  const message =
    err?.reason ||
    err?.shortMessage ||
    err?.message ||
    "Transaction failed.";

  alert(message);
}
  };

  const handleBuyNo = async () => {
    try {
      const contract = await getPredictionContract();

      const tx = await contract.buyNo(id, {
        value: ethers.parseEther(amount),
      });

      await tx.wait();

      await loadPools();
      await loadMarket();

      alert("NO shares purchased!");
    } catch (err: any) {
  console.error(err);

  const message =
    err?.reason ||
    err?.shortMessage ||
    err?.message ||
    "Transaction failed.";

  alert(message);
}
  };

  const handleResolveYes = async () => {
  try {
    const market = await getReadContract().getMarket(Number(id));

    console.log("Market Object:", market);
    const prediction = getReadPredictionContract();

console.log(
  "Resolved flag:",
  await prediction.resolved(Number(id))
);

   
      await resolveYes(Number(id));

      await loadPools();
      await loadMarket();

      alert("Market resolved as YES!");
    } catch (err) {
  console.error("Resolve Error:", err);
  alert("Failed to resolve market.");
}
  };

  const handleResolveNo = async () => {
    try {
      await resolveNo(Number(id));

      await loadPools();
      await loadMarket();

      alert("Market resolved as NO!");
    } catch (err) {
      console.error(err);
      alert("Failed to resolve market.");
    }
  };
  const handleClaimReward = async () => {
  try {
    const prediction = getReadPredictionContract();

    console.log(
      "Resolved:",
      await prediction.resolved(Number(id))
    );

    console.log(
      "Yes Won:",
      await prediction.yesWon(Number(id))
    );

    console.log(
      "Claimed:",
      await prediction.claimed(Number(id), address)
    );

    console.log(
      "Your YES Shares:",
      (await prediction.yesShares(Number(id), address)).toString()
    );

    console.log(
      "Your NO Shares:",
      (await prediction.noShares(Number(id), address)).toString()
    );

    await claimReward(Number(id));
    setRewardClaimed(true);

    await loadPools();
    await loadMarket();

    alert("Reward claimed successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to claim reward.");
  }
};
const handleWithdrawLiquidity = async () => {
  try {
    const tx = await withdrawLiquidity(Number(id));

    await tx.wait();

    setLiquidityWithdrawn(true);

    alert("Liquidity withdrawn successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to withdraw liquidity.");
  }
};
const handleWithdrawCreatorFees = async () => {
  try {
    if (!marketResolved) {
      alert("Creator fee cannot be withdrawn because the market is not resolved yet.");
      return;
    }

    if (!isCreator) {
      alert("Only the market creator can withdraw this fee.");
      return;
    }

    const tx = await withdrawCreatorFees(Number(id));

    await tx.wait();

    alert("Creator fee withdrawn successfully!");
  } catch (err) {
    console.error("Creator fee withdrawal error:", err);

    alert(
      "Creator fee withdrawal failed. This usually means no creator fee is available for this market, or the contract state does not allow the withdrawal yet."
    );
  }
};
  const totalPool = Number(yesPool) + Number(noPool);

  const yesProbability =
    totalPool === 0 ? 50 : (Number(yesPool) / totalPool) * 100;

  const noProbability =
    totalPool === 0 ? 50 : (Number(noPool) / totalPool) * 100;
   const buyAmount = Number(amount || 0);

const yesPayout =
  buyAmount > 0
    ? (
        (buyAmount / (Number(yesPool) + buyAmount)) *
        (totalPool + buyAmount)
      ).toFixed(2)
    : "0";

const noPayout =
  buyAmount > 0
    ? (
        (buyAmount / (Number(noPool) + buyAmount)) *
        (totalPool + buyAmount)
      ).toFixed(2)
    : "0";

const yesProfit = (Number(yesPayout) - buyAmount).toFixed(2);
const noProfit = (Number(noPayout) - buyAmount).toFixed(2);
    const marketEnded =
  market &&
  Number(market.endTime) <
    Math.floor(Date.now() / 1000);

const tradingDisabled =
  marketEnded || resolved;
  const isCreator =
  market &&
  address &&
  market.creator.toLowerCase() === address.toLowerCase();

  return (
    <main className="min-h-screen bg-[#0B1120] text-white"onClick={() => router.push("/")}>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-4 text-4xl font-bold">
          Market #{id}
        </h1>

        <div className="rounded-2xl border border-white/10 bg-[#121826] p-8"onClick={(e) => e.stopPropagation()}>
          
<h2 className="mb-3 text-2xl font-bold">
            {market?.question || "Loading market..."}
          </h2>

          <p className="mb-8 text-gray-400">
            {market?.description || "No description available."}
          </p>
          {marketResolved && (
  <div className="mb-6 rounded-xl border border-green-500 bg-green-500/10 p-4">
    <p className="font-bold text-green-400">
      ✅ Market Resolved
    </p>

    <p className="mt-1 text-sm text-gray-300">
      Winning Outcome: {winner ? "YES" : "NO"}
    </p>
  </div>
)}

          {/* Pool Stats */}
          <div className="mb-6 rounded-xl border border-white/10 bg-[#0B1120] p-4">
            <div className="flex justify-between">
              <span className="text-gray-400">YES Pool</span>
              <span className="font-semibold text-green-400">
                {yesPool} FLR
              </span>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="text-gray-400">NO Pool</span>
              <span className="font-semibold text-red-400">
                {noPool} FLR
              </span>
            </div>
          </div>

          {/* Your Shares */}
          <div className="mb-6 rounded-xl border border-white/10 bg-[#0B1120] p-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Your YES Shares</span>
              <span className="font-semibold text-green-400">
                {yesShares} FLR
              </span>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="text-gray-400">Your NO Shares</span>
              <span className="font-semibold text-red-400">
                {noShares} FLR
              </span>
            </div>
          </div> 
                    {/* Market Probability */}
          <div className="mb-6 rounded-xl border border-white/10 bg-[#0B1120] p-4">
            <div className="flex justify-between">
              <span className="text-gray-400">YES Probability</span>

              <span className="font-bold text-green-400">
                {yesProbability.toFixed(1)}%
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-700">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{
                  width: `${yesProbability}%`,
                }}
              />
            </div>

            <div className="mt-5 flex justify-between">
              <span className="text-gray-400">NO Probability</span>

              <span className="font-bold text-red-400">
                {noProbability.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-6">
            <label className="mb-2 block text-sm text-gray-300">
              Amount (FLR)
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10"
              className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
            <div className="mt-4 rounded-xl border border-white/10 bg-[#0B1120] p-4">
  <h3 className="text-lg font-semibold text-white">
  Your Bet ({buyAmount.toFixed(2)} FLR)
</h3>

  <div className="mt-4 grid grid-cols-2 gap-4">

  {/* YES */}
  <div className="rounded-xl border border-green-500/20 bg-[#111827] p-4">
    <h3 className="mb-4 text-center text-lg font-bold text-green-400">
      🟢 BUY YES
    </h3>

    <div className="space-y-3 text-sm">

      <div className="flex justify-between">
        <span className="text-gray-400">
          Estimated Return
        </span>

        <span className="font-bold text-green-400">
          {yesPayout} FLR
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">
          Net Profit
        </span>

        <span className="font-bold text-green-400">
          +{yesProfit} FLR
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">
          Maximum Loss
        </span>

        <span className="font-bold text-red-400">
          -{buyAmount.toFixed(2)} FLR
        </span>
      </div>

    </div>
  </div>

  {/* NO */}
  <div className="rounded-xl border border-red-500/20 bg-[#111827] p-4">
    <h3 className="mb-4 text-center text-lg font-bold text-red-400">
      🔴 BUY NO
    </h3>

    <div className="space-y-3 text-sm">

      <div className="flex justify-between">
        <span className="text-gray-400">
          Estimated Return
        </span>

        <span className="font-bold text-green-400">
    {noPayout} FLR
</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">
          Net Profit
        </span>

        <span className="font-bold text-green-400">
          +{noProfit} FLR
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">
          Maximum Loss
        </span>

        <span className="font-bold text-red-400">
          -{buyAmount.toFixed(2)} FLR
        </span>
      </div>

    </div>
  </div>

</div>
</div>
          </div>

          {/* Buy Buttons */}
          <div className="grid grid-cols-2 gap-4">
           <button
 onClick={() => {
  setSelectedSide("YES");
  handleBuyYes();
}}
  disabled={tradingDisabled}
  className={`rounded-xl py-4 font-bold transition ${
    tradingDisabled
      ? "cursor-not-allowed bg-gray-600 text-gray-300"
      : "bg-green-500 text-black hover:bg-green-400"
  }`}
>
  Buy YES
</button>

           <button
 onClick={() => {
  setSelectedSide("NO");
  handleBuyNo();
}}
  disabled={tradingDisabled}
  className={`rounded-xl py-4 font-bold transition ${
    tradingDisabled
      ? "cursor-not-allowed bg-gray-600 text-gray-300"
      : "bg-red-500 text-white hover:bg-red-400"
  }`}
>
  Buy NO
</button>
          </div>

          {/* Resolve Buttons */}
          {isCreator && !resolved && (
  <div className="mt-8 grid grid-cols-2 gap-4">
    <button
      onClick={handleResolveYes}
      className="rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-500"
    >
      Resolve YES
    </button>

    <button
      onClick={handleResolveNo}
      className="rounded-xl bg-purple-600 py-3 font-bold text-white transition hover:bg-purple-500"
    >
      Resolve NO
    </button>
  </div>
)}
  

         {marketResolved && (
  <div className="mt-6">
    {rewardClaimed ? (
      <div className="w-full rounded-xl border border-yellow-500 bg-yellow-900/30 py-3 text-center font-bold text-yellow-400">
        ✅ Reward Claimed
      </div>
    ) : (
      canClaim && (
        <button
          onClick={handleClaimReward}
          className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-black hover:bg-yellow-400"
        >
          Claim Reward
        </button>
      )
    )}
  </div>
)}
{marketResolved && (
  <div className="mt-4 space-y-3">
    {liquidityWithdrawn ? (
      <div className="w-full rounded-xl border border-green-500 bg-green-900/30 py-3 text-center font-bold text-green-400">
        ✅ Liquidity Withdrawn
      </div>
    ) : (
      <button
        onClick={handleWithdrawLiquidity}
        className="w-full rounded-xl bg-green-600 py-3 font-bold text-white hover:bg-green-500"
      >
        Withdraw Liquidity
      </button>
    )}

  </div>
)}

        </div>
      </div>
    </main>
  );
}