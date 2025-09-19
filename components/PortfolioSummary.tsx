'use client';

import { TrendingUp, Activity, DollarSign, PieChart } from 'lucide-react';
import { PortfolioData } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface PortfolioSummaryProps {
  data: PortfolioData;
}

export function PortfolioSummary({ data }: PortfolioSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold">Portfolio Overview</h3>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-accent" />
            <span className="text-sm text-text-secondary">Total Value</span>
          </div>
          <div className="text-xl font-bold">{formatCurrency(data.totalValue)}</div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm text-text-secondary">Total Swaps</span>
          </div>
          <div className="text-xl font-bold">{data.totalSwaps}</div>
        </div>
      </div>

      {/* Top Tokens */}
      <div className="card">
        <h4 className="font-medium mb-3">Top Holdings</h4>
        <div className="space-y-3">
          {data.topTokens.map((holding, index) => (
            <div key={holding.token.address} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={holding.token.logoURI}
                    alt={holding.token.symbol}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-token.png';
                    }}
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-background text-xs rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <div className="font-medium">{holding.token.symbol}</div>
                  <div className="text-sm text-text-secondary">{holding.token.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(holding.value)}</div>
                <div className="text-sm text-text-secondary">{formatNumber(holding.percentage, 1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="card">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">24h Performance</span>
          <div className="flex items-center gap-1 text-accent">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">+2.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
