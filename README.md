# PrimalTrace — Web3 Nuxt SSR dApp

> La esencia auténtica de tus productos, trazada con seguridad en la blockchain.

**PrimalTrace** is a decentralized application (dApp) built on the **Polygon zkEVM** network, focused on high-security smart contract interactions for supply chain traceability and product tracking solutions.


## Overview

PrimalTrace enables businesses to register, track, and verify product authenticity through blockchain-powered smart contracts. Users can deploy their own smart contracts, manage product catalogs, register traceability events, and monitor anomalies — all through a secure Web3-authenticated interface.

### Value Proposition

> *"La esencia auténtica de tus productos, trazada con seguridad en la blockchain."*
> — The authentic essence of your products, traced with security on the blockchain.

PrimalTrace provides **premium intelligent administration and tracking systems** ("Sistemas de administración y seguimiento inteligente de primera calidad") that deliver blockchain-backed product lifecycle experience and customer service.

### Market Fit & Target Industries

| Industry | Use Case |
|---|---|
| **HealthTech** | Secure tracking of medications and medical devices; prescription verification |
| **FoodTech** | Product origin verification, ingredient traceability, quality assurance |
| **Supply Chain** | End-to-end distribution monitoring, reducing product waste |
| **Sustainability** | Carbon footprint measurement and environmental impact assessment |
| **Anti-Counterfeiting** | Identifying fraudulent products across supply chains |

### Products

#### TrackWise
Blockchain-backed reliable tracking for distribution supervision. Core capabilities:
- **Reduce product waste** — Optimize the supply chain to reduce waste, increasing efficiency and sustainability
- **Truthful information for critical processes** — Real-time reliable data for efficient and transparent production chains
- **Carbon footprint impact** — Measure and evaluate the carbon footprint of products for environmental sustainability
- **Secure medication tracking** — Reliable tracking of medications and medical devices throughout the supply chain

#### TrustBlock
Blockchain-backed origin authenticity verification. Core capabilities:
- **Identify fraudulent products** — Detect counterfeits through immutable chain-of-custody records
- **Deliver truthful information** — Provide verified product data to end consumers
- **Medical prescription verification** — Authenticate and verify medical prescriptions
- **Expedite deliveries with smart contracts** — Automate and speed up logistics with on-chain agreements

#### Custom Blockchain Solutions
Tailored smart contract deployments for businesses with specific traceability needs. Available through direct consultation.

### Pricing Model

| Plan | Tier | Description |
|---|---|---|
| **Regular** | Personal (Free) | Interact with smart contracts using your own wallet |
| **Master** | Enterprise (Custom) | Custom smart contract design and deployment |

Both plans include a satisfaction guarantee.

### Key Features

- **Smart Contract Deployment** — Deploy and manage custom traceability contracts on Polygon zkEVM
- **Product Catalog Management** — Create catalogs and register products on-chain
- **Traceability Tracking** — Record and query product traceability information with certification support
- **Alerts & Resolution** — Register, monitor, and resolve supply chain alerts with on-chain timestamps
- **Admin Control Center** — Manage KPIs, RBAC roles, Free/Enterprise tier limits, and Factory deployments
- **Role-Based Access Control** — Manage Operator and Auditor roles via AccessControl (RBAC)
- **Product Integrity Verification** — Verify product data authenticity via on-chain keccak256 hashing
- **IPFS Integration** — Store large metadata off-chain using Pinata, keeping on-chain gas costs low
- **Paginated Reads** — Scalable data retrieval with paginated contract queries (max 50 per page)
- **QR Code Integration** — Scan QR codes to interact with deployed contracts
- **Dual Web3 Authentication** — Wallet-based login via Web3Auth Modal v10 and MetaMask
- **Block Timeline** — Visualize blockchain transaction history
- **Free Demo** — Available on request via contact form or WhatsApp

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) (Vue 3.5+, SSR disabled / SPA mode) |
| UI Library | [Vuetify 4](https://vuetifyjs.com) + SCSS |
| State Management | [Pinia 3](https://pinia.vuejs.org) via `@pinia/nuxt` |
| Routing | [Vue Router 5](https://router.vuejs.org) |
| Blockchain | [ethers.js v5](https://docs.ethers.org/v5/) / [ThirdWeb SDK](https://thirdweb.com) / [viem](https://viem.sh) |
| Authentication | [Web3Auth Modal v10](https://web3auth.io) + [MetaMask Connect](https://docs.metamask.io/metamask-connect) |
| Smart Contract | CatalogsV0.5.sol — OpenZeppelin AccessControl + ReentrancyGuard, custom errors, Solidity ^0.8.22 |
| Network | Polygon zkEVM Cardona Testnet (chain ID `0x98A` / 2442) |
| Testnet Contract | [`0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8`](https://cardona-zkevm.polygonscan.com/address/0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8) |
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
| `pinataJwt` | Pinata API JWT for IPFS uploads (`NUXT_PINATA_JWT`) |
| `pinataGateway` | Pinata dedicated gateway domain (`NUXT_PINATA_GATEWAY`) |

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
│   │   ├── dash-board/       # Dashboard data loaders and layout
│   │   ├── admin/            # Admin Control Center (KPIs, Factory, Tiers)
│   │   ├── register-smart-contract/  # Contract deployment & QR scanning
│   │   ├── add-catalog/      # On-chain catalog CRUD
│   │   ├── add-product/      # On-chain product registration
│   │   ├── add-traceability-info/    # Traceability event recording
│   │   ├── add-alert/        # Alert management (V0.5: v-select for AlertType, auto on-chain fields)
│   │   ├── role-management/  # RBAC role grant/revoke UI (V0.5)
│   │   ├── verify-product/   # Product integrity verification UI (V0.5)
│   │   ├── tables/           # Data resume tables
│   │   ├── header/           # Header1, Header2 navigation bars
│   │   └── qr-code/          # QR code generation
│   └── shared/
│       ├── PaginationControls.vue  # Reusable pagination (V0.5, offset/limit for paginated reads)
│       └── lp-banner/        # BannerConnectWallet (dashboard entry point)
├── data/                     # Static data and contract variables
├── entities/                 # TypeScript entity definitions
│   └── smart-contracts/      # Solidity contracts (V0.1–V0.5)
│       └── CatalogsV0.5.sol  # Current production contract (AccessControl, custom errors, integrity hashing)
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
├── services/
│   ├── thridWeb/             # ThirdWeb SDK service layer
│   │   ├── sdkInstance.js        # Public ThirdWeb SDK singleton (read-only)
│   │   ├── sdkPrivateInstance.js # Private SDK singleton (lazy init, write ops)
│   │   ├── contractReadInteract.ts   # Read-only contract calls
│   │   ├── contractWriteInteract.ts  # Write contract transactions (lazy init)
│   │   ├── deployContract.ts         # Contract deployment
│   │   ├── implementationAbi.json   # Smart contract ABI
│   │   └── implementationByteCode.ts # Contract bytecode for deployment
│   └── ipfs/                 # Pinata IPFS integration
│       ├── ipfsUpload.ts         # Upload JSON metadata to IPFS
│       └── ipfsRetrieve.ts       # Retrieve from IPFS gateway
├── stores/
│   ├── index.ts              # Wallet store (accounts, provider, Web3Auth)
│   ├── smart-contract.ts     # Contract store (address, catalogs, products)
│   └── notification.ts       # Global UI notification state
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

PrimalTrace uses a **unified wallet connection flow** through the Web3Auth Modal, which supports social logins (Google, X, Facebook) and 400+ wallets including MetaMask, Trust Wallet, and SafePal.

### Dashboard Component Tree
```text
pages/dashboard.vue
└── BannerConnectWallet.vue (purple banner with instructions)
    └── ConnectWallet.vue
        ├── Navigation.vue
        │   ├── ConnectWalletBtn.vue (Web3Auth modal — ALWAYS shown when not connected)
        │   ├── Install MetaMask/SafePal suggestions (below Connect btn, only if no provider)
        │   └── Connected address display (when wallet connected)
        ├── Display.vue (wallet info card, shown on hover)
        └── WalletError.vue
```

### Connection Flow
```
User clicks "Conectar Wallet" →
  Navigation.vue detects provider via detectEthereumProvider() →
  ConnectWalletBtn.vue opens Web3Auth Modal →
  User picks login method (Google, MetaMask, etc.) →
  web3auth.init() → web3auth.connect() → IProvider →
  ethers.providers.Web3Provider(provider) →
  provider.request({ method: 'eth_accounts' }) →
  updateWallet(accounts) → Pinia useWalletStore updated
```

### Provider Event Listeners (Navigation.vue)
Navigation.vue also subscribes to MetaMask provider events on mount:
- `accountsChanged` → re-syncs wallet state if user switches accounts in MetaMask
- `chainChanged` → re-syncs if user switches networks

Both the Web3Auth flow and provider events write to the same Pinia `useWalletStore`, so the rest of the app is agnostic to the auth method.

## Smart Contract Architecture (CatalogsV0.5)

PrimalTrace uses a factory pattern where users deploy their own implementation contracts on Polygon zkEVM. The current contract version is **CatalogsV0.5** (`0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8` on Cardona testnet).

### Data Model
- **Catalogs** — Grouping of products with QR codes and metadata
- **Products** — Individual tracked items with stock, manufacturing details, and integrity hashes
- **Traceability Info** — Supply chain events linked to products with certification support
- **Alerts** — Exception tracking with typed categories and resolution workflow

### V0.5 Security & Features

| Feature | Implementation |
|---|---|
| **RBAC** | OpenZeppelin `AccessControl` — `DEFAULT_ADMIN_ROLE`, `OPERATOR_ROLE`, `AUDITOR_ROLE` |
| **Reentrancy Protection** | `ReentrancyGuard` on all write functions |
| **Input Validation** | Custom errors + string length bounds (128/512/1024/2048 bytes) |
| **Gas Optimization** | Custom `error` types replace `require` strings (~7KB bytecode savings) |
| **Integrity Hashing** | `keccak256(name, manufacturer, batchNumber)` stored per product |
| **Pagination** | `getCatalogsPaginated`/`getAlertsPaginated` with max 50 per page |
| **Timestamps** | `block.timestamp` auto-set on TraceabilityInfo, Alert, Catalog |
| **Events** | Full event emission for all write operations |

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
