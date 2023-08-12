<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
const data = "";
</script>
<template>
  <div id="trackProduct" class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Agregar Productos
            </h2>
            <p class="text-muted">
              Agrega las características más sorprendentes de tu producto a la
              blockchain en poco tiempo.
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <v-card class="card-shadow mb-4">
            <v-card-text>
              <v-text-field v-model="productoID" color="primary" label="Producto ID:" variant="underlined"></v-text-field>
              <v-text-field v-model="productName" color="primary" label="Nombre del producto:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="descripción" color="primary" label="Descripción:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="fabricante" color="primary" label="Fabricante:" variant="underlined"></v-text-field>
              <v-text-field v-model="datefabricación" color="primary" label="Fecha de fabricación:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="numberLote" color="primary" label="Número de lote:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="ubicaciónProducción" color="primary" label="Ubicación de producción:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="metadataProducto" color="primary" label="metadataProducto:"
                variant="underlined"></v-text-field>
              <div class="mt-1">
                <v-btn class="bg-success mr-3 text-white" elevation="0"> Agregar producto </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-9" justify="center">
        <v-col cols="12" md="4" sm="6">
          <ul>
            <li>Producto ID: {{ data }}</li>
            <li>Nombre del producto: </li>
            <li>Descripción: </li>
            <li>Fabricante: </li>
            <li>Fecha de fabricación: </li>
            <li>Número de lote: </li>
            <li>Ubicación de producción: </li>
            <li>MetadataProducto: </li>
          </ul>
          <v-btn> Agregar producto </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>
