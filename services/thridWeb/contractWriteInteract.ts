import sdk from "@/services/thridWeb/sdkPrivateInstance.js"
import { IMPLEMENTATION_CONTRACT_ADDRESS, TRACEABILITY_INFO, PRODUCT, ACTOR_TYPE, PRODUCT_STOCK } from '@/data/contractVariables'; 

// import sdk from "./sdkInstance"
// const config = useRuntimeConfig();
// let contract: any;
const contract = await sdk.getContract(IMPLEMENTATION_CONTRACT_ADDRESS);
// const init = ( async () => {
//     try {
//         contract = await sdk.getContract(IMPLEMENTATION_CONTRACT_ADDRESS);
//         console.log("contractWriteInteract", contract);
//     } catch (error: any) {
//         console.log("contractWriteInteract", error);
//     }
// })();

// Connect to your smart contract using the contract address
// const contract = async () => { await sdk.getContract(IMPLEMENTATION_CONTRACT_ADDRESS); }

// Call a function on your smart contract using the function name
// const name = async () => { contract.call("myFunctionName")};


const addProduct = async (product: any) => { contract.call("addProduct", product) };
const addTraceabilityInfo = async (traceabilityInfo: any) => { contract.call("addTraceabilityInfo", traceabilityInfo) };
const setActorType = async (actorType: any) => { contract.call("setActorType", actorType) };
const updateProductStock = async (productStock: any) => { contract.call("updateProductStock", productStock) };
// const product = [_productName, _productDescription, _manufacturer, _manufacturingDate, _batchNumber, _productionLocation, _metadataProducto]
// const traceabilityInfo = [_productId, _action, _timestamp, _actor, _actorType, _actorId, _metadataAction]
// const actorType = [_actorType]
// const productStock = [_productId, _availableQuantity, _reservedQuantity, _totalQuantity]

// Or Using the extensions API matching your contract extensions
// const allNFTs = async () => { await contract.erc721.getAll()};
// const tokenSupply = async () => { await contract.erc20.totalSupply()};

export {
    addProduct, addTraceabilityInfo, setActorType, updateProductStock
}