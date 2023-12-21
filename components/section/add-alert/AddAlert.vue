<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { ref, reactive } from "vue";
import { addAlerts } from "@/services/thridWeb/contractWriteInteract";
import { useWalletStore } from "@/store";
import { storeToRefs } from "pinia";
import { TRACEABILITY_INFO } from "@/data/contractVariables";
import type { AlertInfo } from "@/schemas/index";
import { formatAddress } from "@/utils";
import { IconWriting } from "@tabler/icons-vue";
import { IconFilePlus } from "@tabler/icons-vue";

const storeWallet = useWalletStore();
// but skip any action or non reactive (non ref/reactive) property
const { wallet } = storeToRefs(storeWallet); // Destructuring from a Store
const walletActor =
  "0x0281be870046d1180b8071c75856f17cd15ccafc" ||
  formatAddress(wallet.value.accounts[0]);

const PRODUCT_ID = ref(1);
var currentDate = new Date();
const TIMESTAMP = ref(currentDate.getTime());

const selectProduct = () => {};

const setNewAlert = async () => {
  console.log("alertsInfo", obj, TRACEABILITY_INFO);
  await addAlerts(obj).then((data: any) => {
    console.log("alerts", data);
    // const { to, from, blockHash, blockNumber, confirmations, contractAddress, status, transactionHash } = data.receipt;
  });
};

const obj: AlertInfo = reactive({
  alertId: 0,
  productId: PRODUCT_ID.value,
  traceabilityId: 0,
  alertType: 3,
  alertTitle: "",
  alertSubtitle: "",
  alertDescription: "",
  alertParam: "",
  conditionalTrigguer: "",
  reportedBy: walletActor,
  resolved: false,
  timestamp: TIMESTAMP.value,
});

const handleClick = () => {
  console.log("get");
};
</script>
<template>
  <div id="addAlertInfo" class="blog-component mini-spacer">
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
              Agregar nueva alerta
            </h2>
            <p class="text-muted">
              Registra alertas en respuesta a niveles de resultados en
              parametros de referencia. Antes de poder agregar alertas primero
              selecciona un producto específico de la lista desplegable.
            </p>
            <v-row class="mt-7">
              <v-text-field
                v-model="PRODUCT_ID"
                label="Product"
                variant="outlined"
                color="primary"
                placeholder="Elige un producto"
                :disabled="true"
              ></v-text-field>
              <v-btn
                class="ms-4"
                style="max-height: 56px"
                @click="selectProduct"
                >Seleccionar producto</v-btn
              >
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-9" justify="center">
        <v-col cols="10">
          <v-card class="card-shadow mb-4 border rounded-sm">
            <v-card-text>
              <p class="my-3">Completa los campos para registrar una alerta</p>
              <!-- <v-text-field v-model="obj.trazabilityId" color="primary" label="ID:" variant="underlined"></v-text-field> -->
              <v-text-field
                v-model="obj.productId"
                color="primary"
                label="Product ID:"
                variant="underlined"
                :disabled="true"
              ></v-text-field>
              <v-text-field
                v-model="obj.traceabilityId"
                color="primary"
                label="Trazabilidad ID:"
                variant="underlined"
                :disabled="true"
              ></v-text-field>
              <v-text-field
                v-model="obj.timestamp"
                color="primary"
                label="Timestamp:"
                variant="underlined"
                :disabled="true"
              ></v-text-field>
              <v-text-field
                v-model="obj.alertType"
                color="primary"
                label="Tipo de alerta:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.alertTitle"
                color="primary"
                label="Titulo:"
                variant="underlined"
                :disabled="true"
              ></v-text-field>
              <v-text-field
                v-model="obj.alertSubtitle"
                color="primary"
                label="Subtitulo:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.alertDescription"
                color="primary"
                label="Descripción:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.alertParam"
                color="primary"
                label="Parametro de la alerta:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.conditionalTrigguer"
                color="primary"
                label="Condición de alerta:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.reportedBy"
                color="primary"
                label="Reporto:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.resolved"
                color="primary"
                label="Alerta resuelta:"
                variant="underlined"
                :disabled="true"
              ></v-text-field>
              <div class="mt-1">
                <v-btn class="bg-success mr-3 text-white" elevation="0">
                  <IconFilePlus color="white" :size="33" stroke-width="1" />
                  Definir nuevo campo
                </v-btn>
                <v-btn
                  class="bg-success mr-3 text-white"
                  elevation="0"
                  @click="setNewAlert"
                >
                  <IconFilePlus color="white" :size="33" stroke-width="1" />
                  Agregar alerta
                </v-btn>
              </div>
            </v-card-text>
            <v-card-text>
              <p>Confirma para agregar esta alerta al contrato</p>
              <ul class="pa-4">
                <li>Product ID: {{ obj.productId }}</li>
                <li>Trazabilidad Id: {{ obj.traceabilityId }}</li>
                <li>Tipo de alerta: {{ obj.alertType }}</li>
                <li>Titulo: {{ obj.alertTitle }}</li>
                <li>Subtitulo: {{ obj.alertSubtitle }}</li>
                <li>Descripción: {{ obj.alertDescription }}</li>
                <li>Parametro de la alerta: {{ obj.alertParam }}</li>
                <li>Condición de alerta: {{ obj.conditionalTrigguer }}</li>
                <li>Reporto: {{ obj.reportedBy }}</li>
                <li>Alerta resuelta: {{ obj.resolved }}</li>
                <li>Fecha de alerta: {{ obj.timestamp }}</li>
              </ul>
              <v-btn @click="handleClick" class="mb-3">
                <IconWriting color="black" :size="33" stroke-width="1" /> Firmar
                alerta
              </v-btn>
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
