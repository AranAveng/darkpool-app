"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
 import { useToast } from "@/context/ToastContext";
import { ethers } from "ethers";

import Navbar from "@/components/layout/Navbar";
import { useWallet } from "@/hooks/useWallet";
import { getContract } from "@/lib/contract";
import { useImportMarket } from "@/context/ImportMarketContext";
import Toast from "@/components/Toast";
import { playSuccessSound, playErrorSound } from "@/lib/sounds";

export default function CreateMarketPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const { importedMarket, setImportedMarket } = useImportMarket();
  const { isConnected } = useWallet();

  const [question, setQuestion] = useState("");
  const [details, setDetails] = useState("");

  const [category, setCategory] = useState("Other");

  const [endDate, setEndDate] = useState("");
  const [initialLiquidity, setInitialLiquidity] = useState("");

  const [resolutionSource, setResolutionSource] = useState("");
  const [resolutionRule, setResolutionRule] = useState("");
  const [toastMessage, setToastMessage] = useState("");

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
  setToastMessage("Please enter a market question.");
  return;
}

    if (!details.trim()) {
  setToastMessage("Please enter market details.");
  return;
}

     if (!endDate) {
  setToastMessage("Please select an end date.");
  return;
}

      if (category !== "Crypto" && category !== "Sports") {
       if (!resolutionSource.trim()) {
  setToastMessage("Please provide a resolution source.");
  return;
}

        if (!resolutionRule.trim()) {
  setToastMessage("Please provide a resolution rule.");
  return;
}
      }

      if (!initialLiquidity || Number(initialLiquidity) < 10) {
  setToastMessage("Minimum liquidity is 10 FLR.");
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

      showToast("Market created successfully!"); playSuccessSound();

      router.push("/");
    } catch (error: any) {
      console.error(error);

      if (error?.shortMessage) {
        showToast(error.shortMessage);
      } else if (error?.reason) {
        showToast(error.reason);
      } else if (error?.message) {
        showToast(error.message);
      } else {
        showToast("Failed to create market."); playErrorSound();
      }
    }
  };  return (
    <>
      <Navbar />
      <Toast message={toastMessage} />

      <section className="min-h-screen bg-[#0B1120] px-6 py-12">
        <h1 className="mb-2 text-4xl font-bold text-white">
          Create Prediction Market
        </h1>

        <p className="mb-8 text-white">
          Launch a prediction market on Flare.
        </p>

        <div className="space-y-6 rounded-2xl border border-white/10 bg-[#111827] p-8">

          {/* Question */}
          <div>
            <label className="mb-2 block text-sm text-white">
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
            <label className="mb-2 block text-sm text-white">
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
            <label className="mb-3 block text-sm text-white">
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

          {/* End Date */}
          <div>
            <label className="mb-2 block text-sm text-white">
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
  <label className="mb-2 block text-sm text-white">
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

<p className="mt-2 text-sm text-white">
  Minimum initial liquidity: <span className="text-white font-medium">10 FLR</span>
</p>

  <p className="mt-2 text-xs text-white">
    This amount will be split 50/50 between YES and NO when the market is created.
  </p>
</div>

          
            <>
  <div>
    <label className="mb-2 block text-sm text-white">
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
    <label className="mb-2 block text-sm text-white">
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