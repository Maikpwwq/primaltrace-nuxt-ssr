import sdk from "@/services/thridWeb/sdkInstance.js";
import ABI_CATALOG from "@/services/thridWeb/implementationAbi.json";
import { deployAddress } from "@/components/section/register-smart-contract/SmartContractRegister.vue";

// Lazy-initialized contract instance — only connects when first needed
let readContract: any = null;

const DEFAULT_CONTRACT_ADDRESS = "0x337e858c4465dfef88af8d66baf95842b9b579df";

const getReadContract = async () => {
  if (!readContract) {
    const address = deployAddress?.value || DEFAULT_CONTRACT_ADDRESS;
    console.log("contractReadInteract: initializing with address", address);
    try {
      readContract = await sdk.getContract(address, ABI_CATALOG);
    } catch (error) {
      console.error("contractReadInteract: failed to connect", error);
      throw error;
    }
  }
  return readContract;
};

/**
 * Resets the cached contract instance.
 * Call this when the user deploys or selects a new contract address.
 */
const resetReadContract = () => {
  readContract = null;
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
