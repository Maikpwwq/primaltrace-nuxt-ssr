import { defineStore } from "pinia";

interface WalletState {
  accounts: any[];
  balance: string;
  chainId: string;
}

interface MetaMaskContextData {
  wallet: WalletState;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  // clearError: () => void;
}

const disconnectedState: WalletState = {
  accounts: [],
  balance: "",
  chainId: "",
};

export const useSmartContract = defineStore("smartcontract", {
  state: (): MetaMaskContextData => ({
    wallet: disconnectedState,
    hasProvider: null,
    error: false,
    errorMessage: "",
    isConnecting: false,
  }),
  getters: {},
  actions: {
    // `this` is the store instance
    setWallet(providedAccounts: WalletState) {
      this.wallet = providedAccounts;
    },
    setHasProvider(hasProvider: boolean | null) {
      this.hasProvider = hasProvider;
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
    clearWallet() {
      this.wallet = disconnectedState;
    },
  },
});
