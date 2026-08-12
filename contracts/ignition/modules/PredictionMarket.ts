import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PredictionMarketModule = buildModule(
  "PredictionMarketModule",
  (m) => {
    // Replace with your deployed MarketRegistry address
    const registryAddress =
      "0x7D171e928ff25AF6e28a87E49BcfEE99Ea4605D2";

    const predictionMarket = m.contract(
      "PredictionMarket",
      [registryAddress]
    );

    return { predictionMarket };
  }
);

export default PredictionMarketModule;