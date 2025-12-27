import React, { useState, useEffect } from 'react';
import { useWeb3, formatEther, parseEther } from '../context/Web3Context';
import { Wallet, Send, RefreshCw } from 'lucide-react';

export const Beneficiary: React.FC = () => {
  const { account, tokenContract, registryContract } = useWeb3();

  const [balance, setBalance] = useState('0');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isBeneficiary, setIsBeneficiary] = useState(false);

  const loadBalance = async () => {
    if (!tokenContract || !account) return;

    try {
      const bal = await tokenContract.balanceOf(account);
      setBalance(formatEther(bal));
    } catch (error) {
      console.error('Error loading balance:', error);
    }
  };

  const checkBeneficiary = async () => {
    if (!registryContract || !account) return;

    try {
      const status = await registryContract.isBeneficiary(account);
      setIsBeneficiary(status);
    } catch (error) {
      console.error('Error checking beneficiary status:', error);
    }
  };

  useEffect(() => {
    loadBalance();
    checkBeneficiary();
  }, [account, tokenContract, registryContract]);

  const sendTokens = async () => {
    if (!recipientAddress || !amount || !tokenContract) return;

    setLoading(true);
    setMessage('');

    try {
      const sendAmount = parseEther(amount);
      const tx = await tokenContract.transfer(recipientAddress, sendAmount);
      await tx.wait();
      setMessage(`Successfully sent ${amount} tokens!`);
      setRecipientAddress('');
      setAmount('');
      await loadBalance();
    } catch (error: any) {
      let errorMsg = error.message;
      if (errorMsg.includes('Sender not a beneficiary')) {
        errorMsg = 'You are not registered as a beneficiary';
      } else if (errorMsg.includes('Recipient not a vendor')) {
        errorMsg = 'Recipient is not a registered vendor';
      } else if (errorMsg.includes('Insufficient balance')) {
        errorMsg = 'Insufficient token balance';
      }
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Beneficiary Portal</h2>
        <p className="text-slate-600">View your balance and send tokens to approved vendors.</p>
      </div>

      {!isBeneficiary && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800">
          You are not registered as a beneficiary. Contact the admin to be added.
        </div>
      )}

      {message && (
        <div
          className={`rounded-xl p-4 ${
            message.includes('Error')
              ? 'bg-red-50 border border-red-200 text-red-800'
              : 'bg-green-50 border border-green-200 text-green-800'
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-blue-100">Token Balance</p>
                <p className="text-3xl font-bold">{parseFloat(balance).toFixed(2)} DRT</p>
              </div>
            </div>
            <button
              onClick={loadBalance}
              className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
              title="Refresh balance"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <p className="text-sm text-blue-100 mb-1">Wallet Address</p>
            <p className="font-mono text-sm break-all">{account}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Send className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Send Tokens</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Vendor Address
              </label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                Only approved vendor addresses will work
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">Available: {balance} DRT</p>
            </div>

            <button
              onClick={sendTokens}
              disabled={loading || !recipientAddress || !amount || !isBeneficiary}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Sending...' : 'Send Tokens'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Important Notes</h3>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>You can only send tokens to approved vendor addresses</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>
              Transactions to non-vendor addresses will be rejected by the smart contract
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>All transfers are recorded on the blockchain for transparency</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Ensure you have enough tokens before initiating a transfer</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
