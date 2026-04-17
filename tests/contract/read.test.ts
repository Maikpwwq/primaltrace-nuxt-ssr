/**
 * Contract Read Tests — PrimalTrace V0.5
 *
 * These tests verify read functions against the live Cardona testnet contract.
 * No private key required — uses a public RPC provider.
 */
import { describe, it, expect } from 'vitest'
import { readContract, CONTRACT_ADDRESS, DEPLOYER_ADDRESS } from '../setup'

describe('Contract Read Functions', () => {
  it('should connect to the correct contract address', () => {
    expect(readContract.address).toBe(CONTRACT_ADDRESS)
  })

  it('catalogCounter should return >= 1 (constructor creates first catalog)', async () => {
    const count = await readContract.catalogCounter()
    expect(count.toNumber()).toBeGreaterThanOrEqual(1)
  })

  it('productCounter should return >= 0', async () => {
    const count = await readContract.productCounter()
    expect(count.toNumber()).toBeGreaterThanOrEqual(0)
  })

  it('alertCounter should return >= 0', async () => {
    const count = await readContract.alertCounter()
    expect(count.toNumber()).toBeGreaterThanOrEqual(0)
  })

  it('getCatalog(1) should return a valid Catalog struct', async () => {
    const catalog = await readContract.getCatalog(1)
    // Struct returned as array — verify key fields exist
    expect(catalog).toBeDefined()
    // catalogId should be 1
    expect(catalog.catalogId.toNumber()).toBe(1)
    // catalogName should be a non-empty string
    expect(catalog.catalogName).toBeTruthy()
    expect(typeof catalog.catalogName).toBe('string')
  })

  it('getCatalog(0) should revert with CatalogNotFound', async () => {
    await expect(readContract.getCatalog(0)).rejects.toThrow()
  })

  it('getCatalog(999999) should revert with CatalogNotFound', async () => {
    await expect(readContract.getCatalog(999999)).rejects.toThrow()
  })
})

describe('Pagination Reads', () => {
  it('getCatalogsPaginated(1, 10) should return an array', async () => {
    const result = await readContract.getCatalogsPaginated(1, 10)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeLessThanOrEqual(10)
  })

  it('getCatalogsPaginated with limit > 50 should cap at MAX_PAGE (50)', async () => {
    // Should not revert — contract caps internally
    const result = await readContract.getCatalogsPaginated(1, 100)
    expect(result.length).toBeLessThanOrEqual(50)
  })

  it('getAlertsPaginated(1, 10) should return an array', async () => {
    const result = await readContract.getAlertsPaginated(1, 10)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeLessThanOrEqual(10)
  })
})
