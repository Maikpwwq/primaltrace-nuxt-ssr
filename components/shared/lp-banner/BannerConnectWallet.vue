<script setup lang="ts">
import Polygonzkevm from "/images/polygon-zkevm/polygonzkevm.png";
</script>
<template>
  <div class="banner-wrapper bg-deep-purple-lighten-1">
    <v-container>
      <!-- -----------------------------------------------
            Start Banner
        ----------------------------------------------- -->
      <v-row justify="center">
        <v-col cols="12" sm="10" md="6" lg="4" class="d-flex align-center justify-center">
          <div class="text-center">
            <h1 class="banner-title font-weight-bold text-white">DashBoard</h1>
            <h4 class="banner-subtitle mr-0 text-white font-weight-regular">
              Registra un contrato inteligente de productos sobre los que agregar y consultar información de trazabilidad.
            </h4>
            <div class="mt-8">
              <v-btn to="#conectar-wallet" size="large" style="background-color:#00B0FF" class="text-white" flat>
                <img :src="Polygonzkevm" class="logo-height" alt="logo smartChain polygon Zkevm" />
                 Registrar SmartContract
              </v-btn>
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
