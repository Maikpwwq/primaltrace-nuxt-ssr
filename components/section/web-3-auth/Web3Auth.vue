<script setup lang="ts">
// import { watchEffect, markRaw, ref, reactive } from "vue";
// import type {
//   CustomChainConfig,
//   SafeEventEmitterProvider,
// } from "@web3auth/base";

import { useWalletStore } from "@/store";
// import { useSmartContract } from "@/store/smart-contract";
import { storeToRefs } from "pinia";
import WalletError from "./WalletError.vue";
import ConnectWalletBtn from "./ConnectWalletBtn.vue";
import IsoLogoZkevm from "/images/polygon-zkevm/IsoLogo.svg";

const store = useWalletStore();
// but skip any action or non reactive (non ref/reactive) property
const { wallet, hasProvider, error, errorMessage, isConnecting } =
  storeToRefs(store); // Destructuring from a Store
// actions can just be destructured
// const {
//   setWallet,
//   setEthersProvider,
//   setWeb3Auth,
//   setHasProvider,
//   setError,
//   setErrorMessage,
//   setIsConnecting,
//   clearError,
//   clearWallet,
// } = store;

// const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
// const { contract } = storeToRefs(storeContract) // Destructuring from a Store
// actions can just be destructured
// const { clearContract } = storeContract;

// const userInfo = ref({});
// const user = reactive({
//   userInfo,
// });
// const loggedIn = ref(false)

// watchEffect(async () => {});

// const getPrivateKey = async () => {
//     const privateKey = await sharedProvider.request({
//         method: "private_key"
//     });
// }

// const authenticateUser = async () => {
//   try {
//     const idToken = await web3auth.authenticateUser();
//     console.log(idToken);
//   } catch (error: any) {
//     console.log("web3authProvider authenticateUser", error);
//     setError(true);
//     setErrorMessage(error.message);
//   }
// };

// const getUserInfo = async () => {
//   try {
//     const getUser = await web3auth.getUserInfo();
//     console.log(getUser);
//     user.userInfo = getUser;
//   } catch (error: any) {
//     console.log("web3authProvider getUserInfo", error);
//     setError(true);
//     setErrorMessage(error.message);
//   }
// };

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
  <div
    className="d-flex flex-column align-center justify-center pt-6 mt-6 mb-6"
  >
    <img
      :src="IsoLogoZkevm"
      class="logo-height"
      alt="logo smartChain polygon Zkevm"
    />
    <ConnectWalletBtn  />
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
    <WalletError v-if="error && errorMessage"/>
  </div>
</template>
<style>
.logo-height {
  height: 33px;
}
</style>
