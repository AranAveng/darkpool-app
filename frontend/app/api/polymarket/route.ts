import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://gamma-api.polymarket.com/markets",
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Polymarket markets");
    }

    const markets = await response.json();

    return NextResponse.json(markets);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to fetch markets",
      },
      {
        status: 500,
      }
    );
  }
}