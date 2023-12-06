<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import BaseTable from "./BaseTable.vue";
import { useSmartContract } from "@/store/smart-contract";
import { storeToRefs } from "pinia";

const headers = [
  { title: "Nombre", value: "name" },
  { title: "Descripción", value: "catalogDescription" },
  { title: "#Productos", value: "catalog#Products" },
  { title: "Metadata", value: "catalogMetadata" },
  //   {
  //     title: 'Full Name',
  //     key: 'fullName',
  //     value: item => `${item.name.first} ${item.name.last}`,
  //   },
];

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
const { contractInfo } = storeToRefs(storeContract); // Destructuring from a Store

// TODO: map all catalogInfo registers
console.log("catalogInfo", contractInfo.value.catalog);
const catalogs = contractInfo.value?.catalog;
const items: Array<object> = reactive([
  {
    name: catalogs[1],
    catalogDescription: catalogs[2],
    catalogProducts: catalogs[4]?.length,
    catalogMetadata: catalogs[5],
  },
]);
</script>

<template>
  <div id="catalogsResume" class="py-5">
    <v-row justify="center">
      <v-col class="pa-0" cols="10">
        <div class="text-center mx-3">
          <h2 class="section-title font-weight-medium">
            <img
              :src="Polygon"
              class="logo-height"
              alt="logo smartChain polygon"
            />
            Consulta detalles de los catálogos del contrato
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-9" justify="center">
      <v-col cols="10">
        <div v-if="contractInfo.catalog?.length > 0">
          <BaseTable :headers="headers" :items="items" />
        </div>
        <div v-if="contractInfo.catalog?.length === 0">
          Aun no hay registrado ningun catalogo en este contrato inteligente
        </div>
      </v-col>
    </v-row>
  </div>
</template>
