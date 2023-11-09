<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { ref, reactive } from "vue";
import { getProduct } from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'
import type { Product } from "@/schemas/index"

const store = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { contract, contractInfo, hasContract, error, errorMessage, isConnecting } = storeToRefs(store) // Destructuring from a Store 
// actions can just be destructured
const { setContract, setProductsInfo, setHasContract, setError, setErrorMessage, setIsConnecting, clearError, clearContract } = store

const PRODUCT_ID = ref(1);
let LOAD_PRODUCT = ref(true);

const data: Product = reactive({
  // catalogId: "",
  productId: PRODUCT_ID.value,
  productName: "",
  productDescription: "",
  manufacturer: "",
  manufacturingDate: 0,
  batchNumber: 0,
  productionLocation: "",
  metadataProducto: "",
  traceabilityInfo: [],
});

watchEffect(async () => {
  if (LOAD_PRODUCT.value && hasContract.value) {
    await getProduct(PRODUCT_ID.value).then((resp) => {
      // TODO: Puede obtener multiples registros de productos
      setProductsInfo(resp)
      console.log('getProduct', resp)
      const trace = contractInfo.value.products;
      data.productId = trace[0]._hex;
      data.productName = trace[1];
      data.productDescription = trace[2];
      data.manufacturer = trace[3];
      data.manufacturingDate = trace[4]._hex;
      data.batchNumber = trace[5];
      data.productionLocation = trace[6];
      data.metadataProducto = trace[7];
      LOAD_PRODUCT.value = false
    })
  }
});

const handleChange = () => {
  console.log("change", LOAD_PRODUCT.value, hasContract.value)
  LOAD_PRODUCT.value = true
}

</script>
<template>
  <div id="" class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col class="pa-0" cols="10">
          <div class="text-center mx-3">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Consulta detalles de un producto del contrato
            </h2>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-9" justify="center">
        <v-col cols="10">
          <v-card class="py-4 card-shadow mb-4 text-center border rounded-sm">
            <v-card-text>
              <v-text-field v-model="PRODUCT_ID" label="Producto" variant="outlined" color="primary"
                placeholder="Id del producto" @change="handleChange"></v-text-field>
              <ul v-if="data && data?.productId" class="mt-1 text-start" style="list-style: none;">
                <!-- productId, productName, productDescription, manufacturer, manufacturingDate, batchNumber, productionLocation, metadataProducto  -->
                <li>Producto Id: {{ data.productId }}</li>
                <li>Nombre: {{ data.productName }}</li>
                <li>Descripción: {{ data.productDescription }}</li>
                <li>Fabricante: {{ data.manufacturer }}</li>
                <li>Fecha de fabricación: {{ data.manufacturingDate }}</li>
                <li>Número de lote: {{ data.batchNumber }}</li>
                <li>Ubicación de producción: {{ data.productionLocation }}</li>
                <li>MetadataProducto: {{ data.metadataProducto }}</li>
              </ul>

            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style>
.logo-height {
  height: 33px;
}
</style>