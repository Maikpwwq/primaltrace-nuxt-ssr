<script setup lang="ts">
import { ref } from "vue";
import DashBoard from "@/components/section/dash-board/DashBoard.vue";
import BannerConnectWallet from "@/components/shared/lp-banner/BannerConnectWallet.vue";
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'

const storeContract = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { contract, contractInfo, hasContract, error, errorMessage, isConnecting } = storeToRefs(storeContract) // Destructuring from a Store 
</script>

<template>
    <div>
        <!-------Banner-------->
        <BannerConnectWallet v-if="contract.contractAddress === ''"/>
        <!--------------------->
        <!-------DashBoard-------->
        <DashBoard />
        <!--------------------->
    </div>
</template>
