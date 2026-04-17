/**
 * Test Setup — PrimalTrace V0.5 Contract on Polygon zkEVM Cardona Testnet
 *
 * Provides ethers.js provider, read-only contract instance, and optionally
 * a signer-connected contract for write tests.
 *
 * Write tests require a TEST_PRIVATE_KEY env variable with a funded Cardona wallet.
 * Read tests work without any env variable.
 */
import { ethers } from 'ethers'
import ABI from '@/services/thridWeb/implementationAbi.json'

// ── Network Config ──────────────────────────────────────────────────────
export const CARDONA_RPC = 'https://rpc.cardona.zkevm-rpc.com'
export const CONTRACT_ADDRESS = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8'
export const DEPLOYER_ADDRESS = '0x2a34f68C873A41963f9a9a995120AE444bB2a488'

// ── Role Hashes (match Solidity keccak256 constants) ────────────────────
export const OPERATOR_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('OPERATOR_ROLE'))
export const AUDITOR_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('AUDITOR_ROLE'))
export const DEFAULT_ADMIN_ROLE = ethers.constants.HashZero // 0x00...00

// ── Provider ────────────────────────────────────────────────────────────
export const provider = new ethers.providers.JsonRpcProvider(CARDONA_RPC)

// ── Read-only Contract Instance ─────────────────────────────────────────
export const readContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)

// ── Signer + Write Contract (only when TEST_PRIVATE_KEY is set) ─────────
let _signer: ethers.Wallet | null = null
let _writeContract: ethers.Contract | null = null

export function getSigner(): ethers.Wallet {
  if (!_signer) {
    const pk = process.env.TEST_PRIVATE_KEY
    if (!pk) {
      throw new Error(
        'TEST_PRIVATE_KEY env variable is required for write tests.\n' +
          'Set it to the private key of a funded Cardona testnet wallet.\n' +
          'Example: TEST_PRIVATE_KEY=0xabc123... pnpm test'
      )
    }
    _signer = new ethers.Wallet(pk, provider)
  }
  return _signer
}

export function getWriteContract(): ethers.Contract {
  if (!_writeContract) {
    _writeContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, getSigner())
  }
  return _writeContract
}

/**
 * Helper: check if write tests can run (TEST_PRIVATE_KEY is set)
 */
export function canRunWriteTests(): boolean {
  return !!process.env.TEST_PRIVATE_KEY
}

/**
 * Helper: generate a unique test string to avoid collisions
 */
export function testId(): string {
  return `test_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
}
