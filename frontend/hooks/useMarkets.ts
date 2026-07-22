"use client";

import { useEffect, useState } from "react";
import { getTrendingMarkets } from "@/services/polymarket";

export function useMarkets() {
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

  return { markets, loading };
}