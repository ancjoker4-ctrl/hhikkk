import React from 'react';
import { useWeb3 } from '../context/Web3Context';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: 'home' | 'admin' | 'beneficiary' | 'public';
  onNavigate: (page: 'home' | 'admin' | 'beneficiary' | 'public') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const { account, isOwner, isConnected } = useWeb3();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <nav className="bg-white shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-slate-800">Disaster Relief Token</h1>

              {isConnected && (
                <div className="hidden md:flex space-x-4">
                  <button
                    onClick={() => onNavigate('home')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === 'home'
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Home
                  </button>

                  {isOwner && (
                    <button
                      onClick={() => onNavigate('admin')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === 'admin'
                          ? 'bg-blue-500 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Admin
                    </button>
                  )}

                  <button
                    onClick={() => onNavigate('beneficiary')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === 'beneficiary'
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Beneficiary
                  </button>

                  <button
                    onClick={() => onNavigate('public')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === 'public'
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Transactions
                  </button>
                </div>
              )}
            </div>

            {isConnected && account && (
              <div className="flex items-center space-x-3">
                {isOwner && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Owner
                  </span>
                )}
                <div className="px-3 py-1 bg-slate-100 rounded-lg text-sm font-mono text-slate-700">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
