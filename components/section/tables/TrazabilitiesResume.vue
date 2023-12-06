<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import BaseTable from "./BaseTable.vue";
import { useSmartContract } from "@/store/smart-contract";
import { storeToRefs } from "pinia";

const headers = [
  { title: "Id", value: "trazabilityId" },
  { title: "Dirección del Actor", value: "actor" },
  { title: "Tipo de Actor", value: "actorType" },
  { title: "Actor ID", value: "actorId" },
  { title: "Metadata", value: "metadataAction" },
  { title: "Id de producto", value: "productId" },
  { title: "Acción", value: "action" },
  { title: "Fecha creación", value: "timestamp" },
  { title: "Tipo de acción", value: "actionKind" },
  { title: "Resultado", value: "actionResult" },
];

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
const { contractInfo } = storeToRefs(storeContract); // Destructuring from a Store

// TODO: map all traceabilityInfo registers
console.log("traceabilityInfo", contractInfo.value.traceabilityInfo[1]);
const trazas = contractInfo.value.traceabilityInfo[1];
const items: Array<object> = reactive([
  {
    trazabilityId: trazas[0],
    actor: trazas[3],
    actorType: trazas[2],
    actorId: trazas[4],
    metadataAction: trazas[6],
    productId: trazas[5],
    action: trazas[1],
    timestamp: trazas[2],
    actionKind: trazas[6],
    actionResult: trazas[6],
  },
]);

// [
//   {
//     productId: "123",
//     trazabilityId: "321",
//     action: "African Elephant",
//     species: "Loxodonta africana",
//     timestamp: "Herbivore",
//     actorId: "Savanna, Forests",
//     actor: "Savanna, Forests",
//     actorType: "Savanna, Forests",
//     metadataAction: "Savanna, Forests",
//   },
// ];

const selectProduct = () => {};
const PRODUCT_ID = ref(1);
</script>

<template>
  <div id="trazabilitiesResume" class="py-5">
    <v-row justify="center">
      <v-col class="pa-0" cols="10">
        <div class="text-center mx-3">
          <h2 class="section-title font-weight-medium">
            <img
              :src="Polygon"
              class="logo-height"
              alt="logo smartChain polygon"
            />
            Consulta toda la información de trazabilidad asociada con un producto del catalogo
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-9" justify="center">
      <v-col cols="10">
        <p class="text-muted">
          Antes de poder consultar Información de trazabilidad primero
          selecciona un producto específico de la lista desplegable. Luego
          revisa acontecimientos importantes desde las cadenas de suministro,
          producción y distribución, tales como pruebas, certificaciones,
          resultados, entre otros.
        </p>
        <v-row class="mt-7">
          <v-text-field
            v-model="PRODUCT_ID"
            label="Product"
            variant="outlined"
            color="primary"
            placeholder="Elige un producto"
            :disabled="true"
          ></v-text-field>
          <v-btn class="ms-4" style="max-height: 56px" @click="selectProduct"
            >Seleccionar producto</v-btn
          >
        </v-row>
        <div v-if="contractInfo.traceabilityInfo?.length > 0">
          <BaseTable :headers="headers" :items="items" />
        </div>
        <div v-if="contractInfo.traceabilityInfo?.length === 0">
          Aun no hay registros de trazabilidad que se hallan asociado con este
          producto.
        </div>
      </v-col>
    </v-row>
  </div>
</template>
