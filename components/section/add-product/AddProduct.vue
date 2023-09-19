<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { addProduct } from "@/services/thridWeb/contractWriteInteract";
import { PRODUCT } from '@/data/contractVariables';
import type { Product } from "@/schemas/index"

import { IconWriting } from '@tabler/icons-vue';
import { IconFilePlus } from '@tabler/icons-vue';

const CATALOG_ID = ref(1);
var currentDate = new Date();
const TIMESTAMP = ref(currentDate.getTime());

const obj: Product = reactive({
  catalogId: CATALOG_ID.value,
  productName: "",
  productDescription: "",
  manufacturer: "",
  manufacturingDate: TIMESTAMP.value,
  batchNumber: 0,
  productionLocation: "",
  metadataProducto: "",
  // traceabilityInfo: []
})

const selectCatalog = () => { };

const handleProduct = async () => {
  console.log('handleProduct', obj, PRODUCT)
  await addProduct(obj).then((data) => {
    console.log('handleProduct', data)
    // const { to, from, blockHash, blockNumber, confirmations, contractAddress, status, transactionHash } = data.receipt;
  })
}

const handleClick = () => {
  console.log("get")
}

</script>
<template>
  <div id="trackProduct" class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Agregar Productos
            </h2>
            <p class="text-muted">
              Agrega las características más sorprendentes de tu producto a la
              blockchain en poco tiempo.
              Para comenzar elige un catálogo específico de la lista desplegable.
            </p>
            <v-row class="mt-7">
              <v-text-field v-model="CATALOG_ID" label="Catalogo" variant="outlined" color="primary"
                placeholder="Elige un catalogo" :disabled="true"></v-text-field>
              <v-btn class="ms-4" style="max-height: 56px;" @click="selectCatalog">Seleccionar catálogo</v-btn>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <v-card class="card-shadow mb-4 border rounded-sm">
            <v-card-text>
              <p class="my-3">Completa los campos para definir un nuevo producto en el catálogo</p>
              <v-text-field v-model="obj.catalogId" color="primary" label="Catalogo ID:" variant="underlined"
                :disabled="true"></v-text-field>
              <v-text-field v-model="obj.manufacturingDate" color="primary" label="Fecha de fabricación:"
                variant="underlined" :disabled="true"></v-text-field>
              <v-text-field v-model="obj.productName" color="primary" label="Nombre del producto:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="obj.productDescription" color="primary" label="Descripción:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="obj.manufacturer" color="primary" label="Fabricante:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="obj.batchNumber" color="primary" label="Número de lote:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="obj.productionLocation" color="primary" label="Ubicación de producción:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="obj.metadataProducto" color="primary" label="metadataProducto:"
                variant="underlined"></v-text-field>
              <div class="mt-1">
                <v-btn class="bg-success mr-3 text-white" elevation="0" @click="handleProduct">
                  <IconFilePlus color="white" :size="33" stroke-width="1"  /> Agregar producto
                </v-btn>
              </div>
            </v-card-text>
            <v-card-text>
              <p> Confirma para agregar este producto al contrato</p>
              <ul class="pa-4">
                <!-- "Manufacturado" "Almacenado" "Enviado a distribuidor" -->
                <li>Catálogo ID: {{ obj.catalogId }}</li>
                <li>Nombre: {{ obj.productName }}</li>
                <li>Lote: {{ obj.batchNumber }}</li>
                <li>Fabricante: {{ obj.manufacturer }}</li>
                <li>Fecha fabricación: {{ obj.manufacturingDate }}</li>
                <li>Descripcion: {{ obj.productDescription }}</li>
                <li>Ubicación: {{ obj.productionLocation }}</li>
                <li>Producto metadata URL *opcional: {{ obj.metadataProducto }}</li>
              </ul>
              <v-btn @click="handleClick" class="mb-3">
                <IconWriting color="black" :size="33" stroke-width="1" /> Firmar producto
              </v-btn>
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