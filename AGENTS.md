# AGENTS.md — PrimalTrace Nuxt SSR

This file provides context for AI coding agents working on this project.

## Project Overview

PrimalTrace is a Web3 dApp on **Polygon zkEVM** for supply chain traceability. Built with **Nuxt 4 + Vue 3.5 + Vuetify 4 + Pinia 3**, it uses ethers.js v5 for blockchain interactions and Web3Auth v10 for wallet authentication.

## Package Manager

> **IMPORTANT: Always use `pnpm`, never `npm` or `npx`.**

| Instead of | Use |
|---|---|
| `npm install` | `pnpm install` |
| `npm run dev` | `pnpm dev` |
| `npm run build` | `pnpm build` |
| `npx <package>` | `pnpm dlx <package>` |
| `npx -y <package>` | `pnpm dlx <package>` |

## Build & Dev Commands

```bash
# Install dependencies
pnpm install

# Development server (http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Format code
pnpm prettier

# Upgrade Nuxt
pnpm nuxi
```

## Key Architecture Decisions

### SSR is Disabled
The app runs in **SPA mode** (`ssr: false` in `nuxt.config.ts`). This is intentional because Web3 wallet interactions require browser APIs (`window.ethereum`, `crypto`, etc.) that are unavailable server-side.

### Store Path Convention
Pinia stores live in `stores/` (plural). All imports must use `@/stores` or `@/stores/smart-contract`. **Never** use `@/store` (singular) — this path does not exist and will cause build failures.

### Two Pinia Stores
- **`stores/index.ts`** — Wallet state: accounts, balances, provider, Web3Auth instance, connection status
- **`stores/smart-contract.ts`** — Contract state: address, catalogs, products, traceability info, alerts

Both wallet connection methods (Web3Auth and MetaMask) write to the same `useWalletStore`, so downstream components are agnostic to the auth method.

### Service Layer — Lazy Initialization Pattern
- `services/thridWeb/` — ThirdWeb SDK integration for smart contract read/write operations
- **`sdkPrivateInstance.js`** uses a lazy singleton pattern via `getPrivateSdk()`. This is critical — do NOT use top-level `await` or eager instantiation, as it blocks the module graph and causes white-screen crashes.
- **`contractWriteInteract.ts`** uses `getWriteContract()` lazy singleton for the same reason.
- Contract ABI is stored as JSON in `implementationAbi.json`
- Contract bytecode for deployment is in `implementationByteCode.ts`

### Component Organization
Components follow a section-based structure under `components/section/`:
- `web-3-auth/` — Web3Auth Modal v10 wallet connection
  - `ConnectWalletBtn.vue` — Main Web3Auth init/connect flow
  - `Connect.vue` — Post-login nav (logout, deployed contracts, block timeline)
  - `Display.vue` — Wallet info card; uses `computed()` for etherscan URL
  - `WalletError.vue` — Error display
- `connect-wallet/` — MetaMask direct wallet connection
  - `Navigation.vue` — Provider detection via `@metamask/detect-provider`, uses `onMounted`/`onBeforeUnmount` lifecycle
  - `Display.vue` — MetaMask wallet info card
- `dash-board/` — Dashboard data loading
- `register-smart-contract/` — Contract deployment and QR scanning
- `add-catalog/`, `add-product/`, `add-traceability-info/`, `add-alert/` — CRUD operations
- `tables/` — Data display tables
- `header/` — Header1, Header2 navigation bars (use `ref(false)` for drawer toggle)

### Polyfill Infrastructure
The app requires browser polyfills for Node.js APIs used by Web3 dependencies. This is managed by three components:

1. **`vite-plugin-node-polyfills`** in `nuxt.config.ts` — Provides Buffer, process, stream, util, events polyfills
2. **`plugins/00.process-shim.client.ts`** — Nuxt client plugin that ensures `process.nextTick` exists before any module evaluates it. The `00.` prefix ensures it loads first.
3. **`vite-plugins/end-of-stream-stub.js`** — Browser-safe stub aliased via `vite.resolve.alias` in `nuxt.config.ts`. The real `end-of-stream` calls `process.nextTick.bind(process)` at module scope, which crashes because the browser polyfill lacks `nextTick` at that point.

### Vite Dependency Pre-bundling
Heavy Web3 dependencies MUST be listed in `vite.optimizeDeps.include` in `nuxt.config.ts`. Without this, Vite discovers them at runtime causing 504 errors and page reloads. Currently pre-bundled:
- `@web3auth/modal`, `@web3auth/base`
- `@thirdweb-dev/sdk`, `@thirdweb-dev/chains`
- `ethers`, `@supabase/supabase-js`
- `qrcode.vue`, `@teckel/vue-barcode-reader`
- `vue-tabler-icons`, `@tabler/icons-vue`
- Polyfill shims: `vite-plugin-node-polyfills/shims/{buffer,global,process}`

### Type Augmentations
- **`types/ethereum.d.ts`** — Augments `Window` interface with `ethereum` property (MetaMask injection). Without this, any `window.ethereum` access produces a TS error.

### SCSS Styling
- Global styles are in `assets/scss/style.scss`
- Vuetify overrides are in `assets/scss/components/`
- Uses `@import` syntax (Dart Sass deprecation warnings are silenced in `nuxt.config.ts`)
- Variables are defined in `assets/scss/variables.scss`

## Code Style

- **Language**: TypeScript in `.vue` files (`<script setup lang="ts">`)
- **Formatting**: Prettier (config in `prettierrc.json`)
- **Vue Style**: Composition API with `<script setup>` syntax
- **Imports**: Use `@/` alias for project root paths
- **Reactive values**: Always use `computed()` for derived values in `<script setup>`, never eagerly evaluate store refs (e.g., `const url = computed(() => ...)` not `const url = \`...\${store.value}\``)

## Common Gotchas

1. **Never append stray text outside `<script>`, `<template>`, or `<style>` blocks** in `.vue` files. The Vite SFC compiler will silently break the component.

2. **Web3Auth v10 Breaking Changes**:
   - `initModal()` was renamed to `init()`
   - `chainConfig` (single object) was renamed to `chains` (array of `CustomChainConfig`)
   - `CustomChainConfig` now requires a `logo` property
   - `authenticateUser()` was renamed to `getIdentityToken()`
   - Import `CustomChainConfig` and `CHAIN_NAMESPACES` from `@web3auth/modal` (NOT `@web3auth/base`) to avoid type version mismatches between v9 base and v10 modal
   - `IProvider` can still be imported from `@web3auth/base`
   - `web3auth.connect()` returns `IProvider | null` — always null-check before use

3. **Never use top-level `await` in service files**. It blocks the Vite module graph and causes white-page crashes on route navigation. Use lazy singleton patterns instead:
   ```typescript
   // BAD — blocks module graph
   const contract = await sdk.getContract(address);
   export default contract;
   
   // GOOD — lazy initialization
   let _contract: SmartContract | null = null;
   export async function getWriteContract() {
     if (!_contract) _contract = await sdk.getContract(address);
     return _contract;
   }
   ```

4. **All header/drawer components must declare `isActive`**. Components using `isActive` in templates (e.g., `v-list-group`) must have `const isActive = ref(true)` in `<script setup>`. Missing this causes runtime crashes.

5. **Drawer refs must be `ref(false)`, not `ref(null)`**. Using `ref(null)` infers `Ref<null>` which rejects the boolean assignment from `@click.stop="drawer = !drawer"`. Vuetify `v-model` expects boolean.

6. **MetaMask SDK** has been replaced by `@metamask/detect-provider` for provider detection. The old `@metamask/sdk` package is deprecated.

7. **`@nuxtjs/vuetify`** is a Nuxt 2 module. Do NOT add it — Vuetify 4 is loaded directly via the Vite plugin and `build.transpile` in `nuxt.config.ts`.

8. **Runtime config secrets** are currently hardcoded in `nuxt.config.ts` under `runtimeConfig.public`. These should eventually be moved to `.env` variables.

9. **ethers.js v5** is used (not v6). Function signatures differ between versions — check the ethers v5 docs when making changes. Key difference: v5 uses `ethers.providers.Web3Provider`, v6 uses `ethers.BrowserProvider`.

10. **Large chunks warning** during build is expected due to Web3 dependencies (ethers, viem, MetaMask). Consider code-splitting if bundle size becomes problematic.

11. **Cache invalidation**: If polyfill or dependency changes don't take effect, clear caches: `rm -rf node_modules/.cache .nuxt .output`

12. **`provider.request()` returns `Maybe<string>`** — Cast with `as string` when you know the RPC method returns a string (e.g., `eth_getBalance`, `eth_chainId`).

## Wallet Connection Flows

### Web3Auth (ConnectWalletBtn.vue)
```
User clicks "Conectar Wallet" →
  web3auth.init() →
  web3auth.connect() → IProvider | null →
  null check →
  ethers.providers.Web3Provider(provider) →
  provider.request({ method: 'eth_accounts' }) →
  updateWallet(accounts) →
  Pinia store updated
```

### MetaMask (Navigation.vue)
```
Component mounts →
  detectEthereumProvider() →
  provider.request({ method: 'eth_chainId' }) →
  provider.request({ method: 'eth_accounts' }) →
  updateWallet(accounts) →
  provider.on('accountsChanged', updateWallet) →
  Pinia store updated
```

## Testing

No automated test suite is currently configured. Verify changes by:
1. Running `pnpm build` — must complete without errors
2. Running `pnpm dev` — check routes `/`, `/dashboard`, `/blocktimeline`
3. Testing wallet connection flow manually (both Web3Auth and MetaMask)
4. Check browser console for `TypeError` or `undefined` errors on mount

## Deployment

Deployed to **Vercel** at https://primaltrace-nuxt-ssr.vercel.app

The Vercel deployment uses the **node-server** Nitro preset. Push to the `main` branch to trigger automatic deployment.
