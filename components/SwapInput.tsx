'use client';

import { useState } from 'react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { Token } from '@/lib/types';
import { BASE_TOKENS } from '@/lib/constants';
import { formatNumber } from '@/lib/utils';

interface SwapInputProps {
  label: string;
  token: Token | null;
  amount: string;
  onTokenSelect: (token: Token) => void;
  onAmountChange: (amount: string) => void;
  showBalance?: boolean;
  disabled?: boolean;
}

export function SwapInput({
  label,
  token,
  amount,
  onTokenSelect,
  onAmountChange,
  showBalance = true,
  disabled = false,
}: SwapInputProps) {
  const [showTokenList, setShowTokenList] = useState(false);

  const handleTokenSelect = (selectedToken: Token) => {
    onTokenSelect(selectedToken);
    setShowTokenList(false);
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-text-secondary">{label}</span>
        {showBalance && token && (
          <span className="text-sm text-text-secondary">
            Balance: {formatNumber(parseFloat(token.balance || '0'), 4)}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowTokenList(true)}
          className="flex items-center gap-2 bg-background rounded-md px-3 py-2 hover:bg-background/80 transition-colors duration-200"
        >
          {token ? (
            <>
              <img
                src={token.logoURI}
                alt={token.symbol}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-token.png';
                }}
              />
              <span className="font-medium">{token.symbol}</span>
            </>
          ) : (
            <span className="text-text-secondary">Select token</span>
          )}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.0"
          disabled={disabled}
          className="flex-1 bg-transparent text-right text-xl font-medium outline-none placeholder-text-secondary disabled:opacity-50"
        />
      </div>
      
      {token && amount && (
        <div className="text-right text-sm text-text-secondary mt-1">
          ≈ ${formatNumber(parseFloat(amount) * (token.price || 0))}
        </div>
      )}

      {/* Token Selection Modal */}
      {showTokenList && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg w-full max-w-md max-h-96 overflow-hidden">
            <div className="p-4 border-b border-text-secondary/20">
              <h3 className="text-lg font-semibold">Select Token</h3>
            </div>
            <div className="overflow-y-auto max-h-80">
              {BASE_TOKENS.map((tokenOption) => (
                <button
                  key={tokenOption.address}
                  onClick={() => handleTokenSelect(tokenOption)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-background/50 transition-colors duration-200"
                >
                  <img
                    src={tokenOption.logoURI}
                    alt={tokenOption.symbol}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-token.png';
                    }}
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{tokenOption.symbol}</div>
                    <div className="text-sm text-text-secondary">{tokenOption.name}</div>
                  </div>
                  {showBalance && (
                    <div className="text-right">
                      <div className="text-sm">{formatNumber(parseFloat(tokenOption.balance || '0'), 4)}</div>
                      <div className="text-xs text-text-secondary">
                        ${formatNumber(parseFloat(tokenOption.balance || '0') * (tokenOption.price || 0))}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-text-secondary/20">
              <button
                onClick={() => setShowTokenList(false)}
                className="w-full btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
