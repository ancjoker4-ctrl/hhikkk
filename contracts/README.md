# Smart Contract Deployment Instructions

## Deploy via Remix

1. Go to https://remix.ethereum.org
2. Create new files and copy the contract code
3. Compile with Solidity version ^0.8.0

## Deployment Order

### Step 1: Deploy Registry
1. Deploy `Registry.sol` first
2. Copy the deployed Registry contract address

### Step 2: Deploy Token
1. Deploy `DisasterReliefToken.sol`
2. Pass the Registry contract address as constructor parameter
3. Copy the deployed Token contract address

## After Deployment

Update the contract addresses in the frontend:
- Open `src/config/contracts.ts`
- Replace `REGISTRY_ADDRESS` with your Registry contract address
- Replace `TOKEN_ADDRESS` with your Token contract address

## Test Network Recommendation

Use Sepolia testnet:
- Network: Sepolia
- Get test ETH: https://sepoliafaucet.com/

## Contract Addresses Storage

Save both addresses - you'll need them for the frontend configuration.
