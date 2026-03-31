<script setup lang="ts">
import { computed, markRaw } from "vue";
import { Web3Auth, CHAIN_NAMESPACES } from "@web3auth/modal";
import type { CustomChainConfig } from "@web3auth/modal";
import { useWalletStore } from "@/stores";
import { ethers } from "ethers";
import type { IProvider } from "@web3auth/base";
import { formatBalance, formatAddress } from "@/utils";
import { IconWallet } from "@tabler/icons-vue";

let sharedProvider: IProvider | null = null;

const store = useWalletStore();
// but skip any action or non reactive (non ref/reactive) property
const { wallet, hasProvider, error, errorMessage, isConnecting } =
  storeToRefs(store); // Destructuring from a Store
// actions can just be destructured
const {
  setWallet,
  setEthersProvider,
  setWeb3Auth,
  setHasProvider,
  setError,
  setErrorMessage,
  setIsConnecting,
  clearError,
  clearWallet,
} = store;

const config = useRuntimeConfig();
// Get your Client ID from Web3Auth Dashboard
const WEB3AUTH_CLIENT_ID = config.public.web3authClientID; // `${import.meta.env.NUXT_WEB3AUTH_CLIENT_ID}`;
const PRIVATE_KEY = config.public.personalAccountPrivateKey;

// ── Chain Configs ───────────────────────────────────────────────────
// Toggle this flag (or use an env variable) when the platform goes live.
const IS_PRODUCTION = false;

// Polygon zkEVM Mainnet — activate when platform is fully operative
const polygonzkEVMMainnet: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x44D", // 1101
  rpcTarget: "https://zkevm-rpc.com",
  displayName: "Polygon zkEVM",
  ticker: "ETH",
  tickerName: "Ethereum",
  blockExplorerUrl: "https://zkevm.polygonscan.com",
  logo: "https://images.toruswallet.io/polygon.svg",
};

// Polygon zkEVM Cardona Testnet — current development
const polygonzkEVMTestnet: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x5A2", // 1442
  rpcTarget: "https://polygon-zkevm-testnet.rpc.thirdweb.com",
  displayName: "Polygon zkEVM Testnet",
  ticker: "ETH",
  tickerName: "Ethereum",
  blockExplorerUrl: "https://testnet-zkevm.polygonscan.com",
  logo: "https://images.toruswallet.io/polygon.svg",
  isTestnet: true,
};

const activeChainConfig = IS_PRODUCTION ? polygonzkEVMMainnet : polygonzkEVMTestnet;

// ── Web3Auth Instance ──────────────────────────────────────────────
// web3AuthNetwork must match the project network in your Web3Auth Dashboard.
// When moving to production, create a new project on "sapphire_mainnet".
const web3auth = new Web3Auth({
  clientId: WEB3AUTH_CLIENT_ID,
  web3AuthNetwork: IS_PRODUCTION ? "sapphire_mainnet" : "sapphire_devnet",
  chains: [activeChainConfig],
  defaultChainId: activeChainConfig.chainId,
});

const init = async () => {
  try {
    await web3auth.init();
    // console.log("VITE_WEB3AUTH_CLIENT_ID", WEB3AUTH_CLIENT_ID);
    sharedProvider = web3auth.provider ?? null;
    setHasProvider(Boolean(sharedProvider));
    if (web3auth.connected) {
      setIsConnecting(true);
    }
  } catch (error: any) {
    console.log("web3authConnect", error);
    setError(true);
    setErrorMessage(error.message);
  }
};

const web3AuthModal = async () => {
  try {
    await init();
    setIsConnecting(true);
    clearError();
    // console.log("isConnecting", isConnecting)
    const web3authProvider = await web3auth.connect();
    if (!web3authProvider) {
      throw new Error("Web3Auth connection returned no provider");
    }
    // console.log("WEB3AUTH_CLIENT_ID", WEB3AUTH_CLIENT_ID, web3authProvider);
    // Earlier in v5 provider = new ethers.providers.Web3Provider(window.ethereum)
    const ethersProvider = new ethers.providers.Web3Provider(web3authProvider); // web3auth.provider
    // const ethersProvider = new ethers.BrowserProvider(web3authProvider)
    // ethersProvider.getSigner()
    setEthersProvider(markRaw(ethersProvider));
    setWeb3Auth(web3auth);
    sharedProvider = web3authProvider;
    setHasProvider(true);
    const accounts = await sharedProvider.request({
      method: "eth_accounts",
    });
    // console.log("accounts", accounts)
    updateWallet(accounts);
  } catch (error: any) {
    console.log("web3authProvider", error);
    setError(true);
    setErrorMessage(error.message);
  }
  setIsConnecting(false);
};

const updateWallet = async (accounts?: any) => {
  if (!accounts || accounts.length === 0) {
    clearWallet();
    return;
  }

  if (!sharedProvider) {
    console.error("updateWallet: provider not initialized");
    return;
  }

  const getBalance = (await sharedProvider.request({
    method: "eth_getBalance",
    params: [accounts[0], "latest"],
  })) as string;

  const balance: string = formatBalance(getBalance);

  const chainId = (await sharedProvider.request({
    method: "eth_chainId",
  })) as string;

  const privateKey = "";
  // const privateKey = await sharedProvider.request({
  //     method: "private_key"
  // });

  console.log("WEB3AUTH", accounts, balance, chainId, privateKey);
  setWallet({ accounts, balance, chainId, privateKey });
};

const disableConnect = computed(() => {
  return Boolean(wallet.value.accounts.length > 0) || isConnecting.value;
});
</script>


<template>
  <v-btn v-if="wallet.accounts.length < 1" size="large" style="background-color: #00b0ff" flat
    class="btn text-decoration-none text-white mt-3" @click="web3AuthModal" @disabled="disableConnect">
    <IconWallet color="white" :size="48" stroke-width="1" /> Conectar Wallet
  </v-btn>
</template>