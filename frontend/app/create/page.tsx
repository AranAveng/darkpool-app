"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";

import Navbar from "@/components/layout/Navbar";
import { useWallet } from "@/hooks/useWallet";
import { getContract } from "@/lib/contract";
import { useImportMarket } from "@/context/ImportMarketContext";

export default function CreateMarketPage() {
  const router = useRouter();

  const { importedMarket, setImportedMarket } = useImportMarket();
  const { isConnected } = useWallet();

  const [question, setQuestion] = useState("");
  const [details, setDetails] = useState("");

  const [category, setCategory] = useState("Other");

  const [endDate, setEndDate] = useState("");
  const [initialLiquidity, setInitialLiquidity] = useState("");

  const [resolutionSource, setResolutionSource] = useState("");
  const [resolutionRule, setResolutionRule] = useState("");

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (!importedMarket) return;

    if (importedMarket.question) {
      setQuestion(importedMarket.question);
    }

    if (importedMarket.endDate) {
      setEndDate(importedMarket.endDate.slice(0, 16));
    }
  }, [importedMarket]);

  useEffect(() => {
    if (category === "Crypto") {
      setResolutionSource("CoinGecko API");
      setResolutionRule(
        "This market resolves automatically using CoinGecko price data when the market closes."
      );
    } else if (category === "Sports") {
      setResolutionSource("Official Sports API");
      setResolutionRule(
        "This market resolves automatically using the official match result."
      );
    } else {
      setResolutionSource("");
      setResolutionRule("");
    }
  }, [category]);

  const handleCreateMarket = async () => {
    try {
      if (!question.trim()) {
        alert("Please enter a market question.");
        return;
      }

      if (!details.trim()) {
        alert("Please enter market details.");
        return;
      }

      if (!endDate) {
        alert("Please select an end date.");
        return;
      }

      if (category !== "Crypto" && category !== "Sports") {
        if (!resolutionSource.trim()) {
          alert("Please provide a resolution source.");
          return;
        }

        if (!resolutionRule.trim()) {
          alert("Please provide a resolution rule.");
          return;
        }
      }

      if (!initialLiquidity || Number(initialLiquidity) < 10) {
  alert("Minimum liquidity is 10 FLR.");
  return;
}
      const contract = await getContract();

     const tx = await contract.createMarket(
  question.toLowerCase().replace(/\s+/g, "-"),
  question,
  details,
  category,
  ["YES", "NO"],
  Math.floor(new Date(endDate).getTime() / 1000),
  resolutionSource,
  resolutionRule,
  {
    value: ethers.parseEther(initialLiquidity),
  }
);

      await tx.wait();

      setImportedMarket(null);

      alert("Market created successfully!");

      router.push("/");
    } catch (error: any) {
      console.error(error);

      if (error?.shortMessage) {
        alert(error.shortMessage);
      } else if (error?.reason) {
        alert(error.reason);
      } else if (error?.message) {
        alert(error.message);
      } else {
        alert("Failed to create market.");
      }
    }
  };  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-2 text-4xl font-bold text-white">
          Create Prediction Market
        </h1>

        <p className="mb-8 text-gray-400">
          Launch a prediction market on Flare.
        </p>

        <div className="space-y-6 rounded-2xl border border-white/10 bg-[#111827] p-8">

          {/* Question */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Market Question
            </label>

            <input
              type="text"
              value={question}
 onChange={(e) => {
  const value = e.target.value;

  setQuestion(value);

  setDetails(
    `This prediction market asks whether "${value}" will happen before the market expires.\n\nVote YES if the event happens before the deadline.\nVote NO if it does not happen before the deadline.`
  );
}}
              placeholder="Will Bitcoin reach $200,000 before 2027?"
              className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white"
            />
          </div>

          {/* Details */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Details
            </label>

            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the market."
              className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-3 block text-sm text-gray-300">
              Category
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[
                "Crypto",
                "Sports",
                "Politics",
                "Finance",
                "Entertainment",
                "Other",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-xl border px-4 py-3 transition ${
                    category === item
                      ? "border-cyan-500 bg-cyan-500 text-black"
                      : "border-white/10 bg-[#0B1120] text-white hover:border-cyan-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {category === "Crypto" && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
              This market will resolve automatically using CoinGecko.
            </div>
          )}

          {category === "Sports" && (
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-300">
              This market will resolve automatically using official sports results.
            </div>
          )}

          {/* End Date */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              End Date
            </label>

            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white"
            />
          </div>
          <div>
  <label className="mb-2 block text-sm text-gray-300">
    Initial Liquidity (FLR)
  </label>

 <input
  type="number"
  min="10"
  step="1"
  value={initialLiquidity}
  onChange={(e) => setInitialLiquidity(e.target.value)}
  placeholder="10"
  className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white"
/>

<p className="mt-2 text-sm text-gray-400">
  Minimum initial liquidity: <span className="text-white font-medium">10 FLR</span>
</p>

  <p className="mt-2 text-xs text-gray-400">
    This amount will be split 50/50 between YES and NO when the market is created.
  </p>
</div>

          {category !== "Crypto" && category !== "Sports" && (
            <>
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Resolution Source
                </label>

                <input
                  value={resolutionSource}
                  onChange={(e) => setResolutionSource(e.target.value)}
                  placeholder="Official website or trusted source"
                  className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Resolution Rule
                </label>

                <textarea
                  rows={3}
                  value={resolutionRule}
                  onChange={(e) => setResolutionRule(e.target.value)}
                  placeholder="Explain exactly how this market will be resolved."
                  className="w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white"
                />
              </div>
            </>
          )}

          <button
            onClick={handleCreateMarket}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black hover:bg-cyan-400"
          >
            Create Market
          </button>

        </div>
      </section>
    </>
  );
}