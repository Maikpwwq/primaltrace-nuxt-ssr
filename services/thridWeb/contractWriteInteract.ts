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
    catalogId,
    productName,
    productDescription,
    manufacturer,
    manufacturingDate,
    batchNumber,
    productionLocation,
    metadataProducto,
    productQrCode,
  } = product;
  // V0.5 signature: addProduct(catalogId, name, desc, manufacturer, date, batch, location, metadata, qr)
  const sendProduct = [
    catalogId,
    productName,
    productDescription,
    manufacturer,
    manufacturingDate,
    batchNumber,
    productionLocation,
    metadataProducto,
    productQrCode || "",
  ];
  console.log("addProduct", product, sendProduct);
  return await contract.call("addProduct", sendProduct);
};

const addTraceabilityInfo = async (traceabilityInfo: any) => {
  const contract = await getWriteContract();
  const {
    productId,
    action,
    actor,
    actorType,
    actorId,
    metadataAction,
    certificationType,
    certificationDate,
    certificationResult,
  } = traceabilityInfo;
  // V0.5 signature: addTraceabilityInfo(productId, action, actor, actorType, actorId, metadataAction, certType, certDate, certResult)
  const sendTraceabilityInfo = [
    productId,
    action || "",
    actor,
    actorType,
    actorId || "",
    metadataAction || "",
    certificationType || "",
    certificationDate || 0,
    certificationResult || "",
  ];
  console.log("addTraceabilityInfo", traceabilityInfo, sendTraceabilityInfo);
  return await contract.call("addTraceabilityInfo", sendTraceabilityInfo);
};

const addAlerts = async (alert: any) => {
  const contract = await getWriteContract();
  const {
    productId,
    traceabilityId,
    alertType,
    alertTitle,
    alertSubtitle,
    alertDescription,
    alertParam,
    conditionalTrigguer,
  } = alert;
  // V0.5 signature: reportAlert(productId, traceabilityId, alertType, title, subtitle, desc, param, trigger)
  // Note: reportedBy is msg.sender on-chain; resolved defaults to false; createdAt is block.timestamp
  const sendAlertInfo = [
    productId,
    traceabilityId || 0,
    alertType,
    alertTitle || "",
    alertSubtitle || "",
    alertDescription || "",
    alertParam || "",
    conditionalTrigguer || "",
  ];
  console.log("addAlerts", alert, sendAlertInfo);
  return await contract.call("reportAlert", sendAlertInfo);
};

const createCatalog = async (catalogInfo: any) => {
  const contract = await getWriteContract();
  const { catalogName, catalogDescription, catalogMetadata, catalogQrCode } = catalogInfo;
  // V0.5 signature: createCatalog(name, desc, meta, qr)
  const sendCatalog = [
    catalogName,
    catalogDescription || "",
    catalogMetadata || "",
    catalogQrCode || "",
  ];
  console.log("createCatalog", catalogInfo, sendCatalog);
  return await contract.call("createCatalog", sendCatalog);
};

const updateProductStock = async (productStock: any) => {
  const contract = await getWriteContract();
  const { productId, availableQuantity, reservedQuantity, totalQuantity } = productStock;
  return await contract.call("updateProductStock", [
    productId,
    availableQuantity,
    reservedQuantity,
    totalQuantity,
  ]);
};

const resolveAlert = async (alertId: number) => {
  const contract = await getWriteContract();
  return await contract.call("resolveAlert", [alertId]);
};

// ── V0.5 Role management (SC-01) ──────────────────────

const grantRole = async (roleHash: string, account: string) => {
  const contract = await getWriteContract();
  return await contract.call("grantRole", [roleHash, account]);
};

const revokeRole = async (roleHash: string, account: string) => {
  const contract = await getWriteContract();
  return await contract.call("revokeRole", [roleHash, account]);
};

export {
  createCatalog,
  addProduct,
  addTraceabilityInfo,
  addAlerts,
  updateProductStock,
  resolveAlert,
  grantRole,
  revokeRole,
  resetWriteContract,
};
