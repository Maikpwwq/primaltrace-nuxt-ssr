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
            BlockTimeline
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-4" justify="center">
      <v-col cols="10">
        <p>
          Revisa la evolución cronológica de un proceso, tarea o flujo de trabajo. También puedes usarlo para mostrar fechas históricas.
        </p>
        <!-- TODO: Create a timeline of blocks that organize in rows from left to right -->
        <v-row class="ma-6" justify="left">
          <div class="pa-3 bg-green">Verde </div>
          <div class="pa-3 bg-red">Rojo</div>
          <div class="pa-3 bg-orange">Naranja</div>
          <div class="pa-3 bg-yellow">Amarillo</div>
          <div class="pa-3 bg-purple">Morado</div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>