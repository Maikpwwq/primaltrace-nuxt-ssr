/* adding polygonZkevm network */
const PolygonZkevmTest = {
    id: 1442,
    name: 'zkEVM Testnet',
    network: 'zkEVM Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'ETH',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: 'https://rpc.public.zkevm-test.net',
    },
    blockExplorers: {
        default: { name: 'zkEVM Testnet', url: 'https://testnet-zkevm.polygonscan.com' },
    },
    testnet: true,
}