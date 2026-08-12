"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ImportMarketProvider } from "@/context/ImportMarketContext";

import { config } from "@/lib/wagmi";

const queryClient = new QueryClient();

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
    <ImportMarketProvider>
      {children}
    </ImportMarketProvider>
  </QueryClientProvider>
</WagmiProvider>
  );
}