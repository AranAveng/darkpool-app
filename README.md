# DarkPool

> Private prediction markets built on Flare.

DarkPool is a decentralized prediction market platform built on the Flare Coston2 testnet.

It allows users to create prediction markets, trade on YES or NO outcomes, provide liquidity, resolve markets, and claim rewards after resolution.

## Features

- Create prediction markets
- Trade YES and NO positions
- Provide and withdraw liquidity
- Resolve markets
- Claim rewards
- Search and explore markets
- Trending markets
- Wallet integration
- Creator fee system
- Flare Coston2 testnet support
- Coston2 Explorer and Faucet links
- FAQ and How It Works sections

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Solidity
- Hardhat
- Ethers.js / Viem
- Flare Coston2

## Architecture

DarkPool is split into two main parts.

### Frontend

The frontend is built with Next.js, React, TypeScript, and Tailwind CSS.

It provides the user interface for:

- Browsing markets
- Creating markets
- Trading positions
- Managing liquidity
- Claiming rewards
- Connecting wallets

### Smart Contracts

The smart contract layer is built with Solidity and Hardhat.

The main contracts are:

- `MarketRegistry.sol`
- `PredictionMarket.sol`

`MarketRegistry` manages market information and market status.

`PredictionMarket` handles liquidity, YES and NO positions, market resolution, rewards, and fee accounting.

## Project Structure

```text
darkpool-app/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── ...
│
├── contracts/
│   ├── contracts/
│   │   ├── MarketRegistry.sol
│   │   └── PredictionMarket.sol
│   ├── scripts/
│   ├── test/
│   └── hardhat.config.ts
│
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AranAveng/darkpool-app.git
cd darkpool-app
```

### 2. Frontend Setup

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will normally run at:

```text
http://localhost:3000
```

### 3. Smart Contract Setup

Open a separate terminal and go to the contracts directory:

```bash
cd contracts
```

Install dependencies:

```bash
npm install
```

Create the required environment variables for the Coston2 network.

Example:

```env
COSTON2_RPC_URL=your_rpc_url
PRIVATE_KEY=your_wallet_private_key
```

Compile the contracts:

```bash
npx hardhat compile
```

Deploy to Flare Coston2:

```bash
npx hardhat run scripts/deploy.ts --network coston2
```

## Network

DarkPool currently runs on the Flare Coston2 testnet.

### Network Details

```text
Network: Flare Coston2
Chain ID: 114
Native Token: C2FLR
```

Use the website links to access the Coston2 Explorer and Faucet.

## Smart Contract Deployment

The current Coston2 deployment uses:

### MarketRegistry

```text
0xdd8ee6dbafdd899111c896d0e261c257db4c35c8
```

### PredictionMarket

```text
0x4626d47a46dec10772f7187a7ae4eb08c155f44c
```

## Basic Usage

1. Connect your wallet
2. Browse available prediction markets
3. Select a market
4. Choose YES or NO
5. Enter the amount of FLR
6. Confirm the transaction
7. Wait for the market to end
8. The market creator resolves the market
9. Winning positions can claim rewards

Creators can also provide liquidity when creating a market.

## Trading Fees

DarkPool uses a 2% total trading fee.

The current fee split is:

```text
2% total
├── 1% market creator
└── 1% DarkPool treasury
```

The treasury wallet is:

```text
0xa1A6d000859955f62C8fDbFB101f70a00F3cc856
```

## Configuration

The frontend uses the deployed contract addresses from the project configuration.

When deploying new contracts, update the frontend contract address configuration so the application points to the correct deployment.

Do not commit private keys, RPC secrets, or other sensitive values to the repository.

## Development

This project is actively developed as a Flare Coston2 testnet application.

Before making changes:

- Keep frontend and contract addresses in sync
- Test smart contract changes locally before deployment
- Verify Coston2 transactions after deployment
- Avoid committing secrets or environment files

## Deployment

The frontend can be deployed to Vercel.

The smart contracts are deployed to Flare Coston2.

## Status

DarkPool is currently a testnet project.

It is intended for development, testing, and experimentation on Flare Coston2.

## License

This project is licensed under the MIT License.
