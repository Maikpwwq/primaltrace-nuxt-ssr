// Update wallet information
export interface WalletState {
  accounts: any[];
  balance: string;
  chainId: string;
  privateKey?: string;
}

export interface MetaMaskContextData {
  wallet: WalletState;
  ethersProvider: any | null;
  web3Auth: any | null;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  // clearError: () => void;
}

export enum AlertType {
  Noticias,
  Seguridad,
  Eventos,
  Producto,
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
  alerts: any[];
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

export interface AlertInfo {
  alertId: number;
  productId: number;
  traceabilityId: number;
  alertType: AlertType;
  alertTitle: string;
  alertSubtitle: string;
  alertDescription: string;
  alertParam: string;
  conditionalTrigguer: string;
  reportedBy: string;
  resolved: boolean;
  timestamp: number;
}
