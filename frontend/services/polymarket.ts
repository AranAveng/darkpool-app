export async function getTrendingMarkets() {
  const res = await fetch("/api/polymarket");

  if (!res.ok) {
    throw new Error("Failed to load markets");
  }

  const markets = await res.json();

  return markets.slice(0, 12);
}