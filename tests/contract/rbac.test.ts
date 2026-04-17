/**
 * RBAC Tests — PrimalTrace V0.5
 *
 * Verifies AccessControl role checks against the live Cardona testnet contract.
 * Read tests (hasRole queries) run without a private key.
 * Write tests (grantRole, unauthorized access) require TEST_PRIVATE_KEY.
 */
import { describe, it, expect } from 'vitest'
import { ethers } from 'ethers'
import {
  readContract,
  DEPLOYER_ADDRESS,
  OPERATOR_ROLE,
  AUDITOR_ROLE,
  DEFAULT_ADMIN_ROLE,
  canRunWriteTests,
  getWriteContract,
  provider,
  CONTRACT_ADDRESS,
} from '../setup'
import ABI from '@/services/thridWeb/implementationAbi.json'

describe('RBAC — Role Queries (read-only)', () => {
  it('deployer should have DEFAULT_ADMIN_ROLE', async () => {
    const has = await readContract.hasRole(DEFAULT_ADMIN_ROLE, DEPLOYER_ADDRESS)
    expect(has).toBe(true)
  })

  it('deployer should have OPERATOR_ROLE (granted in constructor)', async () => {
    const has = await readContract.hasRole(OPERATOR_ROLE, DEPLOYER_ADDRESS)
    expect(has).toBe(true)
  })

  it('random address should NOT have OPERATOR_ROLE', async () => {
    const randomAddr = ethers.Wallet.createRandom().address
    const has = await readContract.hasRole(OPERATOR_ROLE, randomAddr)
    expect(has).toBe(false)
  })

  it('random address should NOT have DEFAULT_ADMIN_ROLE', async () => {
    const randomAddr = ethers.Wallet.createRandom().address
    const has = await readContract.hasRole(DEFAULT_ADMIN_ROLE, randomAddr)
    expect(has).toBe(false)
  })
})

describe('RBAC — Unauthorized Access (write tests)', () => {
  it.skipIf(!canRunWriteTests())(
    'non-operator wallet calling addProduct should revert',
    async () => {
      // Create a random wallet with no roles
      const randomWallet = ethers.Wallet.createRandom().connect(provider)
      const unauthorizedContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, randomWallet)

      // This should revert with AccessControl error
      await expect(
        unauthorizedContract.addProduct(
          1,
          'UnauthorizedProduct',
          'desc',
          'mfg',
          Math.floor(Date.now() / 1000),
          'BATCH001',
          'Location',
          'meta',
          'qr'
        )
      ).rejects.toThrow()
    }
  )

  it.skipIf(!canRunWriteTests())(
    'non-admin wallet calling grantRole should revert',
    async () => {
      const randomWallet = ethers.Wallet.createRandom().connect(provider)
      const unauthorizedContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, randomWallet)
      const targetAddr = ethers.Wallet.createRandom().address

      await expect(
        unauthorizedContract.grantRole(OPERATOR_ROLE, targetAddr)
      ).rejects.toThrow()
    }
  )
})
