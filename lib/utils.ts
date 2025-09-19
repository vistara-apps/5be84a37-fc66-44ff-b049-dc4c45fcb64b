import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(value: number, decimals: number = 2): string {
  if (value === 0) return '0';
  if (value < 0.01) return '<0.01';
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toFixed(decimals);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function calculatePriceImpact(inputAmount: number, outputAmount: number, price: number): number {
  const expectedOutput = inputAmount * price;
  return ((expectedOutput - outputAmount) / expectedOutput) * 100;
}

export function generateMockRoute(fromToken: string, toToken: string, amount: number) {
  const routes = [
    [fromToken, toToken],
    [fromToken, 'WETH', toToken],
    [fromToken, 'USDC', toToken],
  ];
  
  return routes[Math.floor(Math.random() * routes.length)];
}
