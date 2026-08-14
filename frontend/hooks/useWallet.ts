"use client";

import { flareCoston2 } from "@/lib/wagmi";
import { playConnectSound } from "@/lib/sounds";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

export function useWallet() {
  const { address, isConnected } = useAccount();

  const {
    connectAsync,
    connectors,
    isPending,
    error,
  } = useConnect();
  const { switchChainAsync } = useSwitchChain();

  const { disconnect } = useDisconnect();

  const connectWallet = async (connector: any) => {
  try {
    await connectAsync({ connector });
    await switchChainAsync({ chainId: flareCoston2.id });
    playConnectSound();
  } catch (err) {
    console.error("Wallet connect/switch failed:", err);
  }
};

  return {
  address,
  isConnected,
  connectAsync,
  connectWallet,
  connectors,
  disconnect,
  isPending,
  error,
};
}