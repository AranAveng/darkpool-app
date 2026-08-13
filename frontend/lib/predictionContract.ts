import { ethers } from "ethers";
import PredictionMarket from "./abi/PredictionMarket.json";

export const PREDICTION_CONTRACT_ADDRESS =
"0x4626d47a46dec10772f7187a7ae4eb08c155f44c";

export async function getPredictionContract() {
  const ethereum = (window as Window & { ethereum?: any }).ethereum;

  if (!ethereum) {
    throw new Error("Wallet not found");
  }

  const provider = new ethers.BrowserProvider(ethereum);

  await provider.send("eth_requestAccounts", []);

  const signer = await provider.getSigner();
console.log("WRITE CONTRACT:", PREDICTION_CONTRACT_ADDRESS);
  console.log("Prediction address:", PREDICTION_CONTRACT_ADDRESS);
return new ethers.Contract(
    PREDICTION_CONTRACT_ADDRESS,
    PredictionMarket.abi,
    signer
  );
}
export function getReadPredictionContract() {
  const provider = new ethers.JsonRpcProvider(
    "https://coston2-api.flare.network/ext/C/rpc"
  );

  return new ethers.Contract(
    PREDICTION_CONTRACT_ADDRESS,
    PredictionMarket.abi,
    provider
  );
}
export async function resolveYes(marketId: number) {
  const contract = await getPredictionContract();

  console.log("Contract:", contract.target);

  try {
    const tx = await contract.resolveMarket(marketId, true);

    console.log("TX:", tx.hash);

    const receipt = await tx.wait();

    console.log("Receipt:", receipt);
  } catch (err) {
    console.error("FULL ERROR:", err);
    throw err;
  }
}

export async function resolveNo(marketId: number) {
  const contract = await getPredictionContract();

  const tx = await contract.resolveMarket(
    marketId,
    false
  );

  await tx.wait();
}
export async function claimReward(marketId: number) {
  const contract = await getPredictionContract();

  const tx = await contract.claimReward(marketId);

  await tx.wait();
}
export async function withdrawLiquidity(marketId: number) {
  const contract = await getPredictionContract();

  const tx = await contract.withdrawLiquidity(marketId);

  return tx;
}
export async function withdrawCreatorFees(marketId: number) {
  const contract = await getPredictionContract();

  const tx = await contract.withdrawCreatorFees(marketId);

  return tx;
}