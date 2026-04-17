/**
 * Integrity Hash Tests — PrimalTrace V0.5
 *
 * Verifies the product integrity hashing mechanism (SC-19).
 * Write tests require TEST_PRIVATE_KEY.
 */
import { describe, it, expect } from 'vitest'
import { ethers } from 'ethers'
import {
  readContract,
  canRunWriteTests,
  getWriteContract,
  testId,
} from '../setup'

describe.skipIf(!canRunWriteTests())('Product Integrity Hashing (SC-19)', () => {
  let productId: number
  const productName = `IntegrityProduct_${Date.now()}`
  const manufacturer = 'TestManufacturer'
  const batchNumber = 'BATCH-INTEGRITY-001'

  it('should create a product and store an integrity hash', async () => {
    const contract = getWriteContract()
    const catalogCounter = await readContract.catalogCounter()
    const catalogId = catalogCounter.toNumber()

    const tx = await contract.addProduct(
      catalogId,
      productName,
      'Description for integrity test',
      manufacturer,
      Math.floor(Date.now() / 1000),
      batchNumber,
      'Bogotá',
      'https://meta.test',
      'qr://integrity'
    )
    const receipt = await tx.wait()
    expect(receipt.status).toBe(1)

    const counter = await readContract.productCounter()
    productId = counter.toNumber()
  })

  it('getProductIntegrityHash should return a non-zero bytes32', async () => {
    expect(productId).toBeGreaterThan(0)

    const hash = await readContract.productIntegrityHashes(productId)
    expect(hash).not.toBe(ethers.constants.HashZero)
    expect(hash).toMatch(/^0x[a-fA-F0-9]{64}$/)
  })

  it('client-side solidityKeccak256 should match on-chain hash', async () => {
    expect(productId).toBeGreaterThan(0)

    // Compute the same hash client-side
    const clientHash = ethers.utils.solidityKeccak256(
      ['string', 'string', 'string'],
      [productName, manufacturer, batchNumber]
    )

    // Fetch on-chain hash
    const onChainHash = await readContract.productIntegrityHashes(productId)

    expect(clientHash).toBe(onChainHash)
  })

  it('verifyProductIntegrity with correct hash should return true', async () => {
    expect(productId).toBeGreaterThan(0)

    const correctHash = ethers.utils.solidityKeccak256(
      ['string', 'string', 'string'],
      [productName, manufacturer, batchNumber]
    )

    const isValid = await readContract.verifyProductIntegrity(productId, correctHash)
    expect(isValid).toBe(true)
  })

  it('verifyProductIntegrity with wrong hash should return false', async () => {
    expect(productId).toBeGreaterThan(0)

    const wrongHash = ethers.utils.solidityKeccak256(
      ['string', 'string', 'string'],
      ['WrongName', 'WrongManufacturer', 'WRONG-BATCH']
    )

    const isValid = await readContract.verifyProductIntegrity(productId, wrongHash)
    expect(isValid).toBe(false)
  })
})
