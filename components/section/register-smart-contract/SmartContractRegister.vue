<script setup lang="ts">
import { useWalletStore } from '@/store'
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'
import Polygonzkevm from "/images/polygon-zkevm/polygonzkevm.png";
import { ethers } from "ethers";
import { IconQrcode } from '@tabler/icons-vue';
import { IMPLEMENTATION_CONTRACT_ADDRESS } from "@/data/contractVariables";

import ABI_CATALOG from "@/services/thridWeb/implementationAbi.json";
import { contractByteCode } from "@/services/thridWeb/implementationByteCode.ts";

const store = useWalletStore()
// but skip any action or non reactive (non ref/reactive) property
const { wallet, ethersProvider, hasProvider } = storeToRefs(store) // Destructuring from a Store 
// actions can just be destructured
// const { setWallet, setHasProvider, setError, setErrorMessage, setIsConnecting, clearError, clearWallet } = store

const storeContract = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { contract, contractInfo, hasContract, error, errorMessage, isConnecting } = storeToRefs(storeContract) // Destructuring from a Store 
// actions can just be destructured
const { setContractAddress, setTraceabilityInfo, setHasContract, setError, setErrorMessage, setIsConnecting, clearError, clearContract } = storeContract


const deployTransaction = reactive({
    hash: "", blockHash: "", blockNumber: 0, chainId: 0, from: "",
})

// let deployAddress = ref("")
// defineExpose({deployAddress})

const handleClick = async () => {
    try {
        // Deploy contract with some arguments in the constructor
        console.log("deployment params", ethersProvider.value.getSigner()); // ethers.providers.Web3Provider
        const contract = new ethers.ContractFactory(ABI_CATALOG, contractByteCode, ethersProvider.value.getSigner()); // signer
        const deployContract = await contract.deploy();
        console.log("deployment contract", contract);
        // Wait for deployment to finish
        const receipt = await deployContract.deployed();
        setContractAddress(receipt.address);
        setHasContract(true);
        deployAddress.value = receipt.address
        const { hash, blockHash, blockNumber, chainId, from } = receipt.deployTransaction;
        deployTransaction.hash = hash;
        deployTransaction.blockHash = blockHash || "";
        deployTransaction.blockNumber = blockNumber || 0;
        deployTransaction.chainId = chainId;
        deployTransaction.from = from;
        console.log("deployment to finish", receipt);
        // deployTransaction // hash, blockHash, blockNumber, chainId, creates, from, r, s, 
    } catch (err) {
        console.log("deployment err", err);
        setError(true)
        throw new Error("No fue posible desplegar este nuevo contrato para catálogos.")
    }
}

const handleReadQR = async () => {
    //  TODO: abrir camara con permisos y leer QR
    const address = IMPLEMENTATION_CONTRACT_ADDRESS;
    deployAddress.value = address;
    setContractAddress(address);
    setHasContract(true);
}

const handleChangeQR = async () => {
    setContractAddress('')
    setHasContract(null);
}

</script>

<script lang="ts">
import { ref } from "vue";

let deployAddress = ref(IMPLEMENTATION_CONTRACT_ADDRESS)
export { deployAddress }
</script>

<template>
    <div className="d-flex flex-column align-center justify-center pa-5 mx-5">
        <!-- to="#conectar-wallet"    -->
        <div class="pb-4" v-if="hasProvider && wallet.accounts.length > 0">
            <div v-if="contract.contractAddress === ''">
                <h2 class="section-title font-weight-medium text-white">
                    Seleccionar Smart Contract
                </h2>
                <p class="pb-2 text-white">
                    Ingresa con el código QR de un contrato inteligente registrado o bien registra un contrato nuevo.
                </p>
                <v-btn @click="handleReadQR" size="large" style="background-color:#00B0FF" class="text-white" flat>
                    <IconQrcode :size="39" />
                    Leer código QR del SmartContract
                </v-btn>
                <p class="pt-2 pb-2 text-white">
                    o intenta
                </p>
                <v-btn @click="handleClick" size="large" style="background-color:#00B0FF" class="text-white" flat>
                    <img :src="Polygonzkevm" class="logo-height pe-2" alt="logo smartChain polygon Zkevm" />
                    Registrar Nuevo SmartContract
                </v-btn>
            </div>

            <div v-if="contract && contract.contractAddress">
                <h2 class="section-title font-weight-medium">
                    Detalles del SmartContract
                </h2>
                <p class="text-muted">
                    Estos son los detalles del contrato inteligente seleccionado.
                </p>
                <h5 class="font-weight-medium font-18">Dirección del contrato: </h5>
                <p>{{ contract.contractAddress }} </p>
                <div v-if="deployTransaction.hash !== ''">
                    <h5 class="font-weight-medium font-18">Especificaciones del contrato: </h5>
                    <p>{{ deployTransaction }}</p>
                </div>
                <v-btn @click="handleChangeQR" size="large" style="background-color:#00B0FF" class="my-5 text-white" flat>
                    <img :src="Polygonzkevm" class="logo-height" alt="logo smartChain polygon Zkevm" />
                    Cambiar selección de SmartContract
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style>
.logo-height {
    height: 33px;
}
</style>