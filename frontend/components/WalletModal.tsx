"use client";

import { useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";

type WalletModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function WalletModal({
  open,
  onClose,
}: WalletModalProps) {
  const { connectors, connectAsync, isPending } = useWallet();
  useEffect(() => {
  if (!open) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [open, onClose]);

  if (!open) return null;

  const walletName = (name: string) => {
    if (name === "Injected") return "MetaMask";
    if (name.includes("Rabby")) return "Rabby";
    if (name.includes("WalletConnect")) return "WalletConnect";
    return name;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1120] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Connect Wallet
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              disabled={isPending}
              onClick={async () => {
                try {
                  await connectAsync({ connector });
                  onClose();
                } catch (error) {
                  console.error(error);
                }
              }}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#111827] px-4 py-4 text-left text-white transition hover:border-cyan-500 hover:bg-[#1A2438]"
            >
              <span>{walletName(connector.name)}</span>

              <span className="text-gray-400">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}