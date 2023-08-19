<script setup lang="ts">
import { watchEffect } from "vue";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, CustomChainConfig, SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";
import { useWalletStore } from '@/store'
import { storeToRefs } from 'pinia'
import Display from "./Display.vue"
import WalletError from "./WalletError.vue"
import { formatBalance, formatAddress } from "@/utils";


const store = useWalletStore()
// but skip any action or non reactive (non ref/reactive) property
const { wallet, hasProvider, error, errorMessage, isConnecting } = storeToRefs(store) // Destructuring from a Store 
// actions can just be destructured
const { setWallet, setHasProvider, setError, setErrorMessage, setIsConnecting, clearError, clearWallet } = store

const userInfo = ref({})
// const loggedIn = ref(false)
let sharedProvider: SafeEventEmitterProvider;

const user = reactive({
    userInfo,
})

const config = useRuntimeConfig();
// Get your Client ID from Web3Auth Dashboard
const WEB3AUTH_CLIENT_ID = config.public.web3AuthClientID; // `${import.meta.env.NUXT_WEB3AUTH_CLIENT_ID}`;

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
    ticker: "MATIC",
    tickerName: "Matic",
    blockExplorer: "https://testnet-zkevm.polygonscan.com",
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
            console.log("VITE_WEB3AUTH_CLIENT_ID", WEB3AUTH_CLIENT_ID);
            sharedProvider = web3auth.provider;
            setHasProvider(Boolean(sharedProvider))
            if (web3auth.connected) {
                setIsConnecting(true);
            }
        } catch (error: any) {
            console.log("web3authConnect", error);
            setError(true)
            setErrorMessage(error.message)
        }
    }
    init()
});

const updateWallet = async (accounts?: any) => {

    if (accounts.length === 0) {
        // If there are no accounts, then the user is disconnected
        clearWallet()
        return
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

    const balance: string = formatBalance(
        await sharedProvider.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
        }),
    );

    const chainId: string = await sharedProvider.request({
        method: "eth_chainId",
    });

    console.log("WEB3AUTH", accounts, balance, chainId)
    setWallet({ accounts, balance, chainId })
};

const web3AuthModal = async () => {
    try {
        setIsConnecting(true);
        clearError();
        console.log("isConnecting", isConnecting)
        const web3authProvider: SafeEventEmitterProvider = await web3auth.connect()
        console.log("WEB3AUTH_CLIENT_ID", WEB3AUTH_CLIENT_ID, web3authProvider);
        // Earlier in v5 provider = new ethers.providers.Web3Provider(window.ethereum)
        // const ethersProvider = new ethers.providers.Web3Provider(web3authProvider); // web3auth.provider
        // const ethersProvider = new ethers.BrowserProvider(web3authProvider)
        sharedProvider = web3authProvider
        setHasProvider(Boolean(sharedProvider))
        const accounts = await sharedProvider.request({
            method: "eth_accounts",
        })
        console.log("accounts", accounts)
        updateWallet(accounts);
    } catch (error: any) {
        console.log("web3authProvider", error);
        setError(true)
        setErrorMessage(error.message)
    }
    setIsConnecting(false);
};

const authenticateUser = async () => {
    try {
        const idToken = await web3auth.authenticateUser();
        console.log(idToken);
    } catch (error: any) {
        console.log("web3authProvider authenticateUser", error);
        setError(true)
        setErrorMessage(error.message)
    }
}

const getUserInfo = async () => {
    try {
        const getUser = await web3auth.getUserInfo();
        console.log(getUser);
        user.userInfo = getUser
    } catch (error: any) {
        console.log("web3authProvider getUserInfo", error);
        setError(true)
        setErrorMessage(error.message)
    }
}

const logout = async () => {
    try {
        await web3auth.logout();
        setIsConnecting(false);
        sharedProvider = null;
        console.log('logout');
    } catch (error: any) {
        console.log("web3authProvider logout", error);
        setError(true)
        setErrorMessage(error.message)
    }
}

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
const etherScan = `https://etherscan.io/address/${wallet}`;
</script>

<template>
    <div className="d-flex flex-column align-center justify-center pt-6 mt-6 mb-6">
        <v-btn v-if="wallet.accounts.length < 1" class="btn bg-white text-decoration-none text-dark" @click="web3AuthModal"
            @disabled="disableConnect">
            Conecta Web3 Wallet
        </v-btn>
        <div v-if="hasProvider && wallet.accounts.length > 0">
            <!-- <p>{{address}}{{balance}}</p> -->
            <div>
                <button @click="getUserInfo" className="card">
                    Obtener información de usuario
                </button>
            </div>
            <div>
                <button @click="authenticateUser" className="card">
                    Obtener Token ID
                </button>
            </div>
            <!-- <div>
                <button @click="onGetPolygonKeypair" className="card">
                    Obtener Polygon Keypair
                </button>
            </div>
            <div>
                <button @click="getAccounts" className="card">
                    Obtener cuentas
                </button>
            </div>
            <div>
                <button @click="getBalance" className="card">
                    Obtener Saldo
                </button>
            </div>
            <div>
                <button @click="signAndSendTransaction" className="card">
                    Enviar transacción
                </button>
            </div> -->
            <div>
                <button @click="logout" className="card">
                    Cerrar sesión
                </button>
            </div>
            <div>
                <p>¡Ha iniciado sesión correctamente!</p>
            </div>
        </div>
        <div class="connect-wallet" v-if="hasProvider && wallet.accounts.length > 0">
            <div class="flexContainer-wallet">
                <a class="text_link tooltip-bottom" :href="etherScan" target="_blank"
                    data-tooltip="Abrir en el Explorador de bloques" rel="noreferrer">
                    {{ formatAddress(wallet.accounts[0]) }}
                </a>
            </div>

            <div class="wallet-info">
                <Display />
            </div>
        </div>
        <WalletError />
    </div>
</template>
<style>
.flexContainer-wallet {
    display: flex;
    align-self: center;
    flex-direction: row;
    justify-content: center;
    min-width: calc(100vw -2em);
    gap: 0em;
    row-gap: 0em;
}

.connect-wallet {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: fit-content;
    position: relative;
    top: 30px;
}

.connect-wallet:hover .wallet-info {
    visibility: visible !important;
}

.wallet-info {
    visibility: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: fit-content;
}
</style>