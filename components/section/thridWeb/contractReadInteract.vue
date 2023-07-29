<script setup lang="ts">
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";

// import sdk from "./sdkInstance"
const config = useRuntimeConfig();
const THIRDWEB_CLIENT_ID = config.public.clientIdThirdWeb;
const CONTRACT_ADDRESS = "0x3990fabc23d9ac11164624e37141617ad4760e2b";

const sdk = new ThirdwebSDK(PolygonZkevmTestnet, { clientId: THIRDWEB_CLIENT_ID})


// Connect to your smart contract using the contract address
const contract = async () => { await sdk.getContract(CONTRACT_ADDRESS); }

// Call a function on your smart contract using the function name
// const name = async () => { contract.call("myFunctionName")};
// const actorTypes = async () => { contract.call("actorTypes", [{{args}}])};
// const getProduct = async () => { contract.call("getProduct", [_productId])};
// const getProductStock = async () => { contract.call("getProductStock", [_productId])};
// const getProductTraceabilityInfo = async () => { contract.call("getProductTraceabilityInfo", [_productId])};
// const getTraceabilityInfo = async () => { contract.call("getTraceabilityInfo", [_productId])};
// const productCounter = async () => { contract.call("productCounter", [{{args}}])};
// const productStock = async () => { contract.call("productStock", [{{args}}])};
// const products = async () => { contract.call("products", [{{args}}])};

// Or Using the extensions API matching your contract extensions
// const allNFTs = async () => { await contract.erc721.getAll()};
// const tokenSupply = async () => { await contract.erc20.totalSupply()};


</script>
<template>
    <button :Click="contract">
        conectar-wallet
    </button>
</template>
<style></style>