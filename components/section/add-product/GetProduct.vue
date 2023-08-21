<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { getProduct } from "@/services/thridWeb/contractReadInteract";
const PRODUCT_ID = 1;

interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  manufacturer: string;
  manufacturingDate: string;
  batchNumber: string;
  productionLocation: string;
  metadataProducto: string;
}

const data: Product = reactive({
  productId: "",
  productName: "",
  productDescription: "",
  manufacturer: "",
  manufacturingDate: "",
  batchNumber: "",
  productionLocation: "",
  metadataProducto: "",
});

watchEffect(async () => {
  // if (!data) {}
  await getProduct(PRODUCT_ID).then((resp) => {
    // TODO: Puede obtener multiples registros de productos
    console.log('getProduct', resp[1])
    data.productId = resp[0]._hex;
    data.productName = resp[1];
    data.productDescription = resp[2];
    data.manufacturer = resp[3];
    data.manufacturingDate = resp[4]._hex;
    data.batchNumber = resp[5];
    data.productionLocation = resp[6];
    data.metadataProducto = resp[7];
  })
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
            <ul v-if="data && data?.productId">
              <!-- productId, productName, productDescription, manufacturer, manufacturingDate, batchNumber, productionLocation, metadataProducto  -->
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
