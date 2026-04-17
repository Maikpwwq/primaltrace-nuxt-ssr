/**
 * IPFS Retrieve Service — Pinata SDK
 *
 * Retrieves metadata from IPFS via the Pinata gateway.
 * Used by product/traceability read views to resolve CIDs stored on-chain.
 *
 * Phase 2 — Sprint 5 (SC-05)
 *
 * @example
 *   import { getMetadata, getGatewayUrl } from "@/services/ipfs/ipfsRetrieve";
 *   const data = await getMetadata("bafkreiab...");
 *   const url = getGatewayUrl("bafkreiab...");
 */
import { PinataSDK } from "pinata";

// ── Lazy Singleton ──────────────────────────────────────────────────────
let pinataInstance: PinataSDK | null = null;
let gatewayDomain: string = "";

const getPinata = (): PinataSDK => {
  if (!pinataInstance) {
    const config = useRuntimeConfig();
    const jwt = config.public.pinataJwt as string;
    gatewayDomain = (config.public.pinataGateway as string) || "";

    if (!jwt) {
      throw new Error(
        "ipfsRetrieve: PINATA_JWT not configured in runtimeConfig.public.pinataJwt"
      );
    }

    pinataInstance = new PinataSDK({
      pinataJwt: jwt,
      pinataGateway: gatewayDomain,
    });
  }
  return pinataInstance;
};

// ── Retrieve Functions ──────────────────────────────────────────────────

/**
 * Retrieve JSON metadata from IPFS by CID.
 *
 * @param cid - The IPFS Content Identifier
 * @returns Parsed JSON data
 */
export const getMetadata = async (cid: string): Promise<any> => {
  if (!cid || cid === "" || cid === "0x") {
    return null;
  }

  // If the CID looks like a URL, extract the CID portion
  const cleanCid = extractCid(cid);

  try {
    const pinata = getPinata();
    const response = await pinata.gateways.public.get(cleanCid);
    return response.data;
  } catch (err) {
    console.warn(`ipfsRetrieve: Failed to fetch CID ${cleanCid}`, err);
    // Fallback to public gateway
    return fetchFromPublicGateway(cleanCid);
  }
};

/**
 * Build the full gateway URL for a CID.
 * Useful for linking directly to IPFS content (e.g., images, documents).
 *
 * @param cid - The IPFS Content Identifier
 * @returns Full HTTPS URL via the configured Pinata gateway
 */
export const getGatewayUrl = (cid: string): string => {
  if (!cid || cid === "") return "";

  const cleanCid = extractCid(cid);

  // Use dedicated gateway if configured
  if (gatewayDomain) {
    return `https://${gatewayDomain}/ipfs/${cleanCid}`;
  }

  // Fallback to public IPFS gateway
  return `https://gateway.pinata.cloud/ipfs/${cleanCid}`;
};

/**
 * Check if a string looks like a valid IPFS CID.
 *
 * @param value - String to check
 * @returns true if it looks like a CID (starts with baf/Qm or is stored as gateway URL)
 */
export const isIpfsCid = (value: string): boolean => {
  if (!value || typeof value !== "string") return false;
  const clean = extractCid(value);
  return (
    clean.startsWith("baf") ||
    clean.startsWith("Qm") ||
    clean.startsWith("bafy")
  );
};

// ── Internal Helpers ────────────────────────────────────────────────────

/**
 * Extract a CID from a value that might be a raw CID, a gateway URL, or an ipfs:// URI.
 */
const extractCid = (value: string): string => {
  // ipfs:// URI
  if (value.startsWith("ipfs://")) {
    return value.replace("ipfs://", "");
  }

  // Gateway URL containing /ipfs/
  const ipfsMatch = value.match(/\/ipfs\/([a-zA-Z0-9]+)/);
  if (ipfsMatch?.[1]) {
    return ipfsMatch[1];
  }

  // Already a raw CID
  return value.trim();
};

/**
 * Fallback: fetch from public IPFS gateway if Pinata gateway fails.
 */
const fetchFromPublicGateway = async (cid: string): Promise<any> => {
  try {
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  } catch (err) {
    console.error(`ipfsRetrieve: Public gateway fallback failed for ${cid}`, err);
    return null;
  }
};
