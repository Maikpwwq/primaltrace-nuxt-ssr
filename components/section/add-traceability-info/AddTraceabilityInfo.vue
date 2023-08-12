<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
const data = "";
</script>
<template>
  <div id="trackInfo" class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Agregar Información de trazabilidad
            </h2>
            <p class="text-muted">
              Selecciona un producto específico de la lista desplegable o
              mediante un campo de búsqueda.
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-9" justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <v-card class="card-shadow mb-4">
            <v-card-text>
              <v-text-field color="primary" label="Acción:" variant="underlined"></v-text-field>
              <v-text-field color="primary" label="Actor ID:" variant="underlined"></v-text-field>
              <v-text-field color="primary" label="Metadata URL *opcional:"
                variant="underlined"></v-text-field>
              <div class="mt-1">
                <v-btn class="bg-success mr-3 text-white" elevation="0"> Agregar trazabilidad </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-9" justify="center">
        <v-col cols="12" md="4" sm="6">
          <v-row class="mt-7">
            <v-col cols="12" class="py-0">
              <v-text-field label="Product" variant="outlined" color="primary"
                placeholder="Elige un producto"></v-text-field>
            </v-col>
          </v-row>
          <ul>
            <!-- "Manufacturado" "Almacenado" "Enviado a distribuidor" -->
            <li>Acción: {{ data }}</li>
            <li>Actor ID: </li>
            <li>Metadata URL * opcional: </li>
          </ul>
          <v-btn> Agregar trazabilidad </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>
