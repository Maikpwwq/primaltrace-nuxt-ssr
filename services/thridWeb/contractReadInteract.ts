import getSdk from "@/services/thridWeb/sdkInstance.js";
import ABI_CATALOG from "@/services/thridWeb/implementationAbi.json";
import { useSmartContract } from "@/stores/smart-contract";

// Lazy-initialized contract instance — only connects when first needed
let readContract: any = null;
let cachedAddress: string | null = null;

const getReadContract = async () => {
  const store = useSmartContract();
  const activeAddress = store.contract.contractAddress;

  if (!activeAddress || activeAddress === "") {
    throw new Error("contractReadInteract: No active smart contract address selected.");
  }

  // Invalidate cache if the user switched contracts
  if (readContract && cachedAddress !== activeAddress) {
    resetReadContract();
  }

  if (!readContract) {
    console.log("contractReadInteract: initializing with address", activeAddress);
    try {
      const sdk = getSdk();
      readContract = await sdk.getContract(activeAddress, ABI_CATALOG);
      cachedAddress = activeAddress;
    } catch (error) {
      console.error("contractReadInteract: failed to connect", error);
      throw error;
    }
  }
  return readContract;
};

const resetReadContract = () => {
  readContract = null;
  cachedAddress = null;
};

// Smart contract read functions — each lazily initializes the contract on first call
const getProduct = async (_productId: number) => {
  const contract = await getReadContract();
  return contract.call("getProduct", [_productId]);
};

const getProductStock = async (_productId: number) => {
  const contract = await getReadContract();
  return contract.call("getProductStock", [_productId]);
};

const getProductTraceabilityInfo = async (_productId: number) => {
  const contract = await getReadContract();
  return contract.call("getProductTraceabilityInfo", [_productId]);
};

const getAlert = async (_alertId: number) => {
  const contract = await getReadContract();
  return contract.call("getAlert", [_alertId]);
};

const getCatalog = async (_catalogId: number) => {
  const contract = await getReadContract();
  return contract.call("getCatalog", [_catalogId]);
};

const getContractCatalogs = async () => {
  const contract = await getReadContract();
  return contract.call("getContractCatalogs");
};

const getProductCounter = async () => {
  const contract = await getReadContract();
  return contract.call("productCounter");
};

const getCatalogCounter = async () => {
  const contract = await getReadContract();
  return contract.call("catalogCounter");
};

const getAnomalyCounter = async () => {
  const contract = await getReadContract();
  return contract.call("anomalyCounter");
};

export {
  getProduct,
  getProductStock,
  getProductTraceabilityInfo,
  getAlert,
  getCatalog,
  getContractCatalogs,
  getProductCounter,
  getCatalogCounter,
  getAnomalyCounter,
  resetReadContract,
};

// usage:
// import { getProduct, getProductStock, getProductTraceabilityInfo } from "@/services/thridWeb/contractReadInteract"
// await getProduct(PRODUCT_ID)
