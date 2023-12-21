import sdk from "@/services/thridWeb/sdkInstance.js";
// import { IMPLEMENTATION_CONTRACT_ADDRESS } from "@/data/contractVariables";
import ABI_CATALOG from "@/services/thridWeb/implementationAbi.json";

// const config = useRuntimeConfig();
// let contract: any;

// This has not access to Store
// import { useSmartContract } from '@/store/smart-contract'
// import { storeToRefs } from 'pinia'
// const storeContract = useSmartContract()
// // but skip any action or non reactive (non ref/reactive) property
// const { contract } = storeToRefs(storeContract) // Destructuring from a Store

import { deployAddress } from "@/components/section/register-smart-contract/SmartContractRegister.vue";

console.log("contractReadInteract", deployAddress?.value);

const readContract = await sdk.getContract(
  deployAddress?.value, // IMPLEMENTATION_CONTRACT_ADDRESS, // contract.value.contractAddress,
  ABI_CATALOG // The ABI of your smart contract
);

// const init = (async () => {
//     try {
//         contract = await sdk.getContract(IMPLEMENTATION_CONTRACT_ADDRESS);
//         console.log("contractReadInteract", contract);
//     } catch (error: any) {
//         console.log("contractReadInteract", error);
//     }
// })();

// Connect to your smart contract using the contract address
// const contract = async () => { await sdk.getContract(IMPLEMENTATION_CONTRACT_ADDRESS); }

// Call a function on your smart contract using the function name
// const name = async () => { contract.call("myFunctionName") };
const getProduct = async (_productId: number) => {
  return readContract.call("getProduct", [_productId]);
};
const getProductStock = async (_productId: number) => {
  return readContract.call("getProductStock", [_productId]);
};
const getProductTraceabilityInfo = async (_productId: number) => {
  return readContract.call("getProductTraceabilityInfo", [_productId]);
};
const getAlert = async (_alertId: number) => {
  return readContract.call("getAlert", [_alertId]);
};
const getCatalog = async (_catalogId: number) => {
  return readContract.call("getCatalog", [_catalogId]);
};
const getContractCatalogs = async () => {
  return readContract.call("getContractCatalogs"); 
};
const getProductCounter = async () => {
  return readContract.call("productCounter");
}
const getCatalogCounter = async () => {
  return readContract.call("catalogCounter");
}
const getAnomalyCounter = async () => {
  return readContract.call("anomalyCounter");
}

// const getTraceabilityInfo = async (_productId: number) => { contract.call("getTraceabilityInfo", [_productId]) };
// const actorTypes = async (args: any) => { contract.call("actorTypes", [{ args }])};
// const productCounter = async () => { contract.call("productCounter", [])};
// const productStock = async (args: any) => { contract.call("productStock", [{ args }])};
// const products = async (args: any) => { contract.call("products", [{ args }]) };

// Or Using the extensions API matching your contract extensions
// const allNFTs = async () => { await contract.erc721.getAll()};
// const tokenSupply = async () => { await contract.erc20.totalSupply()};

export {
  getProduct,
  getProductStock,
  getProductTraceabilityInfo,
  getAlert,
  getCatalog,
  getContractCatalogs,
  getProductCounter, 
  getCatalogCounter,
  getAnomalyCounter
};

// use
// import { getProduct, getProductStock, getProductTraceabilityInfo, getTraceabilityInfo } from "@/services/thridWeb/contractReadInteract"
// {{ getProduct(PRODUCT_ID) }}, {{ getProductStock(PRODUCT_ID) }}, {{ getProductTraceabilityInfo(PRODUCT_ID) }}, {{ getTraceabilityInfo(PRODUCT_ID) }}
