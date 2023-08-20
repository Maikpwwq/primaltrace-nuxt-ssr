<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { getProduct } from "@/services/thridWeb/contractReadInteract";
const PRODUCT_ID = 1;
let data: any;
watchEffect(async () => {
  if (!data) {
    // data = getProduct(PRODUCT_ID)
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
              Confirma para agregar este producto al contrato
            </h2>
            <ul v-if="data">
              <li>Producto Id: {{ data.productId }}</li>
              <li>Nombre del producto: {{ data.productName }}</li>
              <li>Descripción: {{ data.productDescription }}</li>
              <li>Fabricante: {{ data.manufacturer }}</li>
              <li>Fecha de fabricación: {{ data.manufacturingDate }}</li>
              <li>Número de lote: {{ data.batchNumber }}</li>
              <li>Ubicación de producción: {{ data.productionLocation }}</li>
              <li>MetadataProducto: {{ data.metadataProducto }}</li>
            </ul>
            <v-btn> Firmar producto </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
