<script setup lang="ts">
import { ref } from "vue";
import { useWalletStore } from '@/store'
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'
import Polygonzkevm from "/images/polygon-zkevm/polygonzkevm.png";
import { ethers } from "ethers";

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

import ABI_CATALOG from "@/services/thridWeb/implementationAbi.json";
import { contractByteCode } from "@/services/thridWeb/implementationByteCode.ts";

const deployTransaction = reactive({
    hash: "", blockHash: "", blockNumber: 0, chainId: 0, from: "",
})

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
        const { hash, blockHash, blockNumber, chainId, from } = receipt.deployTransaction;
        deployTransaction.hash = hash;
        deployTransaction.blockHash = blockHash || "";
        deployTransaction.blockNumber = blockNumber || 0 ;
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

</script>

<template>
    <div className="d-flex flex-column align-center justify-center pt-6 mt-6 mb-6">
        <!-- to="#conectar-wallet"    -->
        <v-btn v-if="hasProvider && wallet.accounts.length > 0" @click="handleClick" size="large"
            style="background-color:#00B0FF" class="text-white" flat>
            <img :src="Polygonzkevm" class="logo-height" alt="logo smartChain polygon Zkevm" />
            Registrar SmartContract
        </v-btn>
        <p>Dirección del contrato: </p>
        <p>{{ contract.contractAddress }} </p>
        <p>Especificaciones del contrato: </p>
        <p>{{ deployTransaction }}</p>
    </div>
</template>

<style>
.logo-height {
  height: 33px;
}
</style>