import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";

const config = useRuntimeConfig();
const THIRDWEB_CLIENT_ID = config.public.thirdwebClientId;
// const YOUR_SECRET_KEY = 

const sdk = new ThirdwebSDK(
  PolygonZkevmTestnet, // "ethereum", "goerli",
  {
    clientId: THIRDWEB_CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
    // secretKey: "YOUR_SECRET_KEY", // Use secret key if using on the server, get it from dashboard settings
  },
);

export default sdk