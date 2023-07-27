<script setup lang="ts">
import Display from "./Display.vue"
import Navigation from "./Navigation.vue"
import WalletError from "./WalletError.vue"
</script>

<template>
  <div id="conectar-wallet" class="connect-wallet">
    <Navigation />
    <div class="wallet-info">
      <Display />
    </div>
    <WalletError />
  </div>
</template>

<style>
.connect-wallet {
  display: flex;
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
