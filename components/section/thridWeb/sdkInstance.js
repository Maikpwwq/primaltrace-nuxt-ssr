import { ThirdwebSDK } from "@thirdweb-dev/sdk";
// import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";

const THIRDWEB_CLIENT_ID = "df959d2b2164354dd35f4b73d56570e2"
// const YOUR_SECRET_KEY = 

const sdk = new ThirdwebSDK(
  PolygonZkevmTest, // "ethereum", "goerli",
  {
    clientId: THIRDWEB_CLIENT_ID, // Use client id if using on the client side, get it from dashboard settings
    // secretKey: "YOUR_SECRET_KEY", // Use secret key if using on the server, get it from dashboard settings
  },
);

export default sdk