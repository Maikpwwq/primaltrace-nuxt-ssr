<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { ref, reactive } from "vue";
import { addProduct } from "@/services/thridWeb/contractWriteInteract";
import type { Product } from "@/schemas/index";
import { useSmartContract } from "@/stores/smart-contract";
import { useNotificationStore } from "@/stores/notification";
import { storeToRefs } from "pinia";

import { IconFilePlus } from "@tabler/icons-vue";

const store = useSmartContract();
const { contractInfo } = storeToRefs(store);
const notifyStore = useNotificationStore();

const isSubmitting = ref(false);

const CATALOG_ID = ref<number | undefined>(undefined);
var currentDate = new Date();
const TIMESTAMP = ref(currentDate.getTime());

const obj: Product = reactive({
  catalogId: CATALOG_ID,
  productName: "",
  productDescription: "",
  manufacturer: "",
  manufacturingDate: TIMESTAMP.value,
  batchNumber: "",
  productionLocation: "",
  metadataProducto: "",
  productQrCode: "",
});

const handleProduct = async () => {
  if (obj.catalogId === undefined || obj.productName === "") {
    notifyStore.notify("Debes seleccionar un catálogo y proporcionar un nombre de producto.", "warning");
    return;
  }
  
  isSubmitting.value = true;
  try {
    const data = await addProduct(obj);
    notifyStore.notify("Producto agregado exitosamente a la Blockchain", "success");
    // Optionally reset fields here
  } catch (err: any) {
    notifyStore.notify("Error al agregar producto: " + (err.reason || err.message), "error");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
<template>
  <div id="trackProduct" class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              <img
                :src="Polygon"
                class="logo-height"
                alt="logo smartChain polygon"
              />
              Agregar Productos
            </h2>
            <p class="text-muted">
              Agrega las características más sorprendentes de tu producto a la
              blockchain en poco tiempo. Para comenzar elige un catálogo
              específico de la lista desplegable.
            </p>
            <v-row class="mt-7">
              <v-autocomplete
                v-model="obj.catalogId"
                :items="contractInfo.catalog"
                item-title="catalogName"
                item-value="catalogId"
                label="Selecciona un Catálogo"
                variant="outlined"
                color="primary"
                persistent-hint
                hint="Debes crear un catálogo primero si la lista está vacía"
                class="mb-3"
              ></v-autocomplete>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <v-card class="card-shadow mb-4 border rounded-sm">
            <v-card-text>
              <p class="my-3">
                Completa los campos para definir un nuevo producto en el
                catálogo
              </p>
              <v-text-field
                v-model="obj.catalogId"
                color="primary"
                label="Catalogo ID:"
                variant="underlined"
                :disabled="true"
              ></v-text-field>
              <v-text-field
                v-model="obj.manufacturingDate"
                color="primary"
                label="Fecha de fabricación:"
                variant="underlined"
                :disabled="true"
              ></v-text-field>
              <v-text-field
                v-model="obj.productName"
                color="primary"
                label="Nombre del producto:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.productDescription"
                color="primary"
                label="Descripción:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.manufacturer"
                color="primary"
                label="Fabricante:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.batchNumber"
                color="primary"
                label="Número de lote:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.productionLocation"
                color="primary"
                label="Ubicación de producción:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.metadataProducto"
                color="primary"
                label="Metadata URL (opcional):"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.productQrCode"
                color="primary"
                label="Código QR del producto (opcional):"
                variant="underlined"
                placeholder="URL o contenido del código QR"
              ></v-text-field>
              <div class="mt-1">
                <v-btn class="bg-success mr-3 text-white" elevation="0">
                  <IconFilePlus color="white" :size="33" stroke-width="1" />
                  Definir nuevo campo
                </v-btn>
                <v-btn
                  class="bg-success mr-3 text-white"
                  elevation="0"
                  :loading="isSubmitting"
                  @click="handleProduct"
                >
                  <IconFilePlus color="white" :size="33" stroke-width="1" />
                  Agregar producto
                </v-btn>
              </div>
            </v-card-text>
            <v-card-text>
              <p>Confirma para agregar este producto al contrato</p>
              <ul class="pa-4">
                <li>Catálogo ID: {{ obj.catalogId }}</li>
                <li>Nombre: {{ obj.productName }}</li>
                <li>Lote: {{ obj.batchNumber }}</li>
                <li>Fabricante: {{ obj.manufacturer }}</li>
                <li>Fecha fabricación: {{ obj.manufacturingDate }}</li>
                <li>Descripcion: {{ obj.productDescription }}</li>
                <li>Ubicación: {{ obj.productionLocation }}</li>
                <li>Producto metadata URL: {{ obj.metadataProducto }}</li>
                <li v-if="obj.productQrCode">Código QR: {{ obj.productQrCode }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style>
.logo-height {
  height: 33px;
}
</style>
