<script setup lang="ts">
// const props = defineProps(['headers']) and props.headers
// or using pure type annotations
defineProps<{
    headers?: Array<any>
    items?: Array<any>
}>()
</script>

<template>
  <v-data-table   
    :items="items"
    :headers="headers"
    item-key="name"
    items-per-page="5"
    class="py-5"
  >
  </v-data-table>
</template>
