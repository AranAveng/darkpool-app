import { ethers } from "ethers";
import DarkPoolMarket from "./abi/DarkPoolMarket.json";

export const CONTRACT_ADDRESS =
  "0xfcC7294822CF1Bd3B144c0A8cAddD1914c9E0576";

export async function getContract() {
 const ethereum = (window as Window & { ethereum?: any }).ethereum;

if (!ethereum) {
  throw new Error("MetaMask not installed");
}

const provider = new ethers.BrowserProvider(ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    DarkPoolMarket.abi,
    signer
  );
}