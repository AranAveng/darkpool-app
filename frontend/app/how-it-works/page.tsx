"use client";

import Navbar from "@/components/layout/Navbar";

const steps = [
  {
    title: "1. Connect Your Wallet",
    description:
      "Connect your Flare wallet to start using DarkPool and interact with prediction markets.",
  },
  {
    title: "2. Explore Markets",
    description:
      "Browse available prediction markets and check the question, liquidity, and closing time.",
  },
  {
    title: "3. Choose YES or NO",
    description:
      "Pick the outcome you believe will happen and enter the amount of FLR you want to stake.",
  },
  {
    title: "4. Create Your Own Market",
    description:
      "Create a prediction market by adding a question, details, resolution rules, and initial liquidity.",
  },
  {
    title: "5. Wait for Resolution",
    description:
      "Once the market ends, the final outcome is resolved as either YES or NO.",
  },
  {
    title: "6. Claim Your Reward",
    description:
      "If your prediction is correct, claim your reward from the resolved market.",
  },
  {
    title: "7. Withdraw Liquidity",
    description:
      "After resolution, the market creator can withdraw the remaining liquidity from the market.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b1120] px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold">
              How DarkPool Works
            </h1>

            <p className="mt-3 text-white">
              A simple guide to creating, trading, and resolving prediction markets.
            </p>
          </div>

          <div className="space-y-5">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-[#111827] p-6"
              >
                <h2 className="text-xl font-semibold text-cyan-400">
                  {step.title}
                </h2>

                <p className="mt-2 leading-7 text-white">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-6">
            <h2 className="text-lg font-semibold text-cyan-300">
              Trading Fee
            </h2>

            <p className="mt-2 text-white">
              DarkPool charges a 2% fee on trades. The fee is deducted from
              the amount entered before it is added to the prediction pool.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}