import getPrivateSdk from "@/services/thridWeb/sdkPrivateInstance.js";
import ABI_CATALOG from "@/services/thridWeb/implementationAbi.json";

// Lazy-initialized contract instance — only connects when first needed
let writeContract: any = null;

const DEFAULT_CONTRACT_ADDRESS = "0x337e858c4465dfef88af8d66baf95842b9b579df";

const getWriteContract = async () => {
  if (!writeContract) {
    console.log("contractWriteInteract: initializing with address", DEFAULT_CONTRACT_ADDRESS);
    try {
      const sdk = getPrivateSdk();
      writeContract = await sdk.getContract(DEFAULT_CONTRACT_ADDRESS, ABI_CATALOG);
    } catch (error) {
      console.error("contractWriteInteract: failed to connect", error);
      throw error;
    }
  }
  return writeContract;
};

/**
 * Resets the cached write contract instance.
 * Call this when the user deploys or selects a new contract address.
 */
const resetWriteContract = () => {
  writeContract = null;
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
