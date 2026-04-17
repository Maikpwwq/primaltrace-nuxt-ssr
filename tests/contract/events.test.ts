/**
 * Event Emission Tests — PrimalTrace V0.5
 *
 * Verifies that write operations emit the expected events.
 * Requires TEST_PRIVATE_KEY env variable.
 */
import { describe, it, expect } from 'vitest'
import {
  canRunWriteTests,
  getWriteContract,
  readContract,
  testId,
} from '../setup'

describe.skipIf(!canRunWriteTests())('Event Emission (SC-07)', () => {
  it('createCatalog should emit CatalogCreated event', async () => {
    const contract = getWriteContract()
    const name = `EvtCatalog_${testId()}`

    const tx = await contract.createCatalog(name, 'desc', 'meta', 'qr')
    const receipt = await tx.wait()

    // Find the CatalogCreated event
    const event = receipt.events?.find((e: any) => e.event === 'CatalogCreated')
    expect(event).toBeDefined()
    expect(event!.args!.catalogName).toBe(name)
    expect(event!.args!.creator).toBeTruthy()
    expect(event!.args!.catalogId).toBeTruthy()
  })

  it('addProduct should emit ProductAdded event', async () => {
    const contract = getWriteContract()
    const counter = await readContract.catalogCounter()
    const catalogId = counter.toNumber()
    const name = `EvtProduct_${testId()}`

    const tx = await contract.addProduct(
      catalogId, name, 'desc', 'mfg',
      Math.floor(Date.now() / 1000), 'BATCH-EVT', 'Loc', 'meta', 'qr'
    )
    const receipt = await tx.wait()

    const event = receipt.events?.find((e: any) => e.event === 'ProductAdded')
    expect(event).toBeDefined()
    expect(event!.args!.productName).toBe(name)
  })

  it('addTraceabilityInfo should emit TraceabilityRecorded event', async () => {
    const contract = getWriteContract()
    const productCounter = await readContract.productCounter()
    const productId = productCounter.toNumber()
    const signerAddr = await contract.signer.getAddress()

    const tx = await contract.addTraceabilityInfo(
      productId, 'Enviado', signerAddr, 1, 'ACT-EVT', 'meta',
      '', 0, ''
    )
    const receipt = await tx.wait()

    const event = receipt.events?.find((e: any) => e.event === 'TraceabilityRecorded')
    expect(event).toBeDefined()
    expect(event!.args!.productId.toNumber()).toBe(productId)
  })

  it('reportAlert should emit AlertReported event', async () => {
    const contract = getWriteContract()
    const productCounter = await readContract.productCounter()
    const productId = productCounter.toNumber()

    const tx = await contract.reportAlert(
      productId, 1, 2, `EvtAlert_${testId()}`,
      'sub', 'desc', 'param', 'cond'
    )
    const receipt = await tx.wait()

    const event = receipt.events?.find((e: any) => e.event === 'AlertReported')
    expect(event).toBeDefined()
    expect(event!.args!.productId.toNumber()).toBe(productId)
  })
})
