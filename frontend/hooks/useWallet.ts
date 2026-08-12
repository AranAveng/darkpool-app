"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";

export function useWallet() {
  const { address, isConnected } = useAccount();

  const {
    connectAsync,
    connectors,
    isPending,
    error,
  } = useConnect();

  const { disconnect } = useDisconnect();

  return {
    address,
    isConnected,
    connectAsync,
    connectors,
    disconnect,
    isPending,
    error,
  };
}