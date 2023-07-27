export interface WalletState {
  accounts: any[];
  balance: string;
  chainId: string;
}

export interface MetaMaskContextData {
  wallet: WalletState;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  // clearError: () => void;
}
