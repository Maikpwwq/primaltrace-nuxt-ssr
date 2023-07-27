<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
</script>
<template>
  <div class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Agregar Productos</h2>
            <p class="text-muted">
              Agrega las características más sorprendentes de tu producto a la
              blockchain en poco tiempo.
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-9" justify="center">
        <v-col cols="12" md="4" sm="6">
          <ul>
            <li>producto ID</li>
            <li>nombre del producto</li>
            <li>descripción</li>
            <li>fabricante</li>
            <li>fecha de fabricación</li>
            <li>número de lote</li>
            <li>ubicación de producción</li>
            <li>metadataProducto</li>
          </ul>
          <v-btn> Agregar producto </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
