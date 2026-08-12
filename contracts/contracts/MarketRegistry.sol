// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "./PredictionMarket.sol";

contract MarketRegistry {

    PredictionMarket public predictionMarket;
    address public admin;

    uint256 public constant MIN_INITIAL_LIQUIDITY = 10 ether;
 constructor() {
    admin = msg.sender;
}
function setPredictionMarket(address predictionMarketAddress) external {
    require(msg.sender == admin, "Only admin");
    predictionMarket = PredictionMarket(predictionMarketAddress);
}
    enum MarketStatus {
        Open,
        Closed,
        Resolving,
        Resolved,
        Cancelled
    }

    struct Market {
        uint256 id;

        address creator;

        string slug;

        string question;

        string description;

        string category;

        string[] outcomes;

        uint256 endTime;

        string resolutionSource;

        string resolutionRule;

        uint256 createdAt;

        MarketStatus status;
    }
   uint256 public nextMarketId;

mapping(uint256 => Market) public markets;

mapping(string => bool) public slugExists;

mapping(address => uint256) public activeMarkets;

event MarketCreated(
    uint256 indexed marketId,
    address indexed creator,
    string slug
);
function createMarket(
    string memory slug,
    string memory question,
    string memory description,
    string memory category,
    string[] memory outcomes,
    uint256 endTime,
    string memory resolutionSource,
    string memory resolutionRule
) public payable {
    require(
    msg.value >= MIN_INITIAL_LIQUIDITY,
    "Minimum initial liquidity is 100 FLR"
);

if (msg.sender != admin) {
    require(
        activeMarkets[msg.sender] < 3,
        "Maximum 3 unresolved markets allowed. Resolve an existing market first."
    );
}
    require(bytes(slug).length > 0, "Slug is required");

require(bytes(question).length > 0, "Question is required");

require(outcomes.length >= 2, "At least two outcomes required");

require(endTime > block.timestamp, "End time must be in the future");

require(!slugExists[slug], "Slug already exists");

uint256 marketId = nextMarketId;

markets[marketId] = Market({
    id: marketId,
    creator: msg.sender,
    slug: slug,
    question: question,
    description: description,
    category: category,
    outcomes: outcomes,
    endTime: endTime,
    resolutionSource: resolutionSource,
    resolutionRule: resolutionRule,
    createdAt: block.timestamp,
    status: MarketStatus.Open
});

slugExists[slug] = true;

nextMarketId++;

activeMarkets[msg.sender]++;

if (msg.value > 0) {
    predictionMarket.seedLiquidity{value: msg.value}(marketId);
}

emit MarketCreated(
    marketId,
    msg.sender,
    slug
);


}
function getMarket(
    uint256 marketId
) public view returns (Market memory) {
    return markets[marketId];
}
function decreaseActiveMarket(address creator) external {
    require(
        msg.sender == address(predictionMarket),
        "Only PredictionMarket"
    );

    if (activeMarkets[creator] > 0) {
        activeMarkets[creator]--;
    }
}
function markResolved(uint256 marketId) external {
    require(
        msg.sender == address(predictionMarket),
        "Only PredictionMarket"
    );

    markets[marketId].status = MarketStatus.Resolved;
}

}