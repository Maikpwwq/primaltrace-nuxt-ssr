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

### Service Layer
- `services/thridWeb/` — ThirdWeb SDK integration for smart contract read/write operations
- Contract ABI is stored as JSON in `implementationAbi.json`
- Contract bytecode for deployment is in `implementationByteCode.ts`

### Component Organization
Components follow a section-based structure under `components/section/`:
- `web-3-auth/` — Wallet connection (Web3Auth + MetaMask)
- `dash-board/` — Dashboard data loading
- `register-smart-contract/` — Contract deployment and QR scanning
- `add-catalog/`, `add-product/`, `add-traceability-info/`, `add-alert/` — CRUD operations
- `tables/` — Data display tables

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

## Common Gotchas

1. **Never append stray text outside `<script>`, `<template>`, or `<style>` blocks** in `.vue` files. The Vite SFC compiler will silently break the component.

2. **Web3Auth v10** uses the Unified SDK. Do NOT use `SafeEventEmitterProvider` — use `IProvider` from `@web3auth/base` instead.

3. **MetaMask SDK** has been replaced by `@metamask/connect-evm`. The old `@metamask/sdk` package is deprecated.

4. **`@nuxtjs/vuetify`** is a Nuxt 2 module. Do NOT add it — Vuetify 4 is loaded directly via the Vite plugin and `build.transpile` in `nuxt.config.ts`.

5. **Runtime config secrets** are currently hardcoded in `nuxt.config.ts` under `runtimeConfig.public`. These should eventually be moved to `.env` variables.

6. **ethers.js v5** is used (not v6). Function signatures differ between versions — check the ethers v5 docs when making changes.

7. **Large chunks warning** during build is expected due to Web3 dependencies (ethers, viem, MetaMask). Consider code-splitting if bundle size becomes problematic.

## Testing

No automated test suite is currently configured. Verify changes by:
1. Running `pnpm build` — must complete without errors
2. Running `pnpm dev` — check routes `/`, `/dashboard`, `/blocktimeline`
3. Testing wallet connection flow manually

## Deployment

Deployed to **Vercel** at https://primaltrace-nuxt-ssr.vercel.app

The Vercel deployment uses the **node-server** Nitro preset. Push to the `main` branch to trigger automatic deployment.
