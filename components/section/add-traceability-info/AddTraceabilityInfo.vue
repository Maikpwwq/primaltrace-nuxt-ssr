<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { ref, reactive } from "vue";
import { addTraceabilityInfo } from "@/services/thridWeb/contractWriteInteract";
import { useWalletStore } from "@/store";
import { storeToRefs } from "pinia";
import { TRACEABILITY_INFO } from "@/data/contractVariables";
import type { TraceabilityInfo } from "@/schemas/index";
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

const traceabilityInfo = async () => {
  console.log("traceabilityInfo", obj, TRACEABILITY_INFO);
  await addTraceabilityInfo(obj).then((data) => {
    console.log("traceabilityInfo", data);
    // const { to, from, blockHash, blockNumber, confirmations, contractAddress, status, transactionHash } = data.receipt;
  });
};

const obj: TraceabilityInfo = reactive({
  // trazabilityId: "",
  productId: PRODUCT_ID.value,
  action: "",
  timestamp: TIMESTAMP.value,
  actor: walletActor,
  actorType: 0,
  actorId: "",
  metadataAction: "",
});

const handleClick = () => {
  console.log("get");
};
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
                v-model="obj.timestamp"
                color="primary"
                label="Timestamp:"
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
              ></v-text-field>
              <v-text-field
                v-model="obj.actorType"
                color="primary"
                label="Actor Type:"
                variant="underlined"
              ></v-text-field>
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
              <div class="mt-1">
                <v-btn class="bg-success mr-3 text-white" elevation="0">
                  <IconFilePlus color="white" :size="33" stroke-width="1" />
                  Definir nuevo campo
                </v-btn>
                <v-btn
                  class="bg-success mr-3 text-white"
                  elevation="0"
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
                <!-- "Manufacturado" "Almacenado" "Enviado a distribuidor" -->
                <li>Product ID: {{ obj.productId }}</li>
                <li>Acción: {{ obj.action }}</li>
                <li>Fecha Registro: {{ obj.timestamp }}</li>
                <li>Actor address: {{ obj.actor }}</li>
                <li>Tipo de Actor: {{ obj.actorType }}</li>
                <li>Actor ID: {{ obj.actorId }}</li>
                <li>Acción Metadata URL *opcional: {{ obj.metadataAction }}</li>
              </ul>
              <v-btn @click="handleClick" class="mb-3">
                <IconWriting color="black" :size="33" stroke-width="1" /> Firmar
                trazabilidad
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
