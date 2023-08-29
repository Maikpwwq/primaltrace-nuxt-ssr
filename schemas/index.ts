// Update wallet information
export interface WalletState {
  accounts: any[];
  balance: string;
  chainId: string;
  privateKey: string;
}

export interface MetaMaskContextData {
  wallet: WalletState;
  ethersProvider: any | null;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  // clearError: () => void;
}

// Read smart contract
export interface SmartContract {
  contract: CatalogContract;
  contractInfo: ContractInfo;
  hasContract: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
}

export interface CatalogContract {
  contractAddress: string;
  catalogsId: any[];
}

export interface ContractInfo {
  catalog: any[];
  products: any[];
  traceabilityInfo: any[];
}

export interface Catalog {
  catalogId?: number;
  catalogName: string;
  catalogDescription: string;
  catalogMetadata: string;
  products?: any[];
}

export interface Product {
  productId?: number;
  catalogId?: number;
  productName: string;
  productDescription: string;
  manufacturer: string;
  manufacturingDate: number;
  batchNumber: number;
  productionLocation: string;
  metadataProducto: string;
  traceabilityInfo?: any[];
}

export interface TraceabilityInfo {
  trazabilityId?: string;
  productId: number;
  action: string;
  timestamp: number;
  actor: string;
  actorType: number;
  actorId: string;
  metadataAction?: string;
}
