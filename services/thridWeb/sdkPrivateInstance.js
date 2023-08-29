import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
// import { useWalletStore } from '@/store'
// import { storeToRefs } from 'pinia'

// const storeWallet = useWalletStore()
// // but skip any action or non reactive (non ref/reactive) property
// const { wallet } = storeToRefs(storeWallet); // Destructuring from a Store 

const config = useRuntimeConfig();
// const THIRDWEB_PRIVATE_KEY = config.public.thirdwebPrivateKey;
const THIRDWEB_CLIENT_ID = config.public.thirdwebClientId;
const PRIVATE_KEY = config.public.personalAccountPrivateKey; // wallet.privateKey; // 

const sdk = ThirdwebSDK.fromPrivateKey(
  PRIVATE_KEY, // Your wallet's private key (only required for write operations)
  PolygonZkevmTestnet, // "ethereum",
  {
    clientId: THIRDWEB_CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
    // secretKey: THIRDWEB_PRIVATE_KEY, // Use secret key if using on the server, get it from dashboard settings
  },
);

export default sdk