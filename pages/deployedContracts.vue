<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <div id="" class="blog-component mini-spacer">
  <v-container>
    <v-row justify="center">
      <v-col class="pa-0 pt-4" cols="10">
        <div class="text-center mx-3">
          <h2 class="section-title font-weight-medium">
            Contratos Desplegados
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-9" justify="center">
      <v-col cols="10">
        <p>
          Verifica la lista de instancias de contrato que ha implementado o
          importado con Thirdweb en todas las redes a través del enlace.
        </p>
        <a
          href="https://thirdweb.com/dashboard/contracts/deploy"
          target="_blank"
          rel="noreferrer"
          >Obtener tus contratos</a
        >
      </v-col>
    </v-row>
  </v-container>
</div>
</template>
