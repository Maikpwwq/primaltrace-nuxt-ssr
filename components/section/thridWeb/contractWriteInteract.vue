<script setup lang="ts">
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";

// import sdk from "./sdkInstance"
const CONTRACT_ADDRESS = "0x3990fabc23d9ac11164624e37141617ad4760e2b";
const config = useRuntimeConfig();
const THIRDWEB_PRIVATE_KEY = config.public.apiKeyThirdWeb;
const THIRDWEB_CLIENT_ID = config.public.clientIdThirdWeb;

const sdk = ThirdwebSDK.fromPrivateKey(THIRDWEB_PRIVATE_KEY, PolygonZkevmTestnet, { clientId: THIRDWEB_CLIENT_ID });


// Connect to your smart contract using the contract address
const contract = async () => { await sdk.getContract(CONTRACT_ADDRESS); }

// Call a function on your smart contract using the function name
// const name = async () => { contract.call("myFunctionName")};

// const product = [_productName, _productDescription, _manufacturer, _manufacturingDate, _batchNumber, _productionLocation, _metadataProducto]
// const addProduct = async () => { contract.call("addProduct", product) };
// const traceabilityInfo = [_productId, _action, _timestamp, _actor, _actorType, _actorId, _metadataAction]
// const addTraceabilityInfo = async () => { contract.call("addTraceabilityInfo", traceabilityInfo) };
// const actorType = [_actorType]
// const setActorType = async () => { contract.call("setActorType", actorType) };
// const productStock = [_productId, _availableQuantity, _reservedQuantity, _totalQuantity]
// const updateProductStock = async () => { contract.call("updateProductStock", productStock) };

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