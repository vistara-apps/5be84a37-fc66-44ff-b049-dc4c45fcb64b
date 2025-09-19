# BaseSwap Swapper

A decentralized exchange aggregator built as a Base Mini App, providing optimal token swap routes with advanced trading features.

## Features

- **Best Price Routing**: Automatically finds the best swap routes across multiple DEXs on Base
- **Slippage Control**: Customizable slippage tolerance for trade protection
- **Limit Orders**: Set target prices for automatic execution
- **Portfolio Tracking**: Overview of swap history and token holdings
- **Mobile-First Design**: Optimized for Base App and mobile usage

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd baseswap-swapper
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Architecture

### Core Components

- **SwapInput**: Token selection and amount input
- **RouteDisplay**: Shows optimal swap routes and pricing
- **SlippageSlider**: Slippage tolerance configuration
- **LimitOrderForm**: Create and manage limit orders
- **PortfolioSummary**: Portfolio overview and analytics
- **TransactionStatus**: Transaction progress and results

### Data Models

- **Token**: ERC-20 token information and metadata
- **SwapRoute**: DEX routing and pricing data
- **Swap**: Transaction history and details
- **LimitOrder**: Conditional order management
- **User**: User profile and preferences

## Features in Detail

### Best Price Routing
- Scans multiple DEXs on Base network
- Compares routes for optimal pricing
- Minimizes slippage and maximizes output
- Real-time price impact calculation

### Slippage Control
- Preset options: 0.1%, 0.5%, 1.0%
- Custom slippage input
- Maximum 5% protection
- Visual warnings for high impact trades

### Limit Orders
- Set target prices for execution
- Automatic monitoring and execution
- Flexible expiry options (1-90 days)
- Order management interface

### Portfolio Analytics
- Total portfolio value tracking
- Swap history and performance
- Top token holdings display
- 24h performance indicators

## Business Model

- **Fee Structure**: 0.1% fee on each swap transaction
- **Revenue Sharing**: Transparent fee collection
- **Premium Features**: Advanced analytics and lower fees for power users

## Security

- **Smart Contract Integration**: Direct interaction with audited DEX contracts
- **Slippage Protection**: User-defined maximum acceptable slippage
- **Transaction Simulation**: Pre-execution validation
- **Error Handling**: Comprehensive error states and recovery

## Deployment

The app is designed to run as a Base Mini App within the Base ecosystem:

1. **Manifest Configuration**: Proper frame metadata for discovery
2. **Mobile Optimization**: Touch-friendly interface design
3. **Performance**: Optimized loading and interaction patterns
4. **Integration**: Seamless wallet and transaction flow

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
