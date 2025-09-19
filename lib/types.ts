export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  balance?: string;
  price?: number;
}

export interface SwapRoute {
  id: string;
  dexName: string;
  inputAmount: string;
  outputAmount: string;
  priceImpact: number;
  gasEstimate: string;
  route: string[];
}

export interface Swap {
  id: string;
  userId: string;
  fromToken: Token;
  toToken: Token;
  amountIn: string;
  amountOut: string;
  slippageTolerance: number;
  routeDetails: SwapRoute;
  timestamp: number;
  transactionHash?: string;
  status: 'pending' | 'success' | 'failed';
}

export interface LimitOrder {
  id: string;
  userId: string;
  fromToken: Token;
  toToken: Token;
  amountIn: string;
  limitPrice: number;
  currentPrice: number;
  status: 'active' | 'filled' | 'cancelled';
  createdAt: number;
  expiresAt?: number;
}

export interface User {
  id: string;
  walletAddress: string;
  swapHistory: Swap[];
  limitOrders: LimitOrder[];
}

export interface PortfolioData {
  totalValue: number;
  totalSwaps: number;
  topTokens: Array<{
    token: Token;
    value: number;
    percentage: number;
  }>;
}
