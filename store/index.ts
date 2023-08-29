import { defineStore } from "pinia";
import type { WalletState, MetaMaskContextData } from "@/schemas/index"

const disconnectedState: WalletState = {
  accounts: [],
  balance: "",
  chainId: "",
  privateKey: "",
};

export const useWalletStore = defineStore("wallet", {
  state: (): MetaMaskContextData => ({
    wallet: disconnectedState,
    ethersProvider: null,
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
    setEthersProvider(provider: any) {
      this.ethersProvider = provider;
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

// import { useWalletStore } from '@/store'
// const store = useWalletStore()
// but skip any action or non reactive (non ref/reactive) property
// const { wallet, hasProvider, error, errorMessage, isConnecting } = storeToRefs(store) // Destructuring from a Store 
// actions can just be destructured
// const { setWallet, setHasProvider, setError, setErrorMessage, setIsConnecting, clearError, clearWallet } = store