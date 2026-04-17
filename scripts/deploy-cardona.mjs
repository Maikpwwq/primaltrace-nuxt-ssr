/**
 * Deploy CatalogsV0.5 to Polygon zkEVM Cardona Testnet via ThirdWeb SDK
 *
 * Usage:
 *   node scripts/deploy-cardona.mjs
 *
 * Uses the project's ThirdWeb clientId and wallet private key.
 * Override with env vars if needed:
 *   THIRDWEB_CLIENT_ID=... PRIVATE_KEY=0x... node scripts/deploy-cardona.mjs
 */
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ── Config ──────────────────────────────────────────────────────────────
// Defaults from nuxt.config.ts — override via env vars
const THIRDWEB_CLIENT_ID = process.env.THIRDWEB_CLIENT_ID || 'df959d2b2164354dd35f4b73d56570e2'

// PRIVATE_KEY must be provided — the key in nuxt.config maps to a different wallet
const PRIVATE_KEY = process.env.PRIVATE_KEY
if (!PRIVATE_KEY) {
  console.error('❌ Set PRIVATE_KEY env variable for the wallet with Cardona testnet ETH')
  console.error('   Example: PRIVATE_KEY=abc123... node scripts/deploy-cardona.mjs')
  console.error('   (Your funded wallet: 0x2a34f68C873A41963f9a9a995120AE444bB2a488)')
  process.exit(1)
}

// Polygon zkEVM Cardona Testnet — chain 2442
const PolygonZkevmCardona = {
  chainId: 2442,
  name: 'Polygon zkEVM Cardona Testnet',
  chain: 'Polygon zkEVM',
  rpc: ['https://rpc.cardona.zkevm-rpc.com'],
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  shortName: 'zkevm-cardona',
  slug: 'polygon-zkevm-cardona',
  testnet: true,
  explorers: [
    {
      name: 'Cardona PolygonScan',
      url: 'https://cardona-zkevm.polygonscan.com',
      standard: 'EIP3091',
    },
  ],
}

// ── Load ABI & Bytecode ─────────────────────────────────────────────────
const abi = JSON.parse(
  readFileSync(resolve(root, 'services/thridWeb/implementationAbi.json'), 'utf-8')
)

const bytecodeFile = readFileSync(
  resolve(root, 'services/thridWeb/implementationByteCode.ts'), 'utf-8'
)
const bytecodeMatch = bytecodeFile.match(/"((?:0x)?[0-9a-fA-F]+)"/)
if (!bytecodeMatch) {
  console.error('❌ Could not extract bytecode from implementationByteCode.ts')
  process.exit(1)
}
const bytecode = bytecodeMatch[1].startsWith('0x') ? bytecodeMatch[1] : '0x' + bytecodeMatch[1]

// ── Constructor Args ────────────────────────────────────────────────────
const constructorArgs = [
  'PrimalTrace',
  'Register, track, and verify product authenticity',
  'supply chain traceability and product tracking',
  'supply chain traceability and product tracking',
]

// ── Deploy via ThirdWeb SDK ─────────────────────────────────────────────
async function main() {
  console.log('🔗 Initializing ThirdWeb SDK for Cardona (chain 2442)...')

  const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, PolygonZkevmCardona, {
    clientId: THIRDWEB_CLIENT_ID,
  })

  const signer = sdk.getSigner()
  const address = await signer.getAddress()
  const provider = signer.provider
  const balanceWei = await provider.getBalance(address)

  console.log(`   Wallet:  ${address}`)
  console.log(`   Balance: ${(Number(balanceWei) / 1e18).toFixed(6)} ETH`)

  if (balanceWei.isZero()) {
    console.error('❌ Wallet has no ETH on Cardona. Get testnet ETH from the faucet.')
    process.exit(1)
  }

  console.log('\n📦 Deploying CatalogsV0.5 via ThirdWeb SDK...')
  console.log(`   Constructor: ${JSON.stringify(constructorArgs, null, 2)}`)
  console.log(`   Bytecode length: ${bytecode.length} chars`)
  console.log(`   ABI functions: ${abi.filter((e) => e.type === 'function').length}`)

  try {
    const contractAddress = await sdk.deployer.deployContractWithAbi(
      abi,
      bytecode,
      constructorArgs
    )

    console.log('\n✅ Contract deployed successfully!')
    console.log(`   Address:  ${contractAddress}`)
    console.log(`   Explorer: https://cardona-zkevm.polygonscan.com/address/${contractAddress}`)
    console.log('\n📝 Next steps — update these files with the new address:')
    console.log('   1. data/contractVariables.ts  →  IMPLEMENTATION_CONTRACT_ADDRESS')
    console.log('   2. tests/setup.ts             →  CONTRACT_ADDRESS')
    console.log('   3. AGENTS.md                  →  Testnet Address')
  } catch (err) {
    console.error('\n❌ Deployment failed:')
    console.error('   ', err.message || err)

    if (err.message?.includes('gasPrice') || err.message?.includes('EIP-1559')) {
      console.error('\n💡 Cardona may not support EIP-1559. Trying with legacy tx...')
      // Fallback: deploy with ethers directly using type: 0
      const { ethers } = await import('ethers')
      const provider = new ethers.providers.JsonRpcProvider('https://rpc.cardona.zkevm-rpc.com')
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
      const factory = new ethers.ContractFactory(abi, bytecode, wallet)
      const contract = await factory.deploy(...constructorArgs, {
        type: 0,
        gasLimit: 6_000_000,
      })
      console.log(`   Tx hash: ${contract.deployTransaction.hash}`)
      await contract.deployed()
      console.log(`\n✅ Contract deployed (legacy tx)!`)
      console.log(`   Address: ${contract.address}`)
      console.log(`   Explorer: https://cardona-zkevm.polygonscan.com/address/${contract.address}`)
    }

    process.exit(1)
  }
}

main()
