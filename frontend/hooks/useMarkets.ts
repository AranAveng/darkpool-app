"use client";

import { useEffect, useState } from "react";
import { getReadContract } from "@/lib/contract";
import { getReadPredictionContract } from "@/lib/predictionContract";
import { ethers } from "ethers";

export function useMarkets() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMarkets() {
      try {
        const contract = getReadContract();
        const prediction = getReadPredictionContract();

        const count = Number(await contract.nextMarketId());

        const data = [];

       for (let i = 0; i < count; i++) {
  const market = await contract.getMarket(i);

  const yesPool = await prediction.yesPool(i);
  const noPool = await prediction.noPool(i);
  const resolved = await prediction.resolved(i);
  const yesWon = await prediction.yesWon(i);
  console.log(
  "Market",
  i,
  "YES:",
  ethers.formatEther(yesPool),
  "NO:",
  ethers.formatEther(noPool)
);

  const liquidity = Number(
    ethers.formatEther(yesPool + noPool)
  );

 data.push({
  id: i,
  creator: market.creator,
  question: market.question,
  description: market.description,
  image: market.image,
  endTime: Number(market.endTime),
  liquidity,
  resolved,
  yesWon,
});
}

        setMarkets(data.reverse());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMarkets();
  }, []);

  return {
    markets,
    loading,
  };
}