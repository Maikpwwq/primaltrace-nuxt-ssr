<script setup lang="ts">
import Display from "./Display.vue";
import { storeToRefs } from "pinia";
import { useWalletStore } from "@/stores";
import { useSmartContract } from "@/stores/smart-contract";
import { IconCurrencyEthereum } from "@tabler/icons-vue";
import { IconOutbound } from "@tabler/icons-vue";

const store = useWalletStore();
// but skip any action or non reactive (non ref/reactive) property
const {
  wallet,
  ethersProvider,
  web3Auth,
  hasProvider,
  error,
  errorMessage,
  isConnecting,
} = storeToRefs(store); // Destructuring from a Store
// actions can just be destructured
const {
  setWallet,
  setEthersProvider,
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

const logout = async () => {
  try {
    await web3Auth.value.logout();
    setIsConnecting(false);
    clearWallet();
    clearContract();
    setEthersProvider(null);
    console.log("logout");
  } catch (error: any) {
    console.log("web3authProvider logout", error);
    setError(true);
    setErrorMessage(error.message);
  }
};
</script>

<template>
  <div
    class="connect-wallet d-flex flex-column flex-md-row align-center mx-md-3"
    v-if="hasProvider && wallet.accounts.length > 0"
  >
    <li class="nav-item">
      <div class="nav-link d-md-flex align-center pb-0 pt-3 pt-md-0">
        <IconCurrencyEthereum class="mr-1 text-white" />
      </div>
    </li>

    <li class="nav-item">
      <NuxtLink to="/deployedContracts" class="nav-link d-md-flex align-center">
        Contratos Desplegados
      </NuxtLink>
    </li>

    <li class="nav-item">
      <NuxtLink to="/blocktimeline" class="nav-link d-md-flex align-center">
        BlockTimeline
      </NuxtLink>
    </li>

    <li class="nav-item d-flex align-center ml-md-3 mt-3 mt-md-0">
      <v-btn
        class="text-decoration-none text-white"
        @click="logout"
        size="small"
        style="background-color: #00b0ff; border-radius: 8px;"
        flat
      >
        <IconOutbound class="mr-1" size="20" /> Cerrar sesión
      </v-btn>
    </li>

    <span class="wallet-info">
      <Display />
    </span>
  </div>
</template>

<style scoped>
.connect-wallet {
  position: relative;
  min-height: fit-content;
}

.connect-wallet:hover .wallet-info {
  visibility: visible !important;
  opacity: 1;
}

.wallet-info {
  visibility: hidden;
  opacity: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  z-index: 99;
  transition: all 0.2s ease-in-out;
}

@media (max-width: 952px) {
  .wallet-info {
    position: relative;
    top: auto;
    right: auto;
    margin-top: 16px;
    visibility: visible;
    opacity: 1;
  }
}
</style>
