/**
 * Input Validation & Custom Error Tests — PrimalTrace V0.5
 *
 * Verifies that the contract rejects invalid inputs with custom errors.
 * Read-only tests run without a private key.
 */
import { describe, it, expect } from 'vitest'
import { ethers } from 'ethers'
import {
  readContract,
  canRunWriteTests,
  getWriteContract,
} from '../setup'

describe('Validation — Read-only error cases', () => {
  it('getProduct(0) should revert (invalid product ID)', async () => {
    await expect(readContract.getProduct(0)).rejects.toThrow()
  })

  it('getProduct(999999) should revert with ProductNotFound', async () => {
    await expect(readContract.getProduct(999999)).rejects.toThrow()
  })

  it('getAlert(0) should revert (invalid alert ID)', async () => {
    await expect(readContract.getAlert(0)).rejects.toThrow()
  })

  it('getAlert(999999) should revert with AlertNotFound', async () => {
    await expect(readContract.getAlert(999999)).rejects.toThrow()
  })

  it('getCatalog(0) should revert with CatalogNotFound', async () => {
    await expect(readContract.getCatalog(0)).rejects.toThrow()
  })
})

describe.skipIf(!canRunWriteTests())('Validation — Write error cases (SC-03)', () => {
  it('createCatalog with name > 128 bytes should revert (NameTooLong)', async () => {
    const contract = getWriteContract()
    const longName = 'A'.repeat(200) // exceeds MAX_NAME (128)

    await expect(
      contract.createCatalog(longName, 'desc', 'meta', 'qr')
    ).rejects.toThrow()
  })

  it('createCatalog with description > 512 bytes should revert (DescTooLong)', async () => {
    const contract = getWriteContract()
    const longDesc = 'B'.repeat(600) // exceeds MAX_DESC (512)

    await expect(
      contract.createCatalog('ValidName', longDesc, 'meta', 'qr')
    ).rejects.toThrow()
  })

  it('addProduct with non-existent catalogId should revert (CatalogNotFound)', async () => {
    const contract = getWriteContract()

    await expect(
      contract.addProduct(
        999999, 'Name', 'desc', 'mfg',
        Math.floor(Date.now() / 1000), 'BATCH', 'Loc', 'meta', 'qr'
      )
    ).rejects.toThrow()
  })

  it('resolveAlert on non-existent alertId should revert (AlertNotFound)', async () => {
    const contract = getWriteContract()

    await expect(
      contract.resolveAlert(999999)
    ).rejects.toThrow()
  })
})
