<script setup lang="ts">
import BaseTable from "./BaseTable.vue";
const items = [
  {
    name: "African Elephant",
    productId: "Loxodonta africana",
    productDescription: "Herbivore",
    manufacturer: "Savanna, Forests",
    manufacturingDate: "Savanna, Forests",
    batchNumber: "Savanna, Forests",
    productionLocation: "Savanna, Forests",
    metadataProducto: "Savanna, Forests",
  },
];
const headers = [
  { title: "Id", value: "productId" },
  { title: "Nombre", value: "name" },
  { title: "Descripción", value: "productDescription" },
  { title: "Fabricante", value: "manufacturer" },
  { title: "Fecha de fabricación", value: "manufacturingDate" },
  { title: "Número de lote", value: "batchNumber" },
  { title: "Ubicación de producción", value: "productionLocation" },
  { title: "Metadata", value: "metadataProducto" },
];
</script>

<template>
  <div id="productsResume">
    <BaseTable :headers="headers" :items="items" />
  </div>
</template>
