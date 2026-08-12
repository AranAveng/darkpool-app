// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MarketRegistry.sol";

contract PredictionMarketV2 {

    MarketRegistry public registry;
  struct MarketPool {
    uint256 yesPool;
    uint256 noPool;

    uint256 totalLiquidity;
    uint256 totalLPShares;

    uint256 totalYesTokens;
    uint256 totalNoTokens;

    // Trading fee (100 = 1%)
    uint256 feeRate;

    bool resolved;
    bool yesWon;
}
mapping(uint256 => MarketPool) public markets;

// LP ownership
mapping(uint256 => mapping(address => uint256)) public lpShares;

// Trader positions
mapping(uint256 => mapping(address => uint256)) public yesTokens;
mapping(uint256 => mapping(address => uint256)) public noTokens;

// Claim tracking
mapping(uint256 => mapping(address => bool)) public claimed;

    constructor(address registryAddress) {
        registry = MarketRegistry(registryAddress);
    }
    function getPrice(
    uint256 marketId
)
    public
    view
    returns (
        uint256 yesPrice,
        uint256 noPrice
    )
{
    MarketPool storage pool = markets[marketId];

    uint256 total =
        pool.yesPool + pool.noPool;

    // No liquidity yet
    if (total == 0) {
        return (50, 50);
    }

    yesPrice =
        (pool.yesPool * 100) / total;

    noPrice =
        (pool.noPool * 100) / total;
}
    function addLiquidity(uint256 marketId) external payable {
    require(msg.value > 0, "No liquidity");

    MarketRegistry.Market memory market =
        registry.getMarket(marketId);

    require(
        block.timestamp < market.endTime,
        "Market has ended"
    );

    MarketPool storage pool = markets[marketId];

    uint256 liquidity = msg.value;

    // Split liquidity equally
    uint256 half = liquidity / 2;

    pool.yesPool += half;
    pool.noPool += (liquidity - half);

    pool.totalLiquidity += liquidity;

    uint256 shares;

    if (pool.totalLPShares == 0) {
        shares = liquidity;
    } else {
        shares =
            (liquidity * pool.totalLPShares) /
            (pool.totalLiquidity - liquidity);
    }

    lpShares[marketId][msg.sender] += shares;
    pool.totalLPShares += shares;
}

}