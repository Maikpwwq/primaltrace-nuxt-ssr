<script setup lang="ts">
import { ref } from "vue";
import { useWalletStore } from '@/store'
import { storeToRefs } from 'pinia'
import { formatChainAsNum, formatAddress } from "@/utils";

const store = useWalletStore()
const { wallet } = storeToRefs(store) // Destructuring from a Store 

const etherScan = `https://etherscan.io/address/${wallet.value.accounts[0]}`;
</script>
<template>
    <div id="display-wallet">
            <v-container class="pa-0">
                <!-- -----------------------------------------------
            Display Wallet Info
        ----------------------------------------------- -->
                <v-row justify="center" class="display">
                    <v-col cols="12" lg="12" md="12" class="pa-0">
                        <v-card elevation="0" class="pa-5 mt-3">
                            <div v-if="wallet.accounts.length > 0">
                                <h5 class="font-weight-medium font-18">Wallet Account: </h5>
                                <p class="my-3 text-muted"> 
                                    <a class="text_link tooltip-bottom m-4" :href="etherScan" target="_blank"
                                        data-tooltip="Abrir en el Explorador de bloques" rel="noreferrer">
                                        {{ formatAddress(wallet.accounts[0]) }}
                                    </a>
                                    <!-- {{ wallet.accounts[0] }} -->
                                </p>
                                <h5 class="font-weight-medium font-18">Wallet Balance: </h5>
                                <p class="my-3 text-muted">{{ wallet.balance }}</p>
                                <h5 class="font-weight-medium font-18">Hex ChainId: </h5>
                                <p class="my-3 text-muted">{{ wallet.chainId }}</p>
                                <h5 class="font-weight-medium font-18">Numeric ChainId: </h5>
                                <p class="my-3 text-muted">{{ formatChainAsNum(wallet.chainId) }}</p>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                <!-- -----------------------------------------------
            Display Wallet Info
        ----------------------------------------------- -->
            </v-container>
    </div>
</template>
<style>
.display {
    height: calc(100% - 136px);
    padding: 16px;
}
</style>