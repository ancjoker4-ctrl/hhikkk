import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import { REGISTRY_ADDRESS, TOKEN_ADDRESS, REGISTRY_ABI, TOKEN_ABI } from '../config/contracts';

interface Web3ContextType {
  account: string | null;
  isOwner: boolean;
  connectWallet: () => Promise<void>;
  registryContract: Contract | null;
  tokenContract: Contract | null;
  provider: BrowserProvider | null;
  isConnected: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [registryContract, setRegistryContract] = useState<Contract | null>(null);
  const [tokenContract, setTokenContract] = useState<Contract | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const browserProvider = new BrowserProvider(window.ethereum);
      const accounts = await browserProvider.send('eth_requestAccounts', []);
      const signer = await browserProvider.getSigner();

      setProvider(browserProvider);
      setAccount(accounts[0]);

      const registry = new Contract(REGISTRY_ADDRESS, REGISTRY_ABI, signer);
      const token = new Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

      setRegistryContract(registry);
      setTokenContract(token);

      const owner = await registry.owner();
      setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet');
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          connectWallet();
        } else {
          setAccount(null);
          setIsOwner(false);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        isOwner,
        connectWallet,
        registryContract,
        tokenContract,
        provider,
        isConnected: !!account,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export { formatEther, parseEther };
