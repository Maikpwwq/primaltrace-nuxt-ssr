<script setup lang="ts">
import { watchEffect, markRaw, ref, reactive } from "vue";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import type {
  CustomChainConfig,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { ethers } from "ethers";
import { useWalletStore } from "@/store";
import { useSmartContract } from "@/store/smart-contract";
import { storeToRefs } from "pinia";
import WalletError from "./WalletError.vue";
import { formatBalance, formatAddress } from "@/utils";
import IsoLogoZkevm from "/images/polygon-zkevm/IsoLogo.svg";

import { IconWallet } from "@tabler/icons-vue";

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

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
// const { contract } = storeToRefs(storeContract) // Destructuring from a Store
// actions can just be destructured
const { clearContract } = storeContract;

const userInfo = ref({});
// const loggedIn = ref(false)
let sharedProvider: SafeEventEmitterProvider;

const user = reactive({
  userInfo,
});

const config = useRuntimeConfig();
// Get your Client ID from Web3Auth Dashboard
const WEB3AUTH_CLIENT_ID = config.public.web3authClientID; // `${import.meta.env.NUXT_WEB3AUTH_CLIENT_ID}`;

const polygonzkEVMConfig: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155, // .OTHER - "eip155" Polygon ZkEvm Mainnet: eip155:1101
  chainId: "0x5A2", // 0x89 hex of 137, polygon mainnet.
  // 044D hex of 1101 Polygon zkEVM Network.
  // 0x13881 hex of 80001 for Mumbai Testnet.
  // 05A2 hex of 1442 for zkEVM Testnet
  rpcTarget: "https://polygon-zkevm-testnet.rpc.thirdweb.com",
  // zkEVM testnet "https://rpc.public.zkevm-test.net",
  // zkEVM https://zkevm-rpc.com or https://polygon-zkevm.rpc.thirdweb.com
  // Polygon https://rpc.ankr.com/eth
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Polygon zkEVM Testnet",
  ticker: "ETH", // MATIC
  tickerName: "Ethereum",
  blockExplorer: "https://testnet-zkevm.polygonscan.com",
  // testnet: true,
};

// const openloginAdapter = new OpenloginAdapter({
//     adapterSettings: {
//         WEB3AUTH_CLIENT_ID,
//         network: "testnet",
//         uxMode: "redirect",
//     },
// });

// const web3auth = ref<Web3Auth>(new Web3Auth({
const web3auth = new Web3Auth({
  clientId: WEB3AUTH_CLIENT_ID,
  chainConfig: polygonzkEVMConfig,
});

watchEffect(async () => {
  const init = async () => {
    try {
      // Initialize within your constructor
      // const web3Auth = new Web3Auth({
      //     clientId: WEB3AUTH_CLIENT_ID,
      //     chainConfig: polygonzkEVMConfig,
      // });
      await web3auth.initModal();
      // console.log("VITE_WEB3AUTH_CLIENT_ID", WEB3AUTH_CLIENT_ID);
      sharedProvider = web3auth.provider;
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
  init();
});

const updateWallet = async (accounts?: any) => {
  if (accounts.length === 0) {
    // If there are no accounts, then the user is disconnected
    clearWallet();
    return;
  }

  // const signer = await sharedProvider.getSigner();
  // console.log("WEB3AUTH", signer)
  // const address = signer.getAddress();
  // const signer: string = await sharedProvider.request({
  //     method: "eth_getSigner",
  //     params: [accounts[0], "latest"],
  // });

  // // In v5: const balance = ethers.utils.formatEther(
  // const balance = ethers.formatEther(
  //     await sharedProvider.getBalance(address) // Balance is in wei
  // );

  const getBalance: string = await sharedProvider.request({
    method: "eth_getBalance",
    params: [accounts[0], "latest"],
  });

  const balance: string = formatBalance(getBalance);

  const chainId: string = await sharedProvider.request({
    method: "eth_chainId",
  });
  // const chainId: string = async () => {
  //     let requestChain : string = ""
  //     try {
  //         requestChain = await sharedProvider.request({
  //             method: "eth_chainId",
  //         });
  //         return ( requestChain )
  //     } catch (err){
  //         console.error(err)
  //     }
  // }

  const privateKey = "";
  // const privateKey = await sharedProvider.request({
  //     method: "private_key"
  // });

  console.log("WEB3AUTH", accounts, balance, chainId, privateKey);
  setWallet({ accounts, balance, chainId, privateKey });
};

// const getPrivateKey = async () => {
//     const privateKey = await sharedProvider.request({
//         method: "private_key"
//     });
// }

const web3AuthModal = async () => {
  try {
    setIsConnecting(true);
    clearError();
    // console.log("isConnecting", isConnecting)
    const web3authProvider: SafeEventEmitterProvider = await web3auth.connect();
    // console.log("WEB3AUTH_CLIENT_ID", WEB3AUTH_CLIENT_ID, web3authProvider);
    // Earlier in v5 provider = new ethers.providers.Web3Provider(window.ethereum)
    const ethersProvider = new ethers.providers.Web3Provider(web3authProvider); // web3auth.provider
    // const ethersProvider = new ethers.BrowserProvider(web3authProvider)
    // ethersProvider.getSigner()
    setEthersProvider(markRaw(ethersProvider));
    setWeb3Auth(web3auth);
    sharedProvider = web3authProvider;
    setHasProvider(Boolean(sharedProvider));
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

const authenticateUser = async () => {
  try {
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  } catch (error: any) {
    console.log("web3authProvider authenticateUser", error);
    setError(true);
    setErrorMessage(error.message);
  }
};

const getUserInfo = async () => {
  try {
    const getUser = await web3auth.getUserInfo();
    console.log(getUser);
    user.userInfo = getUser;
  } catch (error: any) {
    console.log("web3authProvider getUserInfo", error);
    setError(true);
    setErrorMessage(error.message);
  }
};

// const onGetPolygonKeypair = async () => {
//     try {
//         const rpc = new RPC(sharedProvider as SafeEventEmitterProvider);
//         const polygonKeypair = await rpc.getPolygonKeyPair();
//         console.log("polygonKeypair", polygonKeypair);
//     } catch (error) {
//         console.log("web3authProvider onGetPolygonKeypair", error);
//     }
// }

// const getAccounts = async () => {
//     try {
//         const rpc = new RPC(sharedProvider);
//         const userAccount = await rpc.getAccounts();
//         console.log("Address", userAccount);
//     } catch (error) {
//         console.log("web3authProvider getAccounts", error);
//     }
// }

// const getBalance = async () => {
//     try {
//         const rpc = new RPC(sharedProvider);
//         const balance = await rpc.getBalance();
//         console.log("Balance", balance);
//     } catch (error) {
//         console.log("web3authProvider getBalance", error);
//     }
// }

// const signAndSendTransaction = async () => {
//     try {
//         const rpc = new RPC(sharedProvider);
//         const result = await rpc.signAndSendTransaction();
//         console.log("Transaction ID: ", result);
//     } catch (error) {
//         console.log("web3authProvider signAndSendTransaction", error);
//     }
// }
const disableConnect = wallet && isConnecting.value ? true : false;
</script>

<template>
  <div
    className="d-flex flex-column align-center justify-center pt-6 mt-6 mb-6"
  >
    <img
      :src="IsoLogoZkevm"
      class="logo-height"
      alt="logo smartChain polygon Zkevm"
    />
    <v-btn
      v-if="wallet.accounts.length < 1"
      size="large"
      style="background-color: #00b0ff"
      flat
      class="btn text-decoration-none text-white mt-3"
      @click="web3AuthModal"
      @disabled="disableConnect"
    >
      <IconWallet color="white" :size="48" stroke-width="1" /> Conectar Wallet
    </v-btn>
    <div v-if="hasProvider && wallet.accounts.length > 0">
      <div>
        <p class="mt-3 text-white">¡Has iniciado sesión correctamente!</p>

        <!-- <p>{{address}}{{balance}}</p> -->
        <!-- <div>
                <button @click="getUserInfo" >
                    Obtener información de usuario
                </button>
                <button @click="authenticateUser" >
                    Obtener Token ID
                </button>
            </div> -->
        <!-- <div>
                <button @click="onGetPolygonKeypair" >
                    Obtener Polygon Keypair
                </button>
            </div>
            <div>
                <button @click="getAccounts" >
                    Obtener cuentas
                </button>
            </div>
            <div>
                <button @click="getBalance" >
                    Obtener Saldo
                </button>
            </div>
            <div>
                <button @click="signAndSendTransaction" >
                    Enviar transacción
                </button>
            </div> -->
      </div>
    </div>
    <WalletError />
  </div>
</template>
<style>
.logo-height {
  height: 33px;
}
</style>
