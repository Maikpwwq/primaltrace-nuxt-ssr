<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { ref, reactive } from "vue";
import { addAlerts } from "@/services/thridWeb/contractWriteInteract";
import { useWalletStore } from "@/stores";
import { useSmartContract } from "@/stores/smart-contract";
import { useNotificationStore } from "@/stores/notification";
import { storeToRefs } from "pinia";
import { TRACEABILITY_INFO } from "@/data/contractVariables";
import type { AlertInfo } from "@/schemas/index";
import { formatAddress } from "@/utils";
import { IconFilePlus } from "@tabler/icons-vue";

const storeWallet = useWalletStore();
const { wallet } = storeToRefs(storeWallet);

const storeContract = useSmartContract();
const { contractInfo } = storeToRefs(storeContract);

const notifyStore = useNotificationStore();
const isSubmitting = ref(false);
const walletActor = wallet.value?.accounts?.[0]
  ? formatAddress(wallet.value.accounts[0])
  : "";

var currentDate = new Date();
const TIMESTAMP = ref(currentDate.getTime());

const setNewAlert = async () => {
  if (obj.productId === undefined || obj.alertTitle === "") {
    notifyStore.notify("Debes seleccionar un producto y proporcionar un título de alerta.", "warning");
    return;
  }
  
  isSubmitting.value = true;
  try {
    const data = await addAlerts(obj);
    notifyStore.notify("Alerta agregada exitosamente a la Blockchain", "success");
    // clear fields optionally
  } catch (err: any) {
    notifyStore.notify("Error al agregar alerta: " + (err.reason || err.message), "error");
  } finally {
    isSubmitting.value = false;
  }
};

const obj: AlertInfo = reactive({
  alertId: 0,
  productId: undefined as unknown as number,
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
              <v-autocomplete
                v-model="obj.productId"
                :items="contractInfo.products"
                item-title="productName"
                item-value="productId"
                label="Selecciona un Producto"
                variant="outlined"
                color="primary"
                persistent-hint
                hint="Debes crear un producto primero si la lista está vacía"
                class="mb-3"
              ></v-autocomplete>
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
                  :loading="isSubmitting"
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
