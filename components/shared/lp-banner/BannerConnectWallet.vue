<script setup lang="ts">
import Web3Auth from "@/components/section/web-3-auth/Web3Auth.vue";
</script>
<template>
  <div class="banner-wrapper bg-deep-purple-lighten-1" style="min-height: auto;">
    <v-container>
      <!-- -----------------------------------------------
            Start Banner
        ----------------------------------------------- -->
      <v-row justify="center">
        <v-col cols="12" sm="10" md="6" lg="4" class="d-flex align-center justify-center">
          <div class="text-center">
            <h1 class="banner-title font-weight-bold text-white">DashBoard</h1>
            <h4 class="banner-subtitle mr-0 text-white font-weight-regular">
              Conecta tu Wallet para registrar o seleccionar un contrato inteligente donde se almacenan tus catálagos de productos, con ellos podrás agregar y consultar tu información desde cualquier lugar.
            </h4>
            <div class="mt-8">
              <!-- <ConnectWallet /> -->
              <Web3Auth />
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
