"use client";

import { useEffect, useState } from "react";
import { getReadPredictionContract } from "@/lib/predictionContract";
import { useWallet } from "@/hooks/useWallet";
import { useMarkets } from "@/hooks/useMarkets";
import { ethers } from "ethers";

export function usePortfolio() {
  const { address } = useWallet();
  const { markets } = useMarkets();

  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPositions() {
      if (!address || markets.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const contract = getReadPredictionContract();

        const userPositions = [];

        for (let i = 0; i < markets.length; i++) {

          const yes = await contract.yesShares(i, address);
          const no = await contract.noShares(i, address);

          const resolved = await contract.resolved(i);
const yesWon = resolved
  ? await contract.yesWon(i)
  : false;

const claimed = resolved
  ? await contract.claimed(i, address)
  : false;

          if (Number(yes) > 0) {
            userPositions.push({
  market: markets[i],
  side: "YES",
  amount: ethers.formatEther(yes),
  resolved,
  won: resolved ? yesWon : null,
  claimed,
});
          }

          if (Number(no) > 0) {
           userPositions.push({
  market: markets[i],
  side: "NO",
  amount: ethers.formatEther(no),
  resolved,
  won: resolved ? !yesWon : null,
  claimed,
});
          }
        }

        setPositions(userPositions);

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadPositions();

  }, [address, markets]);

  return {
    positions,
    loading
  };
}