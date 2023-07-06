<script setup lang="ts">
const title = ref("PrimalTrace - La esencia auténtica de tus productos, trazada con seguridad en la blockchain.");
// useHead({
  // title: "PrimalTrace",
  // meta: [{ name: 'title', content: title }],
  // titleTemplate: (titleChunk?: string) => {
  //   return titleChunk
  //     ? `${titleChunk} - La esencia auténtica de tus productos, trazada con seguridad en la blockchain.`
  //     : "PrimalTrace - La esencia auténtica de tus productos, trazada con seguridad en la blockchain.";
  // },
// });
</script>

<template>
  <v-app dark>
    <LcHeader/>
    <v-main>
      <slot />  
    </v-main>
    <LcFooter/>
  </v-app>
</template>
