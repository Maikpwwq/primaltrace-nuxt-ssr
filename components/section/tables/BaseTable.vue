<script setup lang="ts">
// const props = defineProps(['headers']) and props.headers
// or using pure type annotations
defineProps<{
    headers?: array
    items?: array
}>()
</script>

<template>
  <v-data-table   
    :items="items"
    :headers="headers"
    item-key="name"
    items-per-page="5"
  >
  </v-data-table>
</template>
