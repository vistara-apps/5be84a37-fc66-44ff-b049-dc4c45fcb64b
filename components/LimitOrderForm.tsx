'use client';

import { useState } from 'react';
import { Clock, Target } from 'lucide-react';
import { Token, LimitOrder } from '@/lib/types';
import { SwapInput } from './SwapInput';
import { formatNumber } from '@/lib/utils';

interface LimitOrderFormProps {
  onCreateOrder: (order: Omit<LimitOrder, 'id' | 'userId' | 'createdAt'>) => void;
}

export function LimitOrderForm({ onCreateOrder }: LimitOrderFormProps) {
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [amountIn, setAmountIn] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [expiryDays, setExpiryDays] = useState('7');

  const currentPrice = fromToken && toToken ? 
    (fromToken.price || 0) / (toToken.price || 1) : 0;

  const handleCreateOrder = () => {
    if (!fromToken || !toToken || !amountIn || !limitPrice) return;

    const order: Omit<LimitOrder, 'id' | 'userId' | 'createdAt'> = {
      fromToken,
      toToken,
      amountIn,
      limitPrice: parseFloat(limitPrice),
      currentPrice,
      status: 'active',
      expiresAt: Date.now() + (parseInt(expiryDays) * 24 * 60 * 60 * 1000),
    };

    onCreateOrder(order);
    
    // Reset form
    setAmountIn('');
    setLimitPrice('');
  };

  const priceDeviation = currentPrice > 0 ? 
    ((parseFloat(limitPrice) - currentPrice) / currentPrice) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold">Create Limit Order</h3>
      </div>

      <SwapInput
        label="You Pay"
        token={fromToken}
        amount={amountIn}
        onTokenSelect={setFromToken}
        onAmountChange={setAmountIn}
      />

      <SwapInput
        label="You Receive"
        token={toToken}
        amount=""
        onTokenSelect={setToToken}
        onAmountChange={() => {}}
        showBalance={false}
        disabled
      />

      <div className="card">
        <label className="block text-sm text-text-secondary mb-2">
          Limit Price ({toToken?.symbol || 'Token'} per {fromToken?.symbol || 'Token'})
        </label>
        <input
          type="number"
          value={limitPrice}
          onChange={(e) => setLimitPrice(e.target.value)}
          placeholder="0.0"
          className="input-field w-full"
        />
        {currentPrice > 0 && (
          <div className="mt-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Current Price:</span>
              <span>{formatNumber(currentPrice, 6)}</span>
            </div>
            {limitPrice && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Price Difference:</span>
                <span className={priceDeviation > 0 ? 'text-accent' : 'text-red-400'}>
                  {priceDeviation > 0 ? '+' : ''}{formatNumber(priceDeviation, 2)}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card">
        <label className="block text-sm text-text-secondary mb-2">
          <Clock className="w-4 h-4 inline mr-1" />
          Expires In
        </label>
        <select
          value={expiryDays}
          onChange={(e) => setExpiryDays(e.target.value)}
          className="input-field w-full"
        >
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
          <option value="90">90 Days</option>
        </select>
      </div>

      <button
        onClick={handleCreateOrder}
        disabled={!fromToken || !toToken || !amountIn || !limitPrice}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Limit Order
      </button>

      <div className="text-xs text-text-secondary">
        <p>• Limit orders execute automatically when the target price is reached</p>
        <p>• A small gas fee will be charged when the order executes</p>
        <p>• Orders can be cancelled at any time before execution</p>
      </div>
    </div>
  );
}
