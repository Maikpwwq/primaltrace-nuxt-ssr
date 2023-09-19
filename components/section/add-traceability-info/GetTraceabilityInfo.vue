<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { getProductTraceabilityInfo } from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'
import type { TraceabilityInfo } from "@/schemas/index"

const storeContract = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { contract, contractInfo, hasContract, error, errorMessage, isConnecting } = storeToRefs(storeContract) // Destructuring from a Store 
// actions can just be destructured
const { setContract, setTraceabilityInfo, setHasContract, setError, setErrorMessage, setIsConnecting, clearError, clearContract } = storeContract

const PRODUCT_ID = ref(1);
let LOAD_TRACEABILITY = ref(true);

const data: TraceabilityInfo = reactive({
  // trazabilityId: "",
  productId: PRODUCT_ID,
  action: "",
  timestamp: 0,
  actor: "",
  actorType: 1,
  actorId: "",
  metadataAction: ""
});

watchEffect(async () => {
  if (LOAD_TRACEABILITY.value && hasContract.value) {
    await getProductTraceabilityInfo(PRODUCT_ID.value).then((resp) => {
      // TODO: Puede obtener multiples registros de trazabilidad
      setTraceabilityInfo(resp)
      const trace = contractInfo.value.traceabilityInfo[1];
      console.log('getProductTraceabilityInfo', resp[1], trace)
      data.trazabilityId = trace.id;
      data.productId = trace.productId;
      data.action = trace.action;
      data.timestamp = trace.timestamp;
      data.actor = trace.actor;
      data.actorType = trace.actorType;
      data.actorId = trace.actorId;
      data.metadataAction = trace.metadataAction
      LOAD_TRACEABILITY.value = false
    })
  }
});

const handleChange = () => {
  console.log("change", LOAD_TRACEABILITY.value, hasContract.value)
  LOAD_TRACEABILITY.value = true
}

</script>
<template>
  <div id="" class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col class="pa-0" cols="10">
          <div class="text-center mx-3">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Consulta detalles acerca de Información de trazabilidad asociada con un producto del contrato
            </h2>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-9" justify="center">
        <v-col cols="10">
          <v-card class="py-4 card-shadow mb-4 text-center border rounded-sm">
            <v-card-text>
              <v-text-field v-model="PRODUCT_ID" label="Producto" variant="outlined" color="primary"
                placeholder="Id del producto" @change="handleChange"></v-text-field>
              <ul v-if="data" class="mt-1 text-start" style="list-style: none;">
                <!-- trazabilityId, productId, action, timestamp, actor, actorType, actorId, metadataAction -->
                <li>Product ID: {{ data.productId }}</li>
                <li>Id: {{ data.trazabilityId }}</li>
                <li>Acción: {{ data.action }}</li>
                <li>Fecha creación: {{ data.timestamp }}</li>
                <li>Actor ID: {{ data.actorId }}</li>
                <li>Dirección del Actor: {{ data.actor }}</li>
                <li>Tipo de Actor: {{ data.actorType }}</li>
                <li>Acción Metadata URL *opcional: {{ data.metadataAction }}</li>
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