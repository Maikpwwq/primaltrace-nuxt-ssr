<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import GetProduct from "./GetProduct.vue";
import { addProduct } from "@/services/thridWeb/contractWriteInteract";
import { PRODUCT } from '@/data/contractVariables';
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
              <v-text-field color="primary" label="Producto ID:" variant="underlined"></v-text-field>
              <v-text-field color="primary" label="Nombre del producto:" variant="underlined"></v-text-field>
              <v-text-field color="primary" label="Descripción:" variant="underlined"></v-text-field>
              <v-text-field color="primary" label="Fabricante:" variant="underlined"></v-text-field>
              <v-text-field color="primary" label="Fecha de fabricación:" variant="underlined"></v-text-field>
              <v-text-field color="primary" label="Número de lote:" variant="underlined"></v-text-field>
              <v-text-field color="primary" label="Ubicación de producción:" variant="underlined"></v-text-field>
              <v-text-field color="primary" label="metadataProducto:" variant="underlined"></v-text-field>
              <div class="mt-1">
                <v-btn class="bg-success mr-3 text-white" elevation="0" @click="addProduct(PRODUCT)"> 
                  Agregar producto
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <GetProduct />
    </v-container>
  </div>
</template>
