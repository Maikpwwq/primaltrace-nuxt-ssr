import sdk from "@/services/thridWeb/sdkInstance.js"
import { IMPLEMENTATION_CONTRACT_ADDRESS } from '@/data/contractVariables';

// const config = useRuntimeConfig();
// let contract: any;
const contract = await sdk.getContract(IMPLEMENTATION_CONTRACT_ADDRESS);

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
const getProduct = async (_productId: number) => { await contract.call("getProduct", [_productId]) };
const getProductStock = async (_productId: number) => { await contract.call("getProductStock", [_productId]) };
const getProductTraceabilityInfo = async (_productId: number) => { await contract.call("getProductTraceabilityInfo", [_productId]) };
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
    getProductTraceabilityInfo
}

// use
// import { getProduct, getProductStock, getProductTraceabilityInfo, getTraceabilityInfo } from "@/services/thridWeb/contractReadInteract"
// {{ getProduct(PRODUCT_ID) }}, {{ getProductStock(PRODUCT_ID) }}, {{ getProductTraceabilityInfo(PRODUCT_ID) }}, {{ getTraceabilityInfo(PRODUCT_ID) }}