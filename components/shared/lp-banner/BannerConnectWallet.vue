<script setup lang="ts">
import ConnectWallet from "@/components/section/connect-wallet/ConnectWallet.vue";
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
            <h4 class="banner-subtitle text-white font-weight-regular">
              Debes conectar una Wallet para seleccionar o registrar un nuevo
              contrato inteligente.
            </h4>
            <p class="banner-message text-white font-weight-regular">
              Contrato en donde se almacenan tus catálogos de productos. Con ellos podrás agregar trazabilidad y
              consultar
              gratuitamente información de tus productos desde cualquier lugar.
            </p>
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