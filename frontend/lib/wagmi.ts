import { createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { defineChain } from "viem";

export const flareCoston2 = defineChain({
  id: 114,
  name: "Flare Coston2",
  nativeCurrency: {
    name: "Coston2 Flare",
    symbol: "C2FLR",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://coston2-api.flare.network/ext/C/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "Flare Explorer",
      url: "https://coston2-explorer.flare.network",
    },
  },
  testnet: true,
});

export const config = createConfig({
  chains: [flareCoston2],
  connectors: [
    injected({
      shimDisconnect: true,
    }),

    walletConnect({
      projectId:
        process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
      showQrModal: true,
    }),
  ],
  transports: {
    [flareCoston2.id]: http(),
  },
});