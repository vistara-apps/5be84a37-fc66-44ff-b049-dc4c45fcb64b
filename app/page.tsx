'use client';

import { useState, useEffect } from 'react';
import { ArrowUpDown, BarChart3, Target, History } from 'lucide-react';
import { SwapInput } from '@/components/SwapInput';
import { RouteDisplay } from '@/components/RouteDisplay';
import { SlippageSlider } from '@/components/SlippageSlider';
import { TransactionStatus } from '@/components/TransactionStatus';
import { LimitOrderForm } from '@/components/LimitOrderForm';
import { PortfolioSummary } from '@/components/PortfolioSummary';
import { Token, SwapRoute, LimitOrder, PortfolioData } from '@/lib/types';
import { BASE_TOKENS, DEFAULT_SLIPPAGE, MOCK_DEXES, SWAP_FEE } from '@/lib/constants';
import { generateMockRoute, formatNumber } from '@/lib/utils';

type TabType = 'swap' | 'limit' | 'portfolio';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('swap');
  const [fromToken, setFromToken] = useState<Token | null>(BASE_TOKENS[0]);
  const [toToken, setToToken] = useState<Token | null>(BASE_TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const [bestRoute, setBestRoute] = useState<SwapRoute | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [txStatus, setTxStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [limitOrders, setLimitOrders] = useState<LimitOrder[]>([]);

  // Mock portfolio data
  const portfolioData: PortfolioData = {
    totalValue: 12450.67,
    totalSwaps: 23,
    topTokens: [
      { token: BASE_TOKENS[0], value: 7200.45, percentage: 57.8 },
      { token: BASE_TOKENS[1], value: 3100.22, percentage: 24.9 },
      { token: BASE_TOKENS[2], value: 2150.00, percentage: 17.3 },
    ],
  };

  // Simulate route fetching
  useEffect(() => {
    if (fromToken && toToken && fromAmount && parseFloat(fromAmount) > 0) {
      setIsLoadingRoute(true);
      
      const timer = setTimeout(() => {
        const mockRoute: SwapRoute = {
          id: Math.random().toString(36).substr(2, 9),
          dexName: MOCK_DEXES[Math.floor(Math.random() * MOCK_DEXES.length)],
          inputAmount: fromAmount,
          outputAmount: (parseFloat(fromAmount) * (fromToken.price || 1) / (toToken.price || 1) * (1 - SWAP_FEE)).toString(),
          priceImpact: Math.random() * 2,
          gasEstimate: (Math.random() * 5 + 2).toFixed(2),
          route: generateMockRoute(fromToken.symbol, toToken.symbol, parseFloat(fromAmount)),
        };
        
        setBestRoute(mockRoute);
        setIsLoadingRoute(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setBestRoute(null);
    }
  }, [fromToken, toToken, fromAmount]);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount('');
  };

  const handleSwap = () => {
    if (!bestRoute) return;
    
    setTxStatus('pending');
    
    // Simulate transaction
    setTimeout(() => {
      setTxStatus(Math.random() > 0.1 ? 'success' : 'error');
    }, 3000);
  };

  const handleCreateLimitOrder = (orderData: Omit<LimitOrder, 'id' | 'userId' | 'createdAt'>) => {
    const newOrder: LimitOrder = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user123',
      createdAt: Date.now(),
    };
    
    setLimitOrders(prev => [...prev, newOrder]);
  };

  const tabs = [
    { id: 'swap' as TabType, label: 'Swap', icon: ArrowUpDown },
    { id: 'limit' as TabType, label: 'Limit Orders', icon: Target },
    { id: 'portfolio' as TabType, label: 'Portfolio', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">BaseSwap Swapper</h1>
          <p className="text-text-secondary text-sm">
            Effortless DEX Swaps with Smarter Routing
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-surface rounded-lg p-1 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-accent text-background'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'swap' && (
          <div className="space-y-4">
            <SwapInput
              label="You Pay"
              token={fromToken}
              amount={fromAmount}
              onTokenSelect={setFromToken}
              onAmountChange={setFromAmount}
            />

            <div className="flex justify-center">
              <button
                onClick={handleSwapTokens}
                className="p-2 bg-surface hover:bg-surface/80 rounded-full transition-all duration-200 active:scale-95"
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>

            <SwapInput
              label="You Receive"
              token={toToken}
              amount={bestRoute ? formatNumber(parseFloat(bestRoute.outputAmount), 6) : ''}
              onTokenSelect={setToToken}
              onAmountChange={() => {}}
              showBalance={false}
              disabled
            />

            <RouteDisplay route={bestRoute} isLoading={isLoadingRoute} />

            <div className="flex justify-between items-center">
              <SlippageSlider slippage={slippage} onSlippageChange={setSlippage} />
              <div className="text-sm text-text-secondary">
                Fee: {(SWAP_FEE * 100).toFixed(1)}%
              </div>
            </div>

            <button
              onClick={handleSwap}
              disabled={!bestRoute || isLoadingRoute}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingRoute ? 'Finding Best Route...' : 'Swap Tokens'}
            </button>
          </div>
        )}

        {activeTab === 'limit' && (
          <div className="space-y-6">
            <LimitOrderForm onCreateOrder={handleCreateLimitOrder} />
            
            {limitOrders.length > 0 && (
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Active Orders ({limitOrders.length})
                </h4>
                <div className="space-y-3">
                  {limitOrders.map((order) => (
                    <div key={order.id} className="card">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={order.fromToken.logoURI}
                            alt={order.fromToken.symbol}
                            className="w-6 h-6 rounded-full"
                          />
                          <ArrowUpDown className="w-3 h-3 text-text-secondary" />
                          <img
                            src={order.toToken.logoURI}
                            alt={order.toToken.symbol}
                            className="w-6 h-6 rounded-full"
                          />
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.status === 'active' ? 'bg-accent/20 text-accent' : 'bg-text-secondary/20 text-text-secondary'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Amount:</span>
                          <span>{formatNumber(parseFloat(order.amountIn), 4)} {order.fromToken.symbol}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Limit Price:</span>
                          <span>{formatNumber(order.limitPrice, 6)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Current Price:</span>
                          <span>{formatNumber(order.currentPrice, 6)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <PortfolioSummary data={portfolioData} />
        )}

        {/* Transaction Status Modal */}
        {txStatus && (
          <TransactionStatus
            status={txStatus}
            txHash={txStatus === 'success' ? '0x1234567890abcdef...' : undefined}
            onClose={() => setTxStatus(null)}
          />
        )}
      </div>
    </div>
  );
}
