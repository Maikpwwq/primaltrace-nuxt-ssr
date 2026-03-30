# PrimalTrace — Web3 Nuxt SSR dApp

> La esencia auténtica de tus productos, trazada con seguridad en la blockchain.

**PrimalTrace** is a decentralized application (dApp) built on the **Polygon zkEVM** network, focused on high-security smart contract interactions for supply chain traceability and product tracking solutions.

## Overview

PrimalTrace enables businesses to register, track, and verify product authenticity through blockchain-powered smart contracts. Users can deploy their own smart contracts, manage product catalogs, register traceability events, and monitor anomalies — all through a secure Web3-authenticated interface.

### Key Features

- **Smart Contract Deployment** — Deploy and manage custom traceability contracts on Polygon zkEVM
- **Product Catalog Management** — Create catalogs and register products on-chain
- **Traceability Tracking** — Record and query product traceability information
- **Anomaly Alerts** — Register and monitor supply chain anomalies
- **QR Code Integration** — Scan QR codes to interact with deployed contracts
- **Dual Web3 Authentication** — Wallet-based login via Web3Auth Modal v10 and MetaMask
- **Block Timeline** — Visualize blockchain transaction history

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) (Vue 3.5+, SSR disabled / SPA mode) |
| UI Library | [Vuetify 4](https://vuetifyjs.com) + SCSS |
| State Management | [Pinia 3](https://pinia.vuejs.org) via `@pinia/nuxt` |
| Routing | [Vue Router 5](https://router.vuejs.org) |
| Blockchain | [ethers.js v5](https://docs.ethers.org/v5/) / [ThirdWeb SDK](https://thirdweb.com) / [viem](https://viem.sh) |
| Authentication | [Web3Auth Modal v10](https://web3auth.io) + [MetaMask Connect](https://docs.metamask.io/metamask-connect) |
| Network | Polygon zkEVM Testnet (chain ID `0x5A2` / 1442) |
| Backend Services | [Supabase](https://supabase.com), [Tatum API](https://tatum.io) |
| Node Polyfills | `vite-plugin-node-polyfills` (Buffer, process, stream, etc.) |
| Deployment | [Vercel](https://vercel.com) (Nitro node-server preset) |
| Package Manager | **pnpm** (required — never use npm/npx) |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9 — Install via `corepack enable && corepack prepare pnpm@latest --activate`

### Installation

```bash
# Install dependencies
pnpm install

# Start dev server at http://localhost:3000
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Environment Variables

Runtime config is managed via `nuxt.config.ts` → `runtimeConfig.public`. Keys include:

| Variable | Purpose |
|---|---|
| `apiKeyTatum` | Tatum API key for blockchain queries |
| `thirdwebPrivateKey` | ThirdWeb SDK authentication |
| `thirdwebClientId` | ThirdWeb project client ID |
| `web3authClientID` | Web3Auth Modal client ID |
| `web3authClientSecret` | Web3Auth application password |
| `personalAccountPrivateKey` | Private key for SDK-based contract interactions |
| `supabaseKey` | Supabase anon key |

> **Security Note**: These are currently hardcoded in `nuxt.config.ts`. For production, migrate to `.env` variables.

## Project Structure

```
├── assets/scss/              # Global SCSS styles and Vuetify overrides
│   ├── style.scss            # Main stylesheet
│   ├── variables.scss        # SCSS variables
│   └── components/           # Vuetify component overrides
├── components/
│   ├── lc/header/            # Landing page header with Web3Auth Connect
│   ├── section/
│   │   ├── web-3-auth/       # Web3Auth wallet connection
│   │   │   ├── Web3Auth.vue          # Container: logo + ConnectWalletBtn + WalletError
│   │   │   ├── ConnectWalletBtn.vue  # Web3Auth Modal v10 init/connect flow
│   │   │   ├── Connect.vue           # Post-login navigation (logout, links)
│   │   │   ├── Display.vue           # Wallet info card (balance, chainId)
│   │   │   └── WalletError.vue       # Error display component
│   │   ├── connect-wallet/   # MetaMask direct wallet connection
│   │   │   ├── ConnectWallet.vue     # Container: Navigation + Display + WalletError
│   │   │   ├── Navigation.vue        # MetaMask detect/connect/display with SVG icons
│   │   │   └── Display.vue           # MetaMask wallet info card
│   │   ├── dash-board/       # Dashboard data loaders and layout
│   │   ├── register-smart-contract/  # Contract deployment & QR scanning
│   │   ├── add-catalog/      # On-chain catalog CRUD
│   │   ├── add-product/      # On-chain product registration
│   │   ├── add-traceability-info/    # Traceability event recording
│   │   ├── add-alert/        # Anomaly alert management
│   │   ├── tables/           # Data resume tables
│   │   ├── header/           # Header1, Header2 navigation bars
│   │   └── qr-code/          # QR code generation
│   └── shared/
│       └── lp-banner/        # BannerConnectWallet (dashboard entry point)
├── data/                     # Static data and contract variables
├── entities/                 # TypeScript entity definitions
├── ethers/                   # Raw ethers.js utilities
├── hooks/                    # Custom Vue composables
├── layouts/                  # Nuxt layouts (default.vue)
├── pages/
│   ├── index.vue             # Landing page (AllCustomComponents)
│   ├── dashboard.vue         # Main dApp dashboard
│   ├── blocktimeline.vue     # Block timeline viewer
│   └── deployedContracts.vue # Deployed contracts list
├── plugins/
│   ├── 00.process-shim.client.ts  # Browser process.nextTick polyfill
│   ├── pinia.ts              # Pinia store initialization
│   └── vuetify.ts            # Vuetify 4 plugin configuration
├── schemas/                  # TypeScript interfaces (WalletState, SmartContract, etc.)
├── services/thridWeb/        # ThirdWeb SDK service layer
│   ├── sdkInstance.js        # Public ThirdWeb SDK singleton (read-only)
│   ├── sdkPrivateInstance.js # Private SDK singleton (lazy init, write ops)
│   ├── contractReadInteract.ts   # Read-only contract calls
│   ├── contractWriteInteract.ts  # Write contract transactions (lazy init)
│   ├── deployContract.ts         # Contract deployment
│   ├── implementationAbi.json   # Smart contract ABI
│   └── implementationByteCode.ts # Contract bytecode for deployment
├── stores/
│   ├── index.ts              # Wallet store (accounts, provider, Web3Auth)
│   └── smart-contract.ts     # Contract store (address, catalogs, products)
├── tatum/                    # Tatum API integration
├── types/
│   └── ethereum.d.ts         # Window.ethereum type augmentation
├── utils/                    # Utility functions (formatBalance, formatAddress, etc.)
├── vite-plugins/
│   └── end-of-stream-stub.js # Browser-safe stub for end-of-stream module
├── nuxt.config.ts            # Nuxt + Vite configuration
├── package.json
└── tsconfig.json
```

## Wallet Connection Architecture

PrimalTrace supports two parallel wallet connection flows:

### Flow 1: Web3Auth Modal (Social + Wallet Login)
```
BannerConnectWallet → Web3Auth.vue → ConnectWalletBtn.vue
                                       ├── new Web3Auth({ chains: [...], ... })
                                       ├── web3auth.init()
                                       ├── web3auth.connect() → IProvider
                                       └── ethers.providers.Web3Provider(provider)
```

### Flow 2: MetaMask Direct (Browser Extension)
```
BannerConnectWallet → ConnectWallet.vue → Navigation.vue
                                            ├── detectEthereumProvider()
                                            ├── provider.request({ method: 'eth_requestAccounts' })
                                            └── Updates Pinia wallet store
```

Both flows write to the same Pinia `useWalletStore`, so the rest of the app is agnostic to which method was used.

## Smart Contract Architecture

PrimalTrace uses a factory pattern where users deploy their own implementation contracts on Polygon zkEVM. Each contract supports:

- **Catalogs** — Grouping of products
- **Products** — Individual tracked items with stock
- **Traceability Info** — Supply chain events linked to products
- **Anomaly Alerts** — Exception tracking for quality assurance

## Polyfill & Build Infrastructure

The app requires browser polyfills for Node.js APIs used by Web3 dependencies:

| Component | Purpose |
|---|---|
| `vite-plugin-node-polyfills` | Polyfills Buffer, process, stream, util, etc. |
| `plugins/00.process-shim.client.ts` | Ensures `process.nextTick` exists before modules load |
| `vite-plugins/end-of-stream-stub.js` | Stubs `end-of-stream` (calls `process.nextTick.bind` at module scope) |
| `optimizeDeps.include` | Pre-bundles heavy Web3 deps to prevent runtime 504 errors |

## Deployment

The application is deployed to **Vercel** and available at:

🔗 **[https://primaltrace-nuxt-ssr.vercel.app](https://primaltrace-nuxt-ssr.vercel.app)**

```bash
# Production build
pnpm build

# Preview locally
node .output/server/index.mjs
```

Push to the `main` branch to trigger automatic deployment.

## License

This project is proprietary. © NexaSoft SAS.

UI Kit originally based on NextKit NuxtJS by [WrapPixel](https://www.wrappixel.com/) (MIT License).
