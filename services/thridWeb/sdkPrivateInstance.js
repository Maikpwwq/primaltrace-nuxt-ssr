import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";

let sdkInstance = null;

const getPrivateSdk = () => {
  if (!sdkInstance) {
    const config = useRuntimeConfig();
    const THIRDWEB_CLIENT_ID = config.public.thirdwebClientId;
    const PRIVATE_KEY = config.public.personalAccountPrivateKey;

    sdkInstance = ThirdwebSDK.fromPrivateKey(
      PRIVATE_KEY,
      PolygonZkevmTestnet,
      {
        clientId: THIRDWEB_CLIENT_ID,
      },
    );
  }
  return sdkInstance;
};

export default getPrivateSdk;