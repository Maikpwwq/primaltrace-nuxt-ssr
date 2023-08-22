import { defineStore } from "pinia";
import type {
  SmartContract,
  CatalogContract,
  ContractInfo,
  Catalog,
  Product,
  TraceabilityInfo,
} from "@/schemas/index";

const emptyState: CatalogContract = {
  contractAddress: "",
  catalogsId: [],
};

const emptyContractInfo: ContractInfo = {
  catalog: [],
  products: [],
  traceabilityInfo: [],
};

export const useSmartContract = defineStore("contract", {
  state: (): SmartContract => ({
    contract: emptyState,
    contractInfo: emptyContractInfo,
    hasContract: null,
    error: false,
    errorMessage: "",
    isConnecting: false,
  }),
  getters: {},
  actions: {
    // `this` is the store instance
    setContract(providedContract: CatalogContract) {
      this.contract = providedContract;
    },
    setContractInfo(providedInfo: ContractInfo) {
      this.contractInfo = providedInfo;
    },
    setHasContract(hasContract: boolean | null) {
      this.hasContract = hasContract;
    },
    setError(error: boolean) {
      this.error = error;
    },
    setErrorMessage(errorMessage: string) {
      this.errorMessage = errorMessage;
    },
    setIsConnecting(isConnecting: boolean) {
      this.isConnecting = isConnecting;
    },
    clearError() {
      this.errorMessage = "";
    },
    clearContract() {
      this.contract = emptyState;
    },
  },
});
