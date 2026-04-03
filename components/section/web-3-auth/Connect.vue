<script setup lang="ts">
import Display from "./Display.vue";
import { storeToRefs } from "pinia";
import { useWalletStore } from "@/stores";
import { useSmartContract } from "@/stores/smart-contract";
import { IconCurrencyEthereum, IconOutbound, IconFileAnalytics, IconHistory } from "@tabler/icons-vue";

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
  <template v-if="hasProvider && wallet.accounts.length > 0">
    <li class="nav-item connect-wallet-item">
      <div class="nav-link d-md-flex align-center pb-0 pt-2 pt-md-0 cursor-pointer">
        <IconCurrencyEthereum color="white" :size="33" stroke-width="1" class="mr-1" />
      </div>
      <span class="wallet-info">
        <Display />
      </span>
    </li>

    <li class="nav-item">
      <NuxtLink to="/deployedContracts" class="nav-link d-md-flex align-center text-white">
        <IconFileAnalytics color="white" :size="33" stroke-width="1" class="mr-2" />
        Contratos Desplegados
      </NuxtLink>
    </li>

    <li class="nav-item">
      <NuxtLink to="/blocktimeline" class="nav-link d-md-flex align-center text-white">
        <IconHistory color="white" :size="33" stroke-width="1" class="mr-2" />
        BlockTimeline
      </NuxtLink>
    </li>

    <li class="nav-item d-flex align-center ml-md-3 mt-3 mt-md-0 pb-3 pb-md-0">
      <v-btn
        class="text-decoration-none text-white px-4"
        @click="logout"
        size="small"
        style="background-color: #00b0ff; border-radius: 8px;"
        flat
      >
        <IconOutbound class="mr-1" size="20" /> Cerrar sesión
      </v-btn>
    </li>
  </template>
</template>

<style scoped>
.connect-wallet-item {
  position: relative;
  display: flex;
  align-items: center;
}

.connect-wallet-item:hover .wallet-info {
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
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  z-index: 99;
  transition: all 0.2s ease-in-out;
}

@media (max-width: 952px) {
  .wallet-info {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    margin-top: 16px;
    visibility: visible;
    opacity: 1;
  }
}
</style>
