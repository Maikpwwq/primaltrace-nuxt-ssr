<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
// import { addTraceabilityInfo } from "@/services/thridWeb/contractWriteInteract";
// import { TRACEABILITY_INFO } from '@/data/contractVariables';
const selectProduct = () => { };
const traceabilityInfo = () => {
  console.log('traceabilityInfo', obj)
  // addTraceabilityInfo(TRACEABILITY_INFO).then((data)=>{
  //   console.log('traceabilityInfo',data)
  // })
};
const obj = reactive({
  trazabilityId: "",
  productId: "",
  action: "",
  timestamp: "",
  actor: "",
  actorType: "",
  actorId: "",
  metadataAction: ""
})

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
            <v-row class="mt-7">
              <v-col cols="12" class="py-0">
                <v-text-field label="Product" variant="outlined" color="primary"
                  placeholder="Elige un producto"></v-text-field>
                <v-btn @click="selectProduct">Seleccionar producto</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-9" justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <v-card class="card-shadow mb-4">
            <v-card-text>
              <v-text-field v-model="obj.trazabilityId" color="primary" label="ID:" variant="underlined"></v-text-field>
              <v-text-field v-model="obj.action" color="primary" label="Acción:" variant="underlined"></v-text-field>
              <v-text-field v-model="obj.timestamp" color="primary" label="Timestamp:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="obj.actor" color="primary" label="Actor address:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="obj.actorType" color="primary" label="Actor Type:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="obj.actorId" color="primary" label="Actor ID:" variant="underlined"></v-text-field>
              <v-text-field v-model="obj.metadataAction" color="primary" label="Metadata URL *opcional:"
                variant="underlined"></v-text-field>
              <v-text-field v-model="obj.productId" color="primary" label="Product ID:"
                variant="underlined"></v-text-field>
              <div class="mt-1">
                <v-btn class="bg-success mr-3 text-white" elevation="0" @click="traceabilityInfo">
                  Agregar trazabilidad </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
