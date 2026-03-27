import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";

let sdkInstance = null;

const getSdk = () => {
  if (!sdkInstance) {
    const config = useRuntimeConfig();
    const THIRDWEB_CLIENT_ID = config.public.thirdwebClientId;

    sdkInstance = new ThirdwebSDK(
      PolygonZkevmTestnet, // "ethereum", "goerli",
      {
        clientId: THIRDWEB_CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
      },
    );
  }
  return sdkInstance;
};

export default getSdk;