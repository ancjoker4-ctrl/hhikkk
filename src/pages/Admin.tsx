import React, { useState } from 'react';
import { useWeb3, parseEther } from '../context/Web3Context';
import { UserPlus, Store, Coins, AlertCircle } from 'lucide-react';
import { CATEGORY } from '../config/contracts';

export const Admin: React.FC = () => {
  const { isOwner, registryContract, tokenContract } = useWeb3();

  const [beneficiaryAddress, setBeneficiaryAddress] = useState('');
  const [vendorAddress, setVendorAddress] = useState('');
  const [vendorCategory, setVendorCategory] = useState<number>(CATEGORY.Food);
  const [mintAddress, setMintAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOwner) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-800 text-center mb-2">Access Denied</h2>
          <p className="text-red-600 text-center">Only the contract owner can access this page.</p>
        </div>
      </div>
    );
  }

  const addBeneficiary = async () => {
    if (!beneficiaryAddress || !registryContract) return;

    setLoading(true);
    setMessage('');

    try {
      const tx = await registryContract.addBeneficiary(beneficiaryAddress);
      await tx.wait();
      setMessage('Beneficiary added successfully!');
      setBeneficiaryAddress('');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addVendor = async () => {
    if (!vendorAddress || !registryContract) return;

    setLoading(true);
    setMessage('');

    try {
      const tx = await registryContract.addVendor(vendorAddress, vendorCategory);
      await tx.wait();
      setMessage('Vendor added successfully!');
      setVendorAddress('');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const mintTokens = async () => {
    if (!mintAddress || !mintAmount || !tokenContract) return;

    setLoading(true);
    setMessage('');

    try {
      const amount = parseEther(mintAmount);
      const tx = await tokenContract.mint(mintAddress, amount);
      await tx.wait();
      setMessage(`${mintAmount} tokens minted successfully!`);
      setMintAddress('');
      setMintAmount('');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Admin Panel</h2>
        <p className="text-slate-600">Manage beneficiaries, vendors, and mint tokens.</p>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Add Beneficiary</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Wallet Address
              </label>
              <input
                type="text"
                value={beneficiaryAddress}
                onChange={(e) => setBeneficiaryAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={addBeneficiary}
              disabled={loading || !beneficiaryAddress}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Adding...' : 'Add Beneficiary'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Store className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Add Vendor</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Wallet Address
              </label>
              <input
                type="text"
                value={vendorAddress}
                onChange={(e) => setVendorAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={vendorCategory}
                onChange={(e) => setVendorCategory(Number(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={CATEGORY.Food}>Food</option>
                <option value={CATEGORY.Medicine}>Medicine</option>
              </select>
            </div>

            <button
              onClick={addVendor}
              disabled={loading || !vendorAddress}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Adding...' : 'Add Vendor'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <Coins className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Mint Tokens</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Beneficiary Address
              </label>
              <input
                type="text"
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
              <input
                type="text"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                placeholder="100"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={mintTokens}
              disabled={loading || !mintAddress || !mintAmount}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Minting...' : 'Mint Tokens'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Admin Guidelines</h3>
        <ul className="space-y-2 text-slate-700 text-sm">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Beneficiaries must be added before they can receive minted tokens</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Vendors must be registered with a category (Food or Medicine)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Tokens can only be minted to approved beneficiaries</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>All operations require transaction confirmation in MetaMask</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
