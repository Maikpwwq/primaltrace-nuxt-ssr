<script setup lang="ts">
import BaseTable from './BaseTable.vue';

const items = [
  {
    name: "African Elephant",
    catalogDescription: "Loxodonta africana",
    catalogMetadata: "Herbivore",
  },
];

const headers = [
  { title: 'Nombre', value: 'name' },
  { title: 'Descripción', value: 'catalogDescription' },
  { title: 'Metadata', value: 'catalogMetadata' },
//   {
//     title: 'Full Name',
//     key: 'fullName',
//     value: item => `${item.name.first} ${item.name.last}`,
//   },
]
</script>

<template>
  <div id="catalogsResume">
    <BaseTable :headers="headers" :items="items"/>
  </div>
</template>