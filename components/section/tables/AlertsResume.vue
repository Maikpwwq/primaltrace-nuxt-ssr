<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import BaseTable from "./BaseTable.vue";
import { useSmartContract } from "@/store/smart-contract";
import { storeToRefs } from "pinia";

const headers = [
  { title: "Id", value: "alertId" },
  { title: "Product ID", value: "productId" },
  { title: "Trazabilidad Id", value: "traceabilityId" },
  { title: "Tipo de alerta", value: "alertType" },
  { title: "Titulo", value: "alertTitle" },
  { title: "Subtitulo", value: "alertSubtitle" },
  { title: "Descripción", value: "alertDescription" },
  { title: "Parametro de la alerta", value: "alertParam" },
  { title: "Condición de alerta", value: "conditionalTrigguer" },
  { title: "Reporto", value: "reportedBy" },
  { title: "Alerta resuelta", value: "resolved" },
  { title: "Fecha de alerta", value: "timestamp" },
];

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
const { contractInfo } = storeToRefs(storeContract); // Destructuring from a Store

// TODO: map all traceabilityInfo registers
console.log("AlertsInfo", contractInfo.value.alerts[1]);
const alertas = contractInfo.value.alerts[1];
const items: Array<object> = reactive([
  {
    id: alertas[0],
    productId: alertas[1],
    trazabilityId: alertas[2],
    alertType: alertas[3],
    alertTitle: alertas[2],
    alertSubtitle: alertas[4],
    alertDescription: alertas[6],
    alertParam: alertas[5],
    conditionalTrigguer: alertas[7],
    reportedBy: alertas[2],
    resolved: alertas[8],
    timestamp: alertas[9],
  },
]);

const selectProduct = () => {};
const PRODUCT_ID = ref(1);
</script>

<template>
  <div id="alertsResume" class="py-5">
    <v-row justify="center">
      <v-col class="pa-0" cols="10">
        <div class="text-center mx-3">
          <h2 class="section-title font-weight-medium">
            <img
              :src="Polygon"
              class="logo-height"
              alt="logo smartChain polygon"
            />
            Consulta toda la información de las alertas relacionadas con un
            producto del catalogo
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-9" justify="center">
      <v-col cols="10">
        <p class="text-muted">
          Antes de poder consultar sus alertas primero selecciona un producto
          específico de la lista desplegable.
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
        <div v-if="contractInfo.alerts?.length > 0">
          <BaseTable :headers="headers" :items="items" />
        </div>
        <div v-if="contractInfo.alerts?.length === 0">
          Aun no hay registros de alertas que se hallan asociado con este
          producto.
        </div>
      </v-col>
    </v-row>
  </div>
</template>
