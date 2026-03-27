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
- **Web3 Authentication** — Wallet-based login via Web3Auth and MetaMask
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
| Network | Polygon zkEVM |
| Backend Services | [Supabase](https://supabase.com), [Tatum API](https://tatum.io) |
| Deployment | [Vercel](https://vercel.com) |
| Package Manager | **pnpm** (required) |

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

Copy `.env.example` (or use the existing `.env`) and configure your keys. Runtime config is managed via `nuxt.config.ts` → `runtimeConfig.public`.

## Project Structure

```
├── assets/scss/          # Global SCSS styles and Vuetify overrides
├── components/
│   ├── section/
│   │   ├── web-3-auth/   # Web3Auth + MetaMask wallet connection
│   │   ├── dash-board/   # Dashboard data loaders and layout
│   │   ├── register-smart-contract/  # Contract deployment & QR scanning
│   │   ├── add-catalog/  # On-chain catalog management
│   │   ├── add-product/  # On-chain product registration
│   │   ├── add-traceability-info/    # Traceability event recording
│   │   ├── add-alert/    # Anomaly alert management
│   │   ├── tables/       # Data resume tables (catalogs, products, etc.)
│   │   ├── connect-wallet/  # Wallet display and navigation
│   │   └── qr-code/      # QR code generation
│   └── shared/           # Shared/reusable components
├── data/                 # Static data and contract variables
├── entities/             # TypeScript entity definitions
├── ethers/               # Raw ethers.js utilities and MetaMask SDK setup
├── hooks/                # Custom Vue composables
├── layouts/              # Nuxt layouts
├── pages/                # File-based routing
│   ├── index.vue         # Landing page
│   ├── dashboard.vue     # Main dApp dashboard
│   ├── blocktimeline.vue # Block timeline viewer
│   └── deployedContracts.vue  # Deployed contracts list
├── plugins/              # Nuxt plugins (Vuetify, etc.)
├── services/thridWeb/    # ThirdWeb SDK service layer
│   ├── sdkInstance.js     # ThirdWeb SDK singleton
│   ├── contractReadInteract.ts   # Read-only contract calls
│   ├── contractWriteInteract.ts  # Write contract transactions
│   └── implementationAbi.json   # Smart contract ABI
├── stores/               # Pinia stores
│   ├── index.ts          # Wallet store (accounts, provider, Web3Auth)
│   └── smart-contract.ts # Smart contract state (address, catalogs, products)
├── utils/                # Utility functions
├── nuxt.config.ts        # Nuxt configuration
├── package.json
└── tsconfig.json
```

## Deployment

The application is deployed to **Vercel** and available at:

🔗 **[https://primaltrace-nuxt-ssr.vercel.app](https://primaltrace-nuxt-ssr.vercel.app)**

```bash
# Production build
pnpm build

# Preview locally before deploying
node .output/server/index.mjs
```

## Smart Contract Architecture

PrimalTrace uses a factory pattern where users deploy their own implementation contracts on Polygon zkEVM. Each contract supports:

- **Catalogs** — Grouping of products
- **Products** — Individual tracked items with stock
- **Traceability Info** — Supply chain events linked to products
- **Anomaly Alerts** — Exception tracking for quality assurance

## License

This project is proprietary. © NexaSoft SAS.

UI Kit originally based on NextKit NuxtJS by [WrapPixel](https://www.wrappixel.com/) (MIT License).
