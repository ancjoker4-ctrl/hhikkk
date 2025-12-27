import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { Wallet, Shield, Users, TrendingUp } from 'lucide-react';

export const Home: React.FC = () => {
  const { account, connectWallet, isConnected } = useWeb3();

  return (
    <div className="space-y-8">
      {!isConnected ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Connect your MetaMask wallet to access the Disaster Relief Token system.
              Ensure transparent and controlled distribution of relief funds.
            </p>
            <button
              onClick={connectWallet}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Connect MetaMask
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Connected Successfully</h2>
            <p className="text-slate-600 mb-4">Your wallet is now connected to the system.</p>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-500 mb-1">Wallet Address</p>
              <p className="font-mono text-slate-800">{account}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">On-Chain Security</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All transactions are validated on-chain. Only approved beneficiaries can receive funds.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Controlled Spending</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Beneficiaries can only spend tokens at approved vendors in specific categories.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Full Transparency</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All transfers are visible on the blockchain. Anyone can verify fund usage.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">How It Works</h3>
            <ol className="space-y-3 text-slate-700">
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 mr-3">1.</span>
                <span>Owner approves beneficiaries and vendors through the admin panel</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 mr-3">2.</span>
                <span>Owner mints tokens directly to approved beneficiaries</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 mr-3">3.</span>
                <span>Beneficiaries can only send tokens to approved vendors</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 mr-3">4.</span>
                <span>All transactions are recorded on-chain for full transparency</span>
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
