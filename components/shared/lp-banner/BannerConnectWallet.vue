<script setup lang="ts">
import { useWalletStore } from "@/stores";
import { storeToRefs } from "pinia";
import ConnectWallet from "@/components/section/connect-wallet/ConnectWallet.vue";

const store = useWalletStore();
const { wallet } = storeToRefs(store);
</script>
<template>
  <div class="banner-wrapper" style="min-height: auto; background-color: #607DF9">
    <v-container>
      <!-- -----------------------------------------------
            Start Banner
        ----------------------------------------------- -->
      <v-row justify="center" class="pt-6 mt-6">
        <v-col cols="12" sm="10" md="6" lg="5" class="d-flex align-center justify-center">
          <div class="text-center">
            <h1 class="banner-title font-weight-bold text-white">DashBoard</h1>
            <div v-if="wallet.accounts.length === 0">
              <h4 class="banner-subtitle text-white font-weight-regular">
                Conecta una Wallet y selecciona o registra un nuevo
                contrato inteligente.
              </h4>
              <p class="banner-message text-white font-weight-regular">
                Contrato donde almacenar tus catálogos de productos, agrega
                trazabilidad y consulta información de tus productos desde
                cualquier lugar.
              </p>
            </div>
            <div class="mt-8">
              <ConnectWallet />
            </div>
          </div>
        </v-col>
      </v-row>
      <!-- -----------------------------------------------
            End Banner
        ----------------------------------------------- -->
    </v-container>
  </div>
</template>
<style scoped>
.banner-subtitle {
  font-size: 1.5rem;
  margin: 0 1rem;
}

.banner-message {
  font-size: 1.2rem;
  margin: 0 1rem;
}
</style>