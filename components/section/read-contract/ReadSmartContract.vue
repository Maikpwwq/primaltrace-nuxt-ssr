<script setup lang="ts">
import GetCatalog from "@/components/section/select-smart-contract/GetCatalog.vue";
import GetProduct from "@/components/section/add-product/GetProduct.vue";
import GetTraceabilityInfo from "@/components/section/add-traceability-info/GetTraceabilityInfo.vue";
</script>
<template>
  <div id="readContract" >
    <GetCatalog/>
    <GetProduct />
    <GetTraceabilityInfo />
  </div>
</template>