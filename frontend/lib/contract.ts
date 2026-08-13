import { ethers } from "ethers";
import MarketRegistry from "./abi/MarketRegistry.json";

export const CONTRACT_ADDRESS =
"0xdd8ee6dbafdd899111c896d0e261c257db4c35c8";

export async function getContract() {
  const ethereum = (window as Window & { ethereum?: any }).ethereum;

  if (!ethereum) {
    throw new Error("Rabby or MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
   MarketRegistry.abi,
    signer
  );
}

export function getReadContract() {
  const provider = new ethers.JsonRpcProvider(
    "https://coston2-api.flare.network/ext/C/rpc"
  );

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    MarketRegistry.abi,
    provider
  );
}