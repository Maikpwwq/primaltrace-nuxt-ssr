import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const CONTRACT_ADDRESS = "0x3990fabc23d9ac11164624e37141617ad4760e2b";
const config = useRuntimeConfig();
const THIRDWEB_PRIVATE_KEY = config.public.apiKeyThirdWeb;
const THIRDWEB_CLIENT_ID = config.public.clientIdThirdWeb;
const PRIVATE_KEY = ""

const sdk = ThirdwebSDK.fromPrivateKey(
  PRIVATE_KEY, // Your wallet's private key (only required for write operations)
  "ethereum",
  {
    clientId: THIRDWEB_CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
    secretKey: THIRDWEB_PRIVATE_KEY, // Use secret key if using on the server, get it from dashboard settings
  },
);

export default sdk