// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MarketRegistry.sol";

contract PredictionMarket {

    MarketRegistry public registry;
     uint256 public constant FEE_BPS = 200; // 2%
    uint256 public constant BPS = 10000;

    mapping(uint256 => uint256) public yesPool;

mapping(uint256 => uint256) public noPool;
mapping(uint256 => uint256) public creatorLiquidity;
mapping(uint256 => bool) public liquidityWithdrawn;

mapping(uint256 => uint256) public creatorFees;

mapping(uint256 => mapping(address => uint256))
    public yesShares;
    mapping(uint256 => bool) public resolved;

mapping(uint256 => bool) public yesWon;


mapping(uint256 => mapping(address => bool))
    public claimed;

mapping(uint256 => mapping(address => uint256))
    public noShares;
    event SharesPurchased(
    uint256 indexed marketId,
    address indexed buyer,
    bool isYes,
    uint256 amount
);

    constructor(address registryAddress) {
        registry = MarketRegistry(registryAddress);
    }
    
function seedLiquidity(uint256 marketId) external payable {
    require(msg.value > 0, "No liquidity");

    uint256 half = msg.value / 2;

    yesPool[marketId] += half;
    noPool[marketId] += msg.value - half;

    creatorLiquidity[marketId] = msg.value;
}
  function buyYes(uint256 marketId) public payable {
    require(msg.value > 0, "Send some FLR");

    MarketRegistry.Market memory market =
        registry.getMarket(marketId);

    require(
        block.timestamp < market.endTime,
        "Market has ended"
    );

    require(
        !resolved[marketId],
        "Market already resolved"
    );
    

    uint256 fee = (msg.value * FEE_BPS) / BPS;
    uint256 amount = msg.value - fee;

    creatorFees[marketId] += fee;

    yesPool[marketId] += amount;
    yesShares[marketId][msg.sender] += amount;

    emit SharesPurchased(
        marketId,
        msg.sender,
        true,
        amount
    );
}
function buyNo(uint256 marketId) public payable {
    require(msg.value > 0, "Send some FLR");

    MarketRegistry.Market memory market =
        registry.getMarket(marketId);

    require(
        block.timestamp < market.endTime,
        "Market has ended"
    );

    require(
        !resolved[marketId],
        "Market already resolved"
    );
   

    uint256 fee = (msg.value * FEE_BPS) / BPS;
    uint256 amount = msg.value - fee;

    creatorFees[marketId] += fee;

    noPool[marketId] += amount;
    noShares[marketId][msg.sender] += amount;

    emit SharesPurchased(
        marketId,
        msg.sender,
        false,
        amount
    );
}
function resolveMarket(
    uint256 marketId,
    bool outcomeYes
) public {
    require(!resolved[marketId], "Market already resolved");

    MarketRegistry.Market memory market =
        registry.getMarket(marketId);

    require(
        msg.sender == market.creator,
        "Only market creator can resolve"
    );

    require(
        block.timestamp >= market.endTime,
        "Market has not ended"
    );

   resolved[marketId] = true;
yesWon[marketId] = outcomeYes;

registry.decreaseActiveMarket(market.creator);
registry.markResolved(marketId);
    }
function claimReward(uint256 marketId) public {
    require(resolved[marketId], "Market not resolved");

    require(!claimed[marketId][msg.sender], "Already claimed");

    uint256 winnerPool;
    uint256 loserPool;
    uint256 userShares;

    if (yesWon[marketId]) {
        winnerPool = yesPool[marketId];
        loserPool = noPool[marketId];
        userShares = yesShares[marketId][msg.sender];
    } else {
        winnerPool = noPool[marketId];
        loserPool = yesPool[marketId];
        userShares = noShares[marketId][msg.sender];
    }

    require(userShares > 0, "No winning shares");

    uint256 reward =
        userShares +
        (loserPool * userShares) / winnerPool;

    claimed[marketId][msg.sender] = true;

    payable(msg.sender).transfer(reward);
}
function withdrawLiquidity(uint256 marketId) public {
    require(resolved[marketId], "Market not resolved");

    MarketRegistry.Market memory market =
        registry.getMarket(marketId);

    require(market.creator != address(0), "Creator is zero");
    require(msg.sender == market.creator, "Not creator");
    require(!liquidityWithdrawn[marketId], "Already withdrawn");
    require(creatorLiquidity[marketId] > 0, "No creator liquidity");
   uint256 amountToWithdraw = creatorLiquidity[marketId];

if (amountToWithdraw > address(this).balance) {
    amountToWithdraw = address(this).balance;
}

    liquidityWithdrawn[marketId] = true;

  payable(msg.sender).transfer(amountToWithdraw);
}
}