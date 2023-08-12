<script setup lang="ts">
import { watchEffect } from "vue";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, CustomChainConfig, SafeEventEmitterProvider, RPC } from "@web3auth/base";
import { ethers } from "ethers";

const userInfo = ref({})
const loggedIn = ref(false)
let sharedProvider: SafeEventEmitterProvider;

const user = reactive({
    loggedIn,
    userInfo,
})

const config = useRuntimeConfig();
// Get your Client ID from Web3Auth Dashboard
const WEB3AUTH_CLIENT_ID = config.public.web3AuthClientID; // `${import.meta.env.NUXT_WEB3AUTH_CLIENT_ID}`;

const polygonzkEVMConfig: CustomChainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155, // .OTHER - "eip155" Polygon ZkEvm Mainnet: eip155:1101
    chainId: "05A2", // 0x89 hex of 137, polygon mainnet. 
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
            if (web3auth.connected) {
                loggedIn.value = true;
            }
        } catch (error) {
            console.log("web3authConnect", error);
        }
    }
    init()
});

const web3AuthModal = async () => {
    try {
        const web3authProvider: SafeEventEmitterProvider = await web3auth.connect()
        console.log("WEB3AUTH_CLIENT_ID", WEB3AUTH_CLIENT_ID, web3authProvider);
        // Earlier in v5 provider = new ethers.providers.Web3Provider(window.ethereum)
        // const ethersProvider = new ethers.providers.Web3Provider(web3authProvider); // web3auth.provider
        // const ethersProvider = new ethers.BrowserProvider(web3authProvider)
        sharedProvider = web3authProvider
        loggedIn.value = true;
        console.log("loggedIn", loggedIn)
        // const signer = await sharedProvider.getSigner();
        // console.log("WEB3AUTH", signer)
        // const address = signer.getAddress();
        // // In v5: const balance = ethers.utils.formatEther(
        // const balance = ethers.formatEther(
        //     await sharedProvider.getBalance(address) // Balance is in wei
        // );
        // console.log("WEB3AUTH", address, balance)
    } catch (error) {
        console.log("web3authProvider", error);
    }
};

const authenticateUser = async () => {
    try {
        const idToken = await web3auth.authenticateUser();
        console.log(idToken);
    } catch (error) {
        console.log("web3authProvider authenticateUser", error);
    }
}

const getUserInfo = async () => {
    try {
        const getUser = await web3auth.getUserInfo();
        console.log(getUser);
        user.userInfo = getUser
    } catch (error) {
        console.log("web3authProvider getUserInfo", error);
    }
}

const logout = async () => {
    try {
        await web3auth.logout();
        loggedIn.value = false;
        sharedProvider = null;
        console.log('logout');
    } catch (error) {
        console.log("web3authProvider logout", error);
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

</script>

<template>
    <div className="flex mb-6">
        <v-btn v-if="!loggedIn" class="btn bg-white text-decoration-none text-dark" @click="web3AuthModal">Conecta Web3
            Wallet</v-btn>
        <div v-if="loggedIn">
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
    </div>
</template>