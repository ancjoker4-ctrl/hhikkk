# Disaster Relief Stablecoin - Minimal Demo

A blockchain-based disaster relief token system with on-chain enforcement of spending rules. Built with React, TypeScript, Solidity, and MetaMask.

## Problem Statement

Traditional disaster relief funds lack transparency and control:
- Donors cannot verify how funds are used
- Beneficiaries may misuse funds
- No clear audit trail

## Solution

A minimal stablecoin system where:
- Only approved beneficiaries can receive funds
- Funds can only be spent at approved vendors
- All transfers are validated on-chain and visible publicly

## Features

- **On-Chain Validation**: All spending rules enforced by smart contracts
- **Transparent**: All transactions visible on blockchain
- **Controlled**: Beneficiaries can only send to approved vendors
- **Simple**: No backend, no database - everything on-chain

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Web3**: ethers.js v6
- **Wallet**: MetaMask
- **Smart Contracts**: Solidity
- **Deployment**: Remix IDE
- **Blockchain**: Ethereum testnet (Sepolia recommended)

## Smart Contracts

### 1. Registry Contract
Stores:
- Whitelisted beneficiaries
- Whitelisted vendors with categories (Food or Medicine)

### 2. Token Contract (ERC20)
- Mintable by owner to approved beneficiaries
- Transfers restricted: beneficiaries can only send to vendors
- All other transfers fail on-chain

## Setup Instructions

### Step 1: Deploy Smart Contracts

1. Go to [Remix IDE](https://remix.ethereum.org)
2. Create two new files:
   - `Registry.sol`
   - `DisasterReliefToken.sol`
3. Copy the contract code from the `contracts/` folder
4. Compile with Solidity version ^0.8.0

**Deploy in this order:**

1. Deploy `Registry.sol` first
   - Copy the deployed contract address
2. Deploy `DisasterReliefToken.sol`
   - Pass the Registry address as constructor parameter
   - Copy the deployed Token address

### Step 2: Configure Frontend

1. Open `src/config/contracts.ts`
2. Replace the contract addresses:

```typescript
export const REGISTRY_ADDRESS = 'YOUR_REGISTRY_ADDRESS';
export const TOKEN_ADDRESS = 'YOUR_TOKEN_ADDRESS';
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run Development Server

```bash
npm run dev
```

### Step 5: Connect MetaMask

1. Install MetaMask browser extension
2. Switch to Sepolia testnet
3. Get test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
4. Open the app and click "Connect MetaMask"

## Usage

### Admin Functions (Owner Only)

1. **Add Beneficiary**
   - Enter wallet address
   - Click "Add Beneficiary"

2. **Add Vendor**
   - Enter wallet address
   - Select category (Food or Medicine)
   - Click "Add Vendor"

3. **Mint Tokens**
   - Enter beneficiary address
   - Enter amount
   - Click "Mint Tokens"

### Beneficiary Functions

1. **View Balance**
   - See token balance on Beneficiary page

2. **Send Tokens**
   - Enter vendor address
   - Enter amount
   - Click "Send Tokens"
   - Transaction will FAIL if recipient is not an approved vendor

### Public View

- View all transactions on the blockchain
- See mints and transfers
- Full transparency for all stakeholders

## On-Chain Rules

The smart contracts enforce these rules:

1. Only owner can mint tokens
2. Tokens can only be minted to approved beneficiaries
3. Beneficiaries can ONLY send tokens to approved vendors
4. Any transfer to a non-vendor address will be rejected
5. Owner can send tokens to anyone (for administrative purposes)

## Project Structure

```
├── contracts/              # Solidity smart contracts
│   ├── Registry.sol
│   ├── DisasterReliefToken.sol
│   └── README.md
├── src/
│   ├── components/         # React components
│   │   └── Layout.tsx
│   ├── config/             # Contract addresses and ABIs
│   │   └── contracts.ts
│   ├── context/            # Web3 context
│   │   └── Web3Context.tsx
│   ├── pages/              # Application pages
│   │   ├── Home.tsx
│   │   ├── Admin.tsx
│   │   ├── Beneficiary.tsx
│   │   └── PublicView.tsx
│   └── types/              # TypeScript definitions
│       └── window.d.ts
└── README.md
```

## Testing the System

### Test Scenario

1. **Deploy contracts** (as owner)
2. **Add a beneficiary** address
3. **Add a vendor** address with category
4. **Mint tokens** to the beneficiary
5. **Switch to beneficiary wallet** in MetaMask
6. **Try to send tokens** to the vendor (should succeed)
7. **Try to send tokens** to a non-vendor address (should fail)
8. **View transactions** on Public page

### Expected Behavior

- Transfers to approved vendors: SUCCESS
- Transfers to non-vendors: FAIL with error
- Minting to non-beneficiaries: FAIL with error
- All operations visible on blockchain

## Security Features

- All validation done on-chain
- No off-chain enforcement
- No admin can override spending rules
- Immutable spending restrictions
- Complete transaction transparency

## Limitations

This is a minimal demo with:
- No KYC system
- No advanced admin dashboard
- No category-based spending limits
- No backend or database
- Basic UI/UX

## Future Enhancements

Potential improvements:
- Category-based spending limits
- Time-based restrictions
- Multi-signature approval
- Oracle integration for real-world data
- Mobile app support

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
