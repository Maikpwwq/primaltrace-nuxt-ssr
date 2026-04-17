/**
 * Write Tests — PrimalTrace V0.5
 *
 * Tests write operations against the live Cardona testnet contract.
 * Requires TEST_PRIVATE_KEY env variable with a funded Cardona wallet.
 *
 * Run: TEST_PRIVATE_KEY=0x... pnpm test:run tests/contract/write.test.ts
 */
import { describe, it, expect, beforeAll } from 'vitest'
import {
  canRunWriteTests,
  getWriteContract,
  getSigner,
  readContract,
  testId,
} from '../setup'

// Track IDs created during this test run for use in subsequent tests
const created = {
  catalogId: 0,
  productId: 0,
  traceabilityId: 0,
  alertId: 0,
}

describe.skipIf(!canRunWriteTests())('Contract Write Functions', () => {
  let contract: ReturnType<typeof getWriteContract>

  beforeAll(() => {
    contract = getWriteContract()
  })

  it('createCatalog should succeed and return a new catalogId', async () => {
    const name = `TestCatalog_${testId()}`
    const tx = await contract.createCatalog(name, 'Test description', 'meta', 'qr://test')
    const receipt = await tx.wait()

    expect(receipt.status).toBe(1)

    // Read the new catalogCounter to get the ID
    const counter = await readContract.catalogCounter()
    created.catalogId = counter.toNumber()
    expect(created.catalogId).toBeGreaterThan(0)

    // Verify the catalog was stored
    const catalog = await readContract.getCatalog(created.catalogId)
    expect(catalog.catalogName).toBe(name)
  })

  it('addProduct should succeed and return a new productId', async () => {
    expect(created.catalogId).toBeGreaterThan(0)

    const name = `TestProduct_${testId()}`
    const tx = await contract.addProduct(
      created.catalogId,
      name,
      'Product description',
      'TestManufacturer',
      Math.floor(Date.now() / 1000),
      'BATCH-001',
      'Bogotá, Colombia',
      'https://meta.test',
      'qr://product-test'
    )
    const receipt = await tx.wait()
    expect(receipt.status).toBe(1)

    const counter = await readContract.productCounter()
    created.productId = counter.toNumber()
    expect(created.productId).toBeGreaterThan(0)

    // Verify product stored
    const product = await readContract.getProduct(created.productId)
    expect(product.productName).toBe(name)
  })

  it('addTraceabilityInfo should succeed with V0.5 params', async () => {
    expect(created.productId).toBeGreaterThan(0)

    const signerAddr = await getSigner().getAddress()
    const tx = await contract.addTraceabilityInfo(
      created.productId,
      'Manufacturado',          // action
      signerAddr,               // actor
      0,                        // actorType (Manufacturer)
      'ACT-001',                // actorId
      'https://meta.test',      // metadataAction
      'ISO 9001',               // certificationType
      Math.floor(Date.now() / 1000), // certificationDate
      'Aprobado'                // certificationResult
    )
    const receipt = await tx.wait()
    expect(receipt.status).toBe(1)

    // Read the traceability counter
    const product = await readContract.getProduct(created.productId)
    created.traceabilityId = product.traceabilityInfo?.length || 1
  })

  it('reportAlert should succeed and return alertId', async () => {
    expect(created.productId).toBeGreaterThan(0)

    const tx = await contract.reportAlert(
      created.productId,
      1,                        // traceabilityId
      3,                        // alertType (Product)
      `Alert_${testId()}`,      // alertTitle
      'Test subtitle',          // alertSubtitle
      'Test description',       // alertDescription
      'pH > 7.5',               // alertParam
      'pH > 7.0'                // conditionalTrigger
    )
    const receipt = await tx.wait()
    expect(receipt.status).toBe(1)

    const counter = await readContract.alertCounter()
    created.alertId = counter.toNumber()
    expect(created.alertId).toBeGreaterThan(0)
  })

  it('resolveAlert should succeed for the reporter', async () => {
    expect(created.alertId).toBeGreaterThan(0)

    const tx = await contract.resolveAlert(created.alertId)
    const receipt = await tx.wait()
    expect(receipt.status).toBe(1)

    // Verify alert is resolved
    const alert = await readContract.getAlert(created.alertId)
    expect(alert.resolved).toBe(true)
  })
})
