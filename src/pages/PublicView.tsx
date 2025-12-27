import React, { useState, useEffect } from 'react';
import { useWeb3, formatEther } from '../context/Web3Context';
import { Activity, RefreshCw, ArrowRight } from 'lucide-react';

interface Transfer {
  from: string;
  to: string;
  value: string;
  blockNumber: number;
  transactionHash: string;
}

export const PublicView: React.FC = () => {
  const { tokenContract, provider } = useWeb3();

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTransfers = async () => {
    if (!tokenContract || !provider) return;

    setLoading(true);
    try {
      const filter = tokenContract.filters.Transfer();
      const events = await tokenContract.queryFilter(filter);

      const transferData: Transfer[] = events.map((event: any) => ({
        from: event.args.from,
        to: event.args.to,
        value: formatEther(event.args.value),
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
      }));

      setTransfers(transferData.reverse());
    } catch (error) {
      console.error('Error loading transfers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransfers();
  }, [tokenContract, provider]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isMint = (from: string) => {
    return from === '0x0000000000000000000000000000000000000000';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Transaction History</h2>
            <p className="text-slate-600">
              All token transfers are publicly visible on the blockchain.
            </p>
          </div>
          <button
            onClick={loadTransfers}
            disabled={loading}
            className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
            title="Refresh transactions"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-4">
          <div className="flex items-center text-white">
            <Activity className="w-5 h-5 mr-2" />
            <h3 className="text-lg font-semibold">
              {transfers.length} {transfers.length === 1 ? 'Transaction' : 'Transactions'}
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p>Loading transactions...</p>
          </div>
        ) : transfers.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No transactions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {transfers.map((transfer, index) => (
              <div
                key={`${transfer.transactionHash}-${index}`}
                className="p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {isMint(transfer.from) ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        MINT
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        TRANSFER
                      </span>
                    )}
                    <span className="text-lg font-bold text-slate-800">
                      {parseFloat(transfer.value).toFixed(2)} DRT
                    </span>
                  </div>
                  <span className="text-sm text-slate-500">Block #{transfer.blockNumber}</span>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex-1 bg-slate-100 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-500 mb-1">From</p>
                    <p className="font-mono text-sm text-slate-800">
                      {isMint(transfer.from) ? 'Minted' : formatAddress(transfer.from)}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 bg-slate-100 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-500 mb-1">To</p>
                    <p className="font-mono text-sm text-slate-800">{formatAddress(transfer.to)}</p>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-mono">
                  Tx: {formatAddress(transfer.transactionHash)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">About Transparency</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          All token movements are permanently recorded on the blockchain. This includes minting
          operations (when tokens are created and distributed to beneficiaries) and transfers
          (when beneficiaries spend tokens at approved vendors). Anyone can verify these
          transactions, ensuring complete transparency in how relief funds are distributed and
          used.
        </p>
      </div>
    </div>
  );
};
