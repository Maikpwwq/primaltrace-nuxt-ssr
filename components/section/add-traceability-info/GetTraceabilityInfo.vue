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
let LOAD = ref(false);

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
  if (!LOAD) {
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
      LOAD.value = false
    })
  }
});

const handleClick = () => {
  console.log("get")
}
</script>
<template>
  <div id="" class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Confirma para agregar esta Información de trazabilidad del producto al contrato
            </h2>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-9" justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <v-card class="card-shadow mb-4 text-center">
            <v-card-text>
              <v-text-field v-model="PRODUCT_ID" label="Producto" variant="outlined" color="primary"
                placeholder="Id del producto"></v-text-field>
              <ul v-if="data">
                <!-- trazabilityId, productId, action, timestamp, actor, actorType, actorId, metadataAction -->
                <li>Product ID: {{ data.productId }}</li>
                <li>Id: {{ data.trazabilityId }}</li>
                <li>Acción: {{ data.action }}</li>
                <li>timestamp: {{ data.timestamp }}</li>
                <li>Actor address: {{ data.actor }}</li>
                <li>ActorType: {{ data.actorType }}</li>
                <li>Actor ID: {{ data.actorId }}</li>
                <li>Acción Metadata URL *opcional: {{ data.metadataAction }}</li>
              </ul>
              <v-btn @click="handleClick"> Firmar trazabilidad </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
