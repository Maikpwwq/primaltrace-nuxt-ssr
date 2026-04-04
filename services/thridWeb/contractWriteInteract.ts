import getPrivateSdk from "@/services/thridWeb/sdkPrivateInstance.js";
import ABI_CATALOG from "@/services/thridWeb/implementationAbi.json";

import { useSmartContract } from "@/stores/smart-contract";

// Lazy-initialized contract instance — only connects when first needed
let writeContract: any = null;
let cachedAddress: string | null = null;

const getWriteContract = async () => {
  const store = useSmartContract();
  const activeAddress = store.contract.contractAddress;

  if (!activeAddress || activeAddress === "") {
    throw new Error("contractWriteInteract: No active smart contract address selected.");
  }

  // Invalidate cache if the user switched contracts
  if (writeContract && cachedAddress !== activeAddress) {
    resetWriteContract();
  }

  if (!writeContract) {
    console.log("contractWriteInteract: initializing with address", activeAddress);
    try {
      const sdk = getPrivateSdk();
      writeContract = await sdk.getContract(activeAddress, ABI_CATALOG);
      cachedAddress = activeAddress;
    } catch (error) {
      console.error("contractWriteInteract: failed to connect", error);
      throw error;
    }
  }
  return writeContract;
};

const resetWriteContract = () => {
  writeContract = null;
  cachedAddress = null;
};

const addProduct = async (product: any) => {
  const contract = await getWriteContract();
  const {
    productName,
    productDescription,
    manufacturer,
    manufacturingDate,
    batchNumber,
    productionLocation,
    metadataProducto,
  } = product;
  const sendProduct = [
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
  const contract = await getWriteContract();
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
  const contract = await getWriteContract();
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
  const contract = await getWriteContract();
  const { catalogName, catalogMetadata, catalogDescription } = catalogInfo;
  const sendCatalog = [catalogName, catalogMetadata, catalogDescription];
  console.log("createCatalog", catalogInfo, sendCatalog);
  return await contract.call("createCatalog", sendCatalog);
};

const setActorType = async (actorType: any) => {
  const contract = await getWriteContract();
  return await contract.call("setActorType", actorType);
};

const updateProductStock = async (productStock: any) => {
  const contract = await getWriteContract();
  return await contract.call("updateProductStock", productStock);
};

export {
  createCatalog,
  addProduct,
  addTraceabilityInfo,
  addAlerts,
  setActorType,
  updateProductStock,
  resetWriteContract,
};
