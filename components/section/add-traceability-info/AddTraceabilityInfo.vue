<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { ref, reactive } from "vue";
import { addTraceabilityInfo } from "@/services/thridWeb/contractWriteInteract";
import { useWalletStore } from "@/stores";
import { useSmartContract } from "@/stores/smart-contract";
import { useNotificationStore } from "@/stores/notification";
import { storeToRefs } from "pinia";
import type { TraceabilityInfo } from "@/schemas/index";
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

const actorTypeOptions = [
  { title: "Fabricante", value: 0 },
  { title: "Distribuidor", value: 1 },
  { title: "Proveedor", value: 2 },
];

const certificationTypeOptions = [
  { title: "Ninguna", value: "" },
  { title: "ISO 9001", value: "ISO 9001" },
  { title: "ISO 22000", value: "ISO 22000" },
  { title: "HACCP", value: "HACCP" },
  { title: "FDA", value: "FDA" },
  { title: "INVIMA", value: "INVIMA" },
  { title: "BPM", value: "BPM" },
  { title: "Otra", value: "Otra" },
];

const traceabilityInfo = async () => {
  if (obj.productId === undefined || obj.action === "") {
    notifyStore.notify("Debes seleccionar un producto y registrar una acción.", "warning");
    return;
  }
  
  isSubmitting.value = true;
  try {
    const data = await addTraceabilityInfo(obj);
    notifyStore.notify("Información de trazabilidad agregada exitosamente", "success");
    // Optionally clear form
  } catch (err: any) {
    notifyStore.notify("Error al agregar trazabilidad: " + (err.reason || err.message), "error");
  } finally {
    isSubmitting.value = false;
  }
};

const obj: TraceabilityInfo = reactive({
  productId: undefined as unknown as number,
  action: "",
  actor: walletActor,
  actorType: 0,
  actorId: "",
  metadataAction: "",
  certificationType: "",
  certificationDate: 0,
  certificationResult: "",
});
</script>
<template>
  <div id="trackInfo" class="blog-component mini-spacer">
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
              Agregar Información de trazabilidad
            </h2>
            <p class="text-muted">
              Registra acontecimientos importantes desde las cadenas de
              suministro, producción y distribución, tales como pruebas,
              certificaciones, resultados, entre otros. Antes de poder agregar
              nueva Información de trazabilidad primero selecciona un producto
              específico de la lista desplegable.
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
              <p class="my-3">
                Completa los campos para registrar nueva Información de
                trazabilidad del producto
              </p>
              <!-- <v-text-field v-model="obj.trazabilityId" color="primary" label="ID:" variant="underlined"></v-text-field> -->
              <v-text-field
                v-model="obj.productId"
                color="primary"
                label="Product ID:"
                variant="underlined"
                :disabled="true"
              ></v-text-field>
              <v-text-field
                v-model="obj.actor"
                color="primary"
                label="Actor address:"
                variant="underlined"
                :disabled="true"
              ></v-text-field>
              <v-text-field
                v-model="obj.action"
                color="primary"
                label="Acción:"
                variant="underlined"
                placeholder="Ej: Manufacturado, Almacenado, Enviado a distribuidor"
              ></v-text-field>
              <v-select
                v-model="obj.actorType"
                :items="actorTypeOptions"
                item-title="title"
                item-value="value"
                label="Tipo de Actor:"
                variant="underlined"
                color="primary"
              ></v-select>
              <v-text-field
                v-model="obj.actorId"
                color="primary"
                label="Actor ID:"
                variant="underlined"
              ></v-text-field>
              <v-text-field
                v-model="obj.metadataAction"
                color="primary"
                label="Metadata URL *opcional:"
                variant="underlined"
              ></v-text-field>

              <v-divider class="my-4"></v-divider>
              <p class="text-subtitle-2 mb-2">Certificación (opcional)</p>

              <v-select
                v-model="obj.certificationType"
                :items="certificationTypeOptions"
                item-title="title"
                item-value="value"
                label="Tipo de Certificación:"
                variant="underlined"
                color="primary"
              ></v-select>
              <v-text-field
                v-model="obj.certificationDate"
                color="primary"
                label="Fecha de Certificación (timestamp):"
                variant="underlined"
                type="number"
              ></v-text-field>
              <v-text-field
                v-model="obj.certificationResult"
                color="primary"
                label="Resultado de Certificación:"
                variant="underlined"
                placeholder="Ej: Aprobado, Rechazado, En revisión"
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
                  @click="traceabilityInfo"
                >
                  <IconFilePlus color="white" :size="33" stroke-width="1" />
                  Agregar trazabilidad
                </v-btn>
              </div>
            </v-card-text>
            <v-card-text>
              <p>
                Confirma para agregar esta Información de trazabilidad del
                producto al contrato
              </p>
              <ul class="pa-4">
                <li>Product ID: {{ obj.productId }}</li>
                <li>Acción: {{ obj.action }}</li>
                <li>Fecha Registro: <em>auto (block.timestamp)</em></li>
                <li>Actor address: {{ obj.actor }}</li>
                <li>Tipo de Actor: {{ actorTypeOptions[obj.actorType]?.title || obj.actorType }}</li>
                <li>Actor ID: {{ obj.actorId }}</li>
                <li>Acción Metadata URL: {{ obj.metadataAction }}</li>
                <li v-if="obj.certificationType">Certificación: {{ obj.certificationType }}</li>
                <li v-if="obj.certificationDate">Fecha Certificación: {{ obj.certificationDate }}</li>
                <li v-if="obj.certificationResult">Resultado: {{ obj.certificationResult }}</li>
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
