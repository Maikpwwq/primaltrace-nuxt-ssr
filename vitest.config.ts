import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
  test: {
    // Run contract tests sequentially — they share on-chain state
    sequence: { concurrent: false },
    // Generous timeout for testnet RPC calls
    testTimeout: 60_000,
    hookTimeout: 60_000,
    // Include test files
    include: ['tests/**/*.test.ts'],
    // Environment
    environment: 'node',
  },
})
