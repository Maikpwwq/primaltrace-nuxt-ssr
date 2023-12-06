<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import BaseTable from "./BaseTable.vue";
import { useSmartContract } from "@/store/smart-contract";
import { storeToRefs } from "pinia";

const headers = [
  { title: "Id", value: "productId" },
  { title: "Nombre", value: "name" },
  { title: "Descripción", value: "productDescription" },
  { title: "#Rastros", value: "traceabilityInfo" },
  { title: "Fabricante", value: "manufacturer" },
  { title: "Fecha de fabricación", value: "manufacturingDate" },
  { title: "Número de lote", value: "batchNumber" },
  { title: "Ubicación de producción", value: "productionLocation" },
  { title: "Metadata", value: "metadataProducto" },
];

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
const { contractInfo } = storeToRefs(storeContract); // Destructuring from a Store

// TODO: map all productsInfo registers
console.log("productsInfo", contractInfo.value.products);
const products = contractInfo.value.products;
const items: Array<object> = reactive([
  {
    productId: products[0],
    name: products[1],
    productDescription: products[2],
    traceabilityInfo: products[8]?.length,
    manufacturer: products[3],
    manufacturingDate: products[4],
    batchNumber: products[5],
    productionLocation: products[6],
    metadataProducto: products[7],
  },
]);

// [
//   {
//     name: "TrackWise",
//     productId: "TW01",
//     productDescription: "Trazabilidad confiable apalancada por Blockchain.",
//     manufacturer: "PrimalTrace",
//     manufacturingDate: "140823",
//     batchNumber: "148",
//     productionLocation: "Bogotá, Colombia",
//     metadataProducto: "https://primaltrace-nuxt-ssr.vercel.app/#trackwise",
//   },
//   {
//     name: "TrustBlock",
//     productId: "TB02",
//     productDescription: "Autenticidad de origen respaldado por Blockchain. ",
//     manufacturer: "PrimalTrace",
//     manufacturingDate: "140823",
//     batchNumber: "148",
//     productionLocation: "Bogotá, Colombia",
//     metadataProducto: "https://primaltrace-nuxt-ssr.vercel.app/#trustblock",
//   },
// ];

const selectCatalog = () => {};
const CATALOG_ID = ref(1);
</script>

<template>
  <div id="productsResume" class="py-5">
    <v-row justify="center">
      <v-col class="pa-0" cols="10">
        <div class="text-center mx-3">
          <h2 class="section-title font-weight-medium">
            <img
              :src="Polygon"
              class="logo-height"
              alt="logo smartChain polygon"
            />
            Consulta los productos registrados en el contrato
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-9" justify="center">
      <v-col cols="10">
        <p class="text-muted">
          Para comenzar elige un catálogo específico de la lista desplegable y
          revisa las características más sorprendentes de tu producto en la
          blockchain al instante.
        </p>
        <v-row class="mt-7">
          <v-text-field
            v-model="CATALOG_ID"
            label="Catalogo"
            variant="outlined"
            color="primary"
            placeholder="Elige un catalogo"
            :disabled="true"
          ></v-text-field>
          <v-btn class="ms-4" style="max-height: 56px" @click="selectCatalog"
            >Seleccionar catálogo</v-btn
          >
        </v-row>
        <div v-if="contractInfo.products?.length > 0">
          <BaseTable :headers="headers" :items="items" />
        </div>
        <div v-if="contractInfo.products?.length === 0">
          Aun no hay registrado ningun producto para este catalogo
        </div>
      </v-col>
    </v-row>
  </div>
</template>
