"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";

import DarkPoolMarkets from "@/components/market/DarkPoolMarkets";
import TrendingMarkets from "@/components/market/TrendingMarkets";
import FAQ from "@/components/home/FAQ";

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

     

      <DarkPoolMarkets
  search={search}
/>

<TrendingMarkets
  search={search}
/>
 <FAQ />
    </main>
  );
}