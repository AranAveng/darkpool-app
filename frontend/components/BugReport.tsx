"use client";

import { useState } from "react";

export default function BugReport() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!description.trim()) return;

    const subject = encodeURIComponent("DarkPool Bug Report");
    const body = encodeURIComponent(
      `Bug description:\n${description}\n\nPage: ${window.location.href}`
    );

    window.location.href = `mailto:aranaveng@gmail.com?subject=${subject}&body=${body}`;

    setDescription("");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500 bg-[#111827] text-xl shadow-xl transition hover:bg-[#1A2438]"
      >
        🐛
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-xl border border-white/10 bg-[#111827] p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-white">🐛 Bug Report</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-cyan-400"
            >
              ✕
            </button>
          </div>

          <label className="mb-1 block text-xs text-white">
            What happened? *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the bug..."
            rows={4}
            className="mb-4 w-full rounded-lg border border-white/10 bg-[#0B1120] p-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-500 focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-cyan-500 py-2 font-semibold text-black transition hover:bg-cyan-400"
          >
            Submit Report
          </button>
        </div>
      )}
    </>
  );
}