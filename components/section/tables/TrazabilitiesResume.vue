<script setup lang="ts">
import BaseTable from './BaseTable.vue';
const items = [
  {
    productId: "123",
    trazabilityId: "321",
    action: "African Elephant",
    species: "Loxodonta africana",
    timestamp: "Herbivore",
    actorId: "Savanna, Forests",
    actor: "Savanna, Forests",
    actorType: "Savanna, Forests",
    metadataAction: "Savanna, Forests",
  },
];
const headers = [
  { title: 'Id', value: 'trazabilityId' },
  { title: 'Id de producto', value: 'productId' },
  { title: 'Acción', value: 'action' },
  { title: 'Fecha creación', value: 'timestamp' },
  { title: 'Actor ID', value: 'actorId' },
  { title: 'Dirección del Actor', value: 'actor' },
  { title: 'Tipo de Actor', value: 'actorType' },
  { title: 'Metadata', value: 'metadataAction' },
]
</script>

<template>
  <div id="trazabilitiesResume">
    <BaseTable :headers="headers" :items="items"/>
  </div>
</template>