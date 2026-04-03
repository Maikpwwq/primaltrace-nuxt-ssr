<script setup lang="ts">
import {
  StreamBarcodeReader,
  // ImageBarcodeReader,
} from "@teckel/vue-barcode-reader";
import { reactive } from "vue";
import { useWalletStore } from "@/stores";
import { useSmartContract } from "@/stores/smart-contract";
import { storeToRefs } from "pinia";
import Polygonzkevm from "/images/polygon-zkevm/polygonzkevm.png";
import { ethers } from "ethers";
import { IconQrcode } from "@tabler/icons-vue";
import SmartContractDetails from "@/components/section/register-smart-contract/SmartContractDetails.vue";
// import {
//   getProductCounter,
//   getCatalogCounter,
//   getAnomalyCounter,
// } from "@/services/thridWeb/contractReadInteract";
// import { IMPLEMENTATION_CONTRACT_ADDRESS } from "@/data/contractVariables";

import ABI_CATALOG from "@/services/thridWeb/implementationAbi.json";
import { contractByteCode } from "@/services/thridWeb/implementationByteCode";

const store = useWalletStore();
// but skip any action or non reactive (non ref/reactive) property
const { wallet, ethersProvider, hasProvider } = storeToRefs(store); // Destructuring from a Store
// actions can just be destructured
// const { setWallet, setHasProvider, setError, setErrorMessage, setIsConnecting, clearError, clearWallet } = store

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
const {
  contract,
  contractInfo,
  hasContract,
  error,
  errorMessage,
  isConnecting,
} = storeToRefs(storeContract); // Destructuring from a Store
// actions can just be destructured
const {
  setContractAddress,
  setCatalogsInfo,
  setProductsInfo,
  setTraceabilityInfo,
  setHasContract,
  setError,
  setErrorMessage,
  setIsConnecting,
  clearError,
  clearContract,
} = storeContract;

const deployTransaction = reactive({
  hash: "",
  blockHash: "",
  blockNumber: 0,
  chainId: 0,
  from: "",
});

// let LOAD = ref(true);
// const counters = ref({
// products: 0,
// catalogs: 0,
// traces: 0,
// anomalies: 0,
// });

// watchEffect(async () => {
//   if (!LOAD) {
// getAnomalyCounter, getTracesCounter
// Probando catalogos primero
// await getCatalogCounter().then((data: any) => {
//   console.log("getCatalogCounter", data);
//   counters.value.catalogs = data;
// });
// await getProductCounter().then((data: any) => {
//     console.log('getProductCounter', data)
//     counters.value.products = data
// })
//   }
// });

const handleClick = async () => {
  try {
    // Deploy contract with some arguments in the constructor
    console.log("deployment params", ethersProvider.value.getSigner()); // ethers.providers.Web3Provider
    const contract = new ethers.ContractFactory(
      ABI_CATALOG,
      contractByteCode,
      ethersProvider.value.getSigner()
    ); // signer
    const initialCatalogName = "Catálogo Principal";
    const initialCatalogDescription = "Catálogo inicial auto-generado";
    const initialCatalogMetadata = "{}";
    const initialCatalogQrCode = "initial-qr";

    const deployContract = await contract.deploy(
      initialCatalogName,
      initialCatalogDescription,
      initialCatalogMetadata,
      initialCatalogQrCode
    );
    console.log("deployment contract", contract);
    // Wait for deployment to finish
    const receipt = await deployContract.deployed();
    const address = receipt?.address;
    setContractAddress(address);
    setHasContract(true);
    updateContractAddress(address);
    const { hash, blockHash, blockNumber, chainId, from } =
      receipt.deployTransaction;
    deployTransaction.hash = hash;
    deployTransaction.blockHash = blockHash || "";
    deployTransaction.blockNumber = blockNumber || 0;
    deployTransaction.chainId = chainId;
    deployTransaction.from = from;
    console.log("deployment to finish", receipt);
    // deployTransaction // hash, blockHash, blockNumber, chainId, creates, from, r, s,
  } catch (err) {
    console.log("deployment err", err);
    setError(true);
    throw new Error(
      "No fue posible desplegar este nuevo contrato para catálogos."
    );
  }
};

const updateContractAddress = async (address: any) => {
  try {
    if (!!deployAddress) {
      deployAddress.value = address;
    }
  } catch (err) {
    console.error(err)
  }
}


const handleReadQR = () => {
  readQR.value = !readQR.value;
};

const manualAddress = ref("");
const submitManualAddress = () => {
  if (manualAddress.value && manualAddress.value.trim() !== "") {
    onDecode(manualAddress.value.trim());
  }
};

const loadTestContract = async () => {
  try {
    const address = IMPLEMENTATION_CONTRACT_ADDRESS;
    updateContractAddress(address);
    setContractAddress(address);
    setHasContract(true);
  } catch (err) {
    console.error(err);
    alert("No fue posible cargar el contrato de prueba.");
  }
};

const readQR = ref(false);

const onDecode = (result: any) => {
  console.log("onDecode", result);
  alert(result);
  setContractAddress(result);
  setHasContract(true);
  readQR.value = false;
};

const onLoaded = (result: any) => {
  console.log("onLoaded", result);
};

const onError = (err: any) => {
  console.log("onError", err);
};
</script>

<script lang="ts">
import { ref } from "vue";
import { IMPLEMENTATION_CONTRACT_ADDRESS } from "@/data/contractVariables";

let deployAddress = ref("");// ref(IMPLEMENTATION_CONTRACT_ADDRESS);
export { deployAddress };
</script>

<template>
  <div className="pa-5 mx-5">
    <!-- to="#conectar-wallet"    -->
    <div class="pb-4" style="height: max-content" v-if="hasProvider && wallet.accounts.length > 0">
      <div v-if="contract.contractAddress === ''">
        <h2 class="section-title font-weight-medium text-white">
          Seleccionar Smart Contract
        </h2>
        <p class="pb-2 text-white">
          Ingresa con el código QR de un contrato inteligente registrado o bien
          registra un contrato nuevo.
        </p>
        <div class="d-flex flex-wrap align-center">
          <v-btn @click="handleReadQR" size="large" style="background-color: #00b0ff" class="text-white mb-2 mr-2" flat>
            <IconQrcode :size="39" />
            Leer código QR del SmartContract
          </v-btn>

          <!-- Botón temporal solo para la wallet específica -->
          <v-btn v-if="wallet.accounts[0]?.toLowerCase() === '0x2a34f68c873a41963f9a9a995120ae444bb2a488'"
            @click="loadTestContract" size="large" style="background-color: #f32196;" class="text-white mb-2" flat>
            Cargar Contrato de prueba
          </v-btn>
        </div>

        <div v-if="readQR" class="mt-4" id="decode-qr">
          <StreamBarcodeReader no-front-cameras @decode="onDecode" @loaded="onLoaded" />
          <div class="mt-4 d-flex align-center">
            <v-text-field v-model="manualAddress" placeholder="Ingresa la dirección del contrato" hide-details
              density="compact" variant="solo" class="mr-3"
              bg-color="white"></v-text-field>
            <v-btn @click="submitManualAddress" style="background-color: #f32196" class="text-white" flat size="large">Cargar</v-btn>
          </div>
        </div>
        <!-- torch -->
        <!-- <ImageBarcodeReader @decode="onDecode" @error="onError" /> -->
        <div class="d-flex align-center my-7" style="max-width: 400px;">
          <v-divider color="white" class="border-opacity-25" :thickness="2"></v-divider>
          <span class="mx-4 text-white text-caption text-uppercase font-weight-bold"
            style="letter-spacing: 2px; opacity: 0.6;">O</span>
          <v-divider color="white" class="border-opacity-25" :thickness="2"></v-divider>
        </div>
        <v-btn @click="handleClick" size="large" style="background-color: #00b0ff" class="text-white" flat>
          <img :src="Polygonzkevm" class="logo-height pe-2" alt="logo smartChain polygon Zkevm" />
          Registrar Nuevo SmartContract
        </v-btn>
      </div>

      <SmartContractDetails :deployTransaction="deployTransaction" />
    </div>
  </div>
</template>

<style>
.logo-height {
  height: 33px;
}
</style>
