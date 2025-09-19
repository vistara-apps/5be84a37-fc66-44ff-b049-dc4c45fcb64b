'use client';

import { SwapRoute } from '@/lib/types';
import { formatNumber } from '@/lib/utils';
import { TrendingUp, Zap, ArrowRight } from 'lucide-react';

interface RouteDisplayProps {
  route: SwapRoute | null;
  isLoading?: boolean;
}

export function RouteDisplay({ route, isLoading = false }: RouteDisplayProps) {
  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-text-secondary/20 rounded w-1/3 mb-2"></div>
          <div className="h-6 bg-text-secondary/20 rounded w-2/3 mb-3"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-text-secondary/20 rounded w-1/4"></div>
            <div className="h-4 bg-text-secondary/20 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className="card">
        <div className="text-center text-text-secondary py-4">
          <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Enter amounts to see the best route</p>
        </div>
      </div>
    );
  }

  const priceImpactColor = route.priceImpact > 3 ? 'text-red-400' : 
                          route.priceImpact > 1 ? 'text-yellow-400' : 'text-accent';

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium">Best Route via {route.dexName}</span>
        </div>
        <div className="text-sm text-text-secondary">
          {formatNumber(parseFloat(route.outputAmount), 6)} tokens
        </div>
      </div>

      {/* Route Path */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto">
        {route.route.map((step, index) => (
          <div key={index} className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm bg-background px-2 py-1 rounded text-text-primary">
              {step}
            </span>
            {index < route.route.length - 1 && (
              <ArrowRight className="w-3 h-3 text-text-secondary flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Route Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-text-secondary">Price Impact</span>
          <div className={`font-medium ${priceImpactColor}`}>
            {formatNumber(route.priceImpact, 2)}%
          </div>
        </div>
        <div>
          <span className="text-text-secondary">Est. Gas</span>
          <div className="font-medium text-text-primary">
            ${formatNumber(parseFloat(route.gasEstimate), 2)}
          </div>
        </div>
      </div>

      {route.priceImpact > 3 && (
        <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400">
          ⚠️ High price impact. Consider reducing swap amount.
        </div>
      )}
    </div>
  );
}
