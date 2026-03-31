<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWalletStore } from "@/stores";

import Display from "./Display.vue"
import Navigation from "./Navigation.vue"
import WalletError from "./WalletError.vue"

const store = useWalletStore()
const { error } = storeToRefs(store)
</script>

<template>
  <div id="conectar-wallet" class="connect-wallet">
    <Navigation />
    <div class="wallet-info">
      <Display />
    </div>
    <WalletError v-if="error" />
  </div>
</template>

<style>
.connect-wallet {
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  position: relative;
  align-items: center;
}

.connect-wallet:hover .wallet-info {
  visibility: visible !important;
}

.wallet-info {
  visibility: hidden;
  display: flex;
  flex-direction: column;
  position: absolute;
  min-height: fit-content;
}
</style>
