import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MarketRegistryModule = buildModule("MarketRegistryModule", (m) => {
  const marketRegistry = m.contract("MarketRegistry");

  return { marketRegistry };
});

export default MarketRegistryModule;