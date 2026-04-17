/**
 * IPFS Upload Service — Pinata SDK
 *
 * Uploads product and traceability metadata as JSON to IPFS via Pinata.
 * Returns the CID string for on-chain storage in metadataProducto / metadataAction fields.
 *
 * Phase 2 — Sprint 5 (SC-05)
 *
 * @example
 *   import { uploadProductMetadata } from "@/services/ipfs/ipfsUpload";
 *   const cid = await uploadProductMetadata(product);
 *   // Store cid in the contract's metadataProducto field
 */
import { PinataSDK } from "pinata";
import type { Product, TraceabilityInfo, AlertInfo } from "@/schemas/index";

// ── Lazy Singleton ──────────────────────────────────────────────────────
// Follows the same pattern as sdkPrivateInstance.js — no top-level await
let pinataInstance: PinataSDK | null = null;

const getPinata = (): PinataSDK => {
  if (!pinataInstance) {
    const config = useRuntimeConfig();
    const jwt = config.public.pinataJwt as string;
    const gateway = config.public.pinataGateway as string;

    if (!jwt) {
      throw new Error(
        "ipfsUpload: PINATA_JWT not configured in runtimeConfig.public.pinataJwt"
      );
    }

    pinataInstance = new PinataSDK({
      pinataJwt: jwt,
      pinataGateway: gateway || "",
    });
  }
  return pinataInstance;
};

// ── Upload Functions ────────────────────────────────────────────────────

/**
 * Upload full product metadata as JSON to IPFS.
 * The returned CID should be stored on-chain in the `metadataProducto` field.
 *
 * @param product - Product data to upload
 * @returns CID string (e.g., "bafkreiab...")
 */
export const uploadProductMetadata = async (
  product: Partial<Product>
): Promise<string> => {
  const pinata = getPinata();

  const payload = {
    schema: "PrimalTrace/Product/v0.5",
    uploadedAt: new Date().toISOString(),
    data: {
      productName: product.productName,
      productDescription: product.productDescription,
      manufacturer: product.manufacturer,
      manufacturingDate: product.manufacturingDate,
      batchNumber: product.batchNumber,
      productionLocation: product.productionLocation,
      productQrCode: product.productQrCode,
    },
  };

  const result = await pinata.upload.public.json(payload);
  console.log("ipfsUpload: Product metadata uploaded, CID:", result.cid);
  return result.cid;
};

/**
 * Upload traceability info metadata as JSON to IPFS.
 * The returned CID should be stored on-chain in the `metadataAction` field.
 *
 * @param trace - Traceability data to upload
 * @returns CID string
 */
export const uploadTraceabilityMetadata = async (
  trace: Partial<TraceabilityInfo>
): Promise<string> => {
  const pinata = getPinata();

  const payload = {
    schema: "PrimalTrace/TraceabilityInfo/v0.5",
    uploadedAt: new Date().toISOString(),
    data: {
      action: trace.action,
      actor: trace.actor,
      actorType: trace.actorType,
      actorId: trace.actorId,
      certificationType: trace.certificationType,
      certificationDate: trace.certificationDate,
      certificationResult: trace.certificationResult,
    },
  };

  const result = await pinata.upload.public.json(payload);
  console.log("ipfsUpload: Traceability metadata uploaded, CID:", result.cid);
  return result.cid;
};

/**
 * Upload alert info metadata as JSON to IPFS.
 *
 * @param alert - Alert data to upload
 * @returns CID string
 */
export const uploadAlertMetadata = async (
  alert: Partial<AlertInfo>
): Promise<string> => {
  const pinata = getPinata();

  const payload = {
    schema: "PrimalTrace/Alert/v0.5",
    uploadedAt: new Date().toISOString(),
    data: {
      alertTitle: alert.alertTitle,
      alertSubtitle: alert.alertSubtitle,
      alertDescription: alert.alertDescription,
      alertParam: alert.alertParam,
      conditionalTrigguer: alert.conditionalTrigguer,
      alertType: alert.alertType,
    },
  };

  const result = await pinata.upload.public.json(payload);
  console.log("ipfsUpload: Alert metadata uploaded, CID:", result.cid);
  return result.cid;
};

/**
 * Upload arbitrary JSON data to IPFS with a custom schema name.
 *
 * @param schemaName - Schema identifier (e.g., "PrimalTrace/Custom/v1")
 * @param data - JSON-serializable data object
 * @returns CID string
 */
export const uploadCustomMetadata = async (
  schemaName: string,
  data: Record<string, any>
): Promise<string> => {
  const pinata = getPinata();

  const payload = {
    schema: schemaName,
    uploadedAt: new Date().toISOString(),
    data,
  };

  const result = await pinata.upload.public.json(payload);
  console.log(`ipfsUpload: Custom metadata (${schemaName}) uploaded, CID:`, result.cid);
  return result.cid;
};
