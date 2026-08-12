import { network } from "hardhat";

async function main() {
  const { viem } = await network.connect();

  const marketRegistry =
    await viem.deployContract("MarketRegistry");

  console.log(
    "MarketRegistry:",
    marketRegistry.address
  );

  const predictionMarket =
    await viem.deployContract(
      "PredictionMarket",
      [marketRegistry.address]
    );

  console.log(
    "PredictionMarket:",
    predictionMarket.address
  );

  await marketRegistry.write.setPredictionMarket([
    predictionMarket.address,
  ]);

  console.log("Connected!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});