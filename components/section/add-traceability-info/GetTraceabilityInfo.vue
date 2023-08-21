<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { getProductTraceabilityInfo } from "@/services/thridWeb/contractReadInteract";
const PRODUCT_ID = 1;

interface TraceabilityInfo {
  trazabilityId: string;
  productId: string;
  action: string;
  timestamp: string;
  actor: string;
  actorType: string;
  actorId: string;
  metadataAction?: string;
}

const data: TraceabilityInfo = reactive({
  trazabilityId: "",
  productId: "",
  action: "",
  timestamp: "",
  actor: "",
  actorType: "",
  actorId: "",
  metadataAction: ""
});

watchEffect(async () => {
  // if (!data) {}
  await getProductTraceabilityInfo(PRODUCT_ID).then((resp) => {
    // TODO: Puede obtener multiples registros de trazabilidad
    console.log('getProductTraceabilityInfo', resp[1])
    data.trazabilityId = resp[1].id;
    data.productId = resp[1].productId;
    data.action = resp[1].action;
    data.timestamp = resp[1].timestamp;
    data.actor = resp[1].actor;
    data.actorType = resp[1].actorType;
    data.actorId = resp[1].actorId;
    data.metadataAction = resp[1].metadataAction
  })
});
</script>
<template>
  <div id="" class="blog-component mini-spacer">
    <v-container>
      <v-row class="mt-9" justify="center">
        <v-col cols="12" md="4" sm="6">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Confirma para agregar esta Información de trazabilidad del producto al contrato
            </h2>

            <ul v-if="data">
              <!-- trazabilityId, productId, action, timestamp, actor, actorType, actorId, metadataAction -->
              <li>Id: {{ data.trazabilityId }}</li>
              <li>Acción: {{ data.action }}</li>
              <li>timestamp: {{ data.timestamp }}</li>
              <li>Actor address: {{ data.actor }}</li>
              <li>ActorType: {{ data.actorType }}</li>
              <li>Actor ID: {{ data.actorId }}</li>
              <li>Acción Metadata URL *opcional: {{ data.metadataAction }}</li>
              <li>Product ID: {{ data.productId }}</li>
            </ul>
            <v-btn> Firmar trazabilidad </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
