# Quick Deployment Guide

## Prerequisites

- MetaMask installed
- Sepolia testnet ETH ([Get from faucet](https://sepoliafaucet.com/))
- Remix IDE access

## Step-by-Step Deployment

### 1. Deploy Smart Contracts via Remix

#### Deploy Registry Contract

1. Open [Remix IDE](https://remix.ethereum.org)
2. Create new file: `Registry.sol`
3. Copy content from `contracts/Registry.sol`
4. Go to "Solidity Compiler" tab
5. Click "Compile Registry.sol"
6. Go to "Deploy & Run Transactions" tab
7. Set Environment to "Injected Provider - MetaMask"
8. Select "Registry" contract
9. Click "Deploy"
10. Confirm transaction in MetaMask
11. **COPY THE DEPLOYED CONTRACT ADDRESS**

Example: `0x1234567890123456789012345678901234567890`

#### Deploy Token Contract

1. Create new file: `DisasterReliefToken.sol`
2. Copy content from `contracts/DisasterReliefToken.sol`
3. Compile the contract
4. In Deploy section, expand the constructor parameters
5. Paste your Registry contract address as parameter
6. Click "Deploy"
7. Confirm transaction in MetaMask
8. **COPY THE DEPLOYED CONTRACT ADDRESS**

Example: `0x0987654321098765432109876543210987654321`

### 2. Configure Frontend

Open `src/config/contracts.ts` and update:

```typescript
export const REGISTRY_ADDRESS = '0xYOUR_REGISTRY_ADDRESS_HERE';
export const TOKEN_ADDRESS = '0xYOUR_TOKEN_ADDRESS_HERE';
```

### 3. Run the Application

```bash
npm install
npm run dev
```

### 4. Test the System

#### As Owner:

1. Connect MetaMask (should show "Owner" badge)
2. Go to Admin page
3. Add a beneficiary address
4. Add a vendor address (select Food or Medicine)
5. Mint tokens to the beneficiary

#### As Beneficiary:

1. Switch to beneficiary wallet in MetaMask
2. Refresh the page
3. Go to Beneficiary page
4. You should see your token balance
5. Try sending tokens to the vendor (should work)
6. Try sending to a random address (should fail)

#### View Transactions:

1. Go to Transactions page
2. See all mints and transfers
3. Verify transparency

## Common Issues

### Issue: "Only owner" error
**Solution**: Make sure you're connected with the wallet that deployed the contracts

### Issue: "Not a beneficiary" error
**Solution**: Add the address as a beneficiary first through Admin panel

### Issue: "Recipient not a vendor" error
**Solution**: This is expected! The system is working correctly. Only approved vendors can receive tokens.

### Issue: MetaMask not connecting
**Solution**:
- Make sure MetaMask is installed
- Check you're on Sepolia testnet
- Try refreshing the page

### Issue: Transaction failing
**Solution**:
- Ensure you have enough Sepolia ETH for gas
- Check you're on the correct network
- Verify contract addresses are correct in config

## Network Details

- **Network**: Sepolia Testnet
- **Chain ID**: 11155111
- **Currency**: SepoliaETH (test ETH)
- **Block Explorer**: [Sepolia Etherscan](https://sepolia.etherscan.io/)

## Verifying Contracts (Optional)

To verify your contracts on Etherscan:

1. Go to [Sepolia Etherscan](https://sepolia.etherscan.io/)
2. Search for your contract address
3. Click "Contract" tab
4. Click "Verify and Publish"
5. Follow the verification wizard

## Sample Test Addresses

For testing, you can create multiple MetaMask accounts:

1. Owner: Your deployment wallet
2. Beneficiary: Account 2
3. Vendor: Account 3
4. Random: Account 4 (for testing rejection)

## Next Steps

After successful deployment:

1. Document your contract addresses
2. Share the frontend URL with stakeholders
3. Add multiple beneficiaries and vendors
4. Monitor transactions on the Public page
5. Test edge cases and restrictions

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify contract addresses in config
3. Ensure you're on Sepolia testnet
4. Confirm you have test ETH
5. Try clearing MetaMask activity data

Enjoy building transparent relief systems!
