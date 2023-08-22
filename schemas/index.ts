// Update wallet information
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
  catalogId: string;
  catalogName: string;
  catalogDescription: string;
  metadataCatalog: string;
  products: any[];
}

export interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  manufacturer: string;
  manufacturingDate: string;
  batchNumber: string;
  productionLocation: string;
  metadataProducto: string;
  traceabilityInfo: any[];
}

export interface TraceabilityInfo {
  trazabilityId: string;
  productId: string;
  action: string;
  timestamp: string;
  actor: string;
  actorType: string;
  actorId: string;
  metadataAction?: string;
}
