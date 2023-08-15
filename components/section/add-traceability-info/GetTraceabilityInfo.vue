<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { getProductTraceabilityInfo } from "@/services/thridWeb/contractReadInteract";
const PRODUCT_ID = 1;
let data: any;
watchEffect(async () => {
  if (!data) {
    data = await getProductTraceabilityInfo(PRODUCT_ID)
    console.log('data', data)
  }
});
</script>
<template>
  <div id="" class="blog-component mini-spacer">
    <v-container>
      <v-row class="mt-9" justify="center">
        <v-col cols="12" md="4" sm="6">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Confirma para agregar esta Información de trazabilidad del producto al contrato
            </h2>

            <ul v-if="data">
              <li>Id: {{ data._productId }}</li>
              <li>Acción: {{ data._action }}</li>
              <li>timestamp: {{ data._timestamp }}</li>
              <li>Actor address: {{ data._actor }}</li>
              <li>ActorType: {{ data._actorType }}</li>
              <li>Actor ID: {{ data._actorId }}</li>
              <li>Acción Metadata URL *opcional: {{ data._metadataAction }}</li>
              <li>Product ID: {{ data._productId }}</li>
            </ul>
            <v-btn> Firmar trazabilidad </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
