export default function FAQ() {
  const faqs = [
    {
      question: "What is DarkPool?",
      answer:
        "DarkPool is a private prediction market built on Flare where users can predict real-world outcomes using FLR.",
    },
    {
      question: "How do I place a bet?",
      answer:
        "Connect your wallet, choose a market, select YES or NO, enter the amount of FLR you want to stake, and confirm the transaction.",
    },
    {
      question: "How do I create a prediction market?",
      answer:
        "Go to Create, add your question, details, resolution rules, end date, and initial liquidity, then create the market.",
    },
    {
      question: "What happens when a market ends?",
      answer:
        "Once the market reaches its end time, trading stops and the market can be resolved as either YES or NO.",
    },
    {
      question: "How do I claim my reward?",
      answer:
        "If your prediction matches the winning outcome, open the resolved market and claim your reward.",
    },
    {
      question: "What is the trading fee?",
      answer:
        "DarkPool charges a 2% fee on trades. The fee is deducted before the remaining amount is added to the market pool.",
    },
    {
      question: "Can I withdraw my market liquidity?",
      answer:
        "Yes. After a market is resolved, the creator can withdraw the remaining liquidity.",
    },
    {
      question: "What happens if I predict incorrectly?",
      answer:
        "A losing position does not receive a reward from the winning pool.",
    },
    {
      question: "Which network does DarkPool use?",
      answer:
        "DarkPool is built on the Flare network and uses FLR for market transactions.",
    },
    {
      question: "Why can't I trade on a market anymore?",
      answer:
        "Trading is closed when the market reaches its end time or has already been resolved.",
    },
  ];

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <p className="mt-3 text-white">
          Everything you need to know about DarkPool.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-white/10 bg-[#111827] p-5"
          >
            <summary className="cursor-pointer list-none font-semibold text-white">
              <div className="flex items-center justify-between gap-4">
                <span>{faq.question}</span>
                <span className="text-cyan-400 transition group-open:rotate-45">
                  +
                </span>
              </div>
            </summary>

            <p className="mt-4 leading-7 text-white">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}