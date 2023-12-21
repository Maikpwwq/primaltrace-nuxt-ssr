import sdk from "@/services/thridWeb/sdkPrivateInstance.js";
// import {
//   IMPLEMENTATION_CONTRACT_ADDRESS,
//   TRACEABILITY_INFO,
//   PRODUCT,
//   ACTOR_TYPE,
//   PRODUCT_STOCK,
// } from "@/data/contractVariables";
import ABI_CATALOG from "@/services/thridWeb/implementationAbi.json";

import { deployAddress } from "@/components/section/register-smart-contract/SmartContractRegister.vue";

// import sdk from "./sdkInstance"
// const config = useRuntimeConfig();
// let contract: any;

console.log("contractReadInteract", deployAddress?.value);

const contract = await sdk.getContract(
  deployAddress?.value, // IMPLEMENTATION_CONTRACT_ADDRESS,
  ABI_CATALOG // The ABI of your smart contract
);

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

const addProduct = async (product: any) => {
  const {
    // catalogId,
    productName,
    productDescription,
    manufacturer,
    manufacturingDate,
    batchNumber,
    productionLocation,
    metadataProducto,
  } = product;
  const sendProduct = [
    // catalogId,
    productName,
    productDescription,
    manufacturer,
    manufacturingDate,
    batchNumber,
    productionLocation,
    metadataProducto,
  ];
  console.log("addProduct", product, sendProduct);
  return await contract.call("addProduct", sendProduct);
};
const addTraceabilityInfo = async (traceabilityInfo: any) => {
  const {
    productId,
    action,
    timestamp,
    actor,
    actorType,
    actorId,
    metadataAction,
  } = traceabilityInfo;
  const sendTraceabilityInfo = [
    productId,
    action,
    timestamp,
    actor,
    actorType,
    actorId,
    metadataAction,
  ];
  console.log("addTraceabilityInfo", traceabilityInfo, sendTraceabilityInfo);
  return await contract.call("addTraceabilityInfo", sendTraceabilityInfo);
};

const addAlerts = async (alert: any) => {
  const {
    alertId,
    productId,
    traceabilityId,
    alertType,
    alertTitle,
    alertSubtitle,
    alertDescription,
    alertParam,
    conditionalTrigguer,
    reportedBy,
    resolved,
  } = alert;
  const sendAlertInfo = [
    alertId,
    productId,
    traceabilityId,
    alertType,
    alertTitle,
    alertSubtitle,
    alertDescription,
    alertParam,
    conditionalTrigguer,
    reportedBy,
    resolved,
  ];
  console.log("addAlerts", alert, sendAlertInfo);
  return await contract.call("reportAlert", sendAlertInfo);
};

const createCatalog = async (catalogInfo: any) => {
  const { catalogName, catalogMetadata, catalogDescription } = catalogInfo;
  const sendCatalog = [catalogName, catalogMetadata, catalogDescription];
  console.log("addTraceabilityInfo", catalogInfo, sendCatalog);
  return await contract.call("createCatalog", sendCatalog);
};
const setActorType = async (actorType: any) => {
  return await contract.call("setActorType", actorType);
};
const updateProductStock = async (productStock: any) => {
  return await contract.call("updateProductStock", productStock);
};
// const product = [_productName, _productDescription, _manufacturer, _manufacturingDate, _batchNumber, _productionLocation, _metadataProducto]
// const traceabilityInfo = [_productId, _action, _timestamp, _actor, _actorType, _actorId, _metadataAction]
// const actorType = [_actorType]
// const productStock = [_productId, _availableQuantity, _reservedQuantity, _totalQuantity]

// Or Using the extensions API matching your contract extensions
// const allNFTs = async () => { await contract.erc721.getAll()};
// const tokenSupply = async () => { await contract.erc20.totalSupply()};

export {
  createCatalog,
  addProduct,
  addTraceabilityInfo,
  addAlerts,
  setActorType,
  updateProductStock,
};
