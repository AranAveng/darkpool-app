"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import Stats from "@/components/home/Stats";
import DarkPoolMarkets from "@/components/market/DarkPoolMarkets";
import TrendingMarkets from "@/components/market/TrendingMarkets";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-[#0B1120]">
      <Navbar />
      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <Stats />

      <DarkPoolMarkets
  search={search}
/>

<TrendingMarkets
  search={search}
/>
    </main>
  );
}