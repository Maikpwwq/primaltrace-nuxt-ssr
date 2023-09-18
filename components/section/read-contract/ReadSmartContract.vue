<script setup lang="ts">
import GetCatalog from "@/components/section/add-catalog/GetCatalog.vue";
import GetProduct from "@/components/section/add-product/GetProduct.vue";
import GetTraceabilityInfo from "@/components/section/add-traceability-info/GetTraceabilityInfo.vue";

import SelectCatalog from "@/components/section/add-catalog/SelectCatalog.vue";
</script>
<template>
  <div id="readContract">
    <!-- <SelectCatalog /> -->
    <GetCatalog />
    <GetProduct />
    <GetTraceabilityInfo />
  </div>
</template>