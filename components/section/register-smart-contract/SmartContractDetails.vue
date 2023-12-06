<script setup lang="ts">
import { IconReplaceFilled } from "@tabler/icons-vue";
import QRCode from "@/components/section/qr-code/QRCode.vue";
import { useSmartContract } from "@/store/smart-contract";
import { storeToRefs } from "pinia";

defineProps<{
    deployTransaction: object
}>()

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
const { contract } = storeToRefs(storeContract); // Destructuring from a Store
// actions can just be destructured
const { setContractAddress, setHasContract } = storeContract;

const handleChangeQR = async () => {
  setContractAddress("");
  setHasContract(null);
};

</script>

<template>
  <div v-if="contract && contract.contractAddress">
    <h2 class="section-title font-weight-medium text-white">
      Detalles del SmartContract
    </h2>
    <p class="text-white mb-3">
      Estos son los detalles del contrato inteligente seleccionado.
    </p>
    <h5 class="font-weight-medium font-18 text-white">
      Dirección del contrato:
    </h5>
    <p class="text-white" style="overflow: scroll">
      {{ contract.contractAddress }}
    </p>
    <div v-if="deployTransaction.hash !== ''">
      <h5 class="font-weight-medium font-18 text-white">
        Especificaciones del contrato:
      </h5>
      <p class="text-white">{{ deployTransaction }}</p>
    </div>
    <h5 class="font-weight-medium font-18 text-white mt-3 mb-2">
      Código QR del contrato:
    </h5>
    <QRCode />
    <p class="text-white mt-5">
      Aquí puedes cambiar de contrato inteligente seleccionado.
    </p>
    <v-btn
      @click="handleChangeQR"
      size="large"
      style="background-color: #00b0ff"
      class="my-5 text-white p-3"
      flat
    >
      <IconReplaceFilled color="white" :size="33" class="pe-1" />
      Cambiar de SmartContract
    </v-btn>
  </div>
</template>
