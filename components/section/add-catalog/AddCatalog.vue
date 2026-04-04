<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { createCatalog } from "@/services/thridWeb/contractWriteInteract";
import { IconFilePlus } from "@tabler/icons-vue";
import { useNotificationStore } from "@/stores/notification";
import { ref, reactive } from "vue";

const notifyStore = useNotificationStore();
const isSubmitting = ref(false);

const handleNewCatalog = async () => {
  if (obj.catalogName === "") {
    notifyStore.notify("El nombre del catálogo es requerido", "warning");
    return;
  }
  isSubmitting.value = true;
  try {
    const data = await createCatalog(obj);
    notifyStore.notify("Catálogo creado exitosamente en la Blockchain", "success");
    // Clear form optionally
    obj.catalogName = "";
    obj.catalogDescription = "";
    obj.catalogMetadata = "";
  } catch (err: any) {
    notifyStore.notify("Error al crear catálogo: " + (err.reason || err.message), "error");
  } finally {
    isSubmitting.value = false;
  }
};

const obj = reactive({
  catalogName: "",
  // catalogId: "",
  catalogMetadata: "",
  catalogDescription: "",
});
</script>
<template>
  <div id="trackCatalog" class="blog-component mini-spacer">
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
              Agregar Catálogo de productos
            </h2>
            <p class="text-muted">
              Para agregar tus productos debes crear un nuevo catálogo de
              productos.
            </p>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="10">
          <v-card class="card-shadow mb-4 border rounded-sm">
            <v-card-text>
              <p class="my-3">
                Completa los campos para definir un nuevo catálogo
              </p>
              <v-text-field
                color="primary"
                v-model="obj.catalogName"
                label="Nombre del catálogo:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                color="primary"
                v-model="obj.catalogDescription"
                label="Descripción del catálogo:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                color="primary"
                v-model="obj.catalogMetadata"
                label="Metadata del catálogo URL:"
                variant="underlined"
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
                  @click="handleNewCatalog"
                >
                  <IconFilePlus color="white" :size="33" stroke-width="1" />
                  Definir nuevo catálogo
                </v-btn>
              </div>
            </v-card-text>
            <v-card-text>
              <p>Confirma para agregar este catálogo al contrato</p>
              <ul class="pa-4">
                <!-- "Manufacturado" "Almacenado" "Enviado a distribuidor" -->
                <li>Nombre: {{ obj.catalogName }}</li>
                <!-- <li>Catálogo ID: {{ obj.catalogId }}</li> -->
                <li>Descripción: {{ obj.catalogDescription }}</li>
                <li>Catálogo metadata URL: {{ obj.catalogMetadata }}</li>
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
