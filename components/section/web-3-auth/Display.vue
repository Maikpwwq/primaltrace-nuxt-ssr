<script setup lang="ts">
import { ref } from "vue";
import { useWalletStore } from '@/store'
import { storeToRefs } from 'pinia'
import { formatChainAsNum } from "@/utils";

const store = useWalletStore()
const { wallet } = storeToRefs(store) // Destructuring from a Store 

</script>
<template>
    <div id="display-wallet">
        <div>
            <v-container>
                <!-- -----------------------------------------------
            Display Wallet Info
        ----------------------------------------------- -->
                <v-row justify="center" class="display">
                    <v-col cols="12" lg="12" md="12" class="pa-0">
                        <v-card elevation="0">
                            <div v-if="wallet.accounts.length > 0">
                                <h5 class="font-weight-medium font-18">Wallet Accounts: </h5>
                                <p class="my-5 text-muted pr-sm-10">{{ wallet.accounts[0] }}</p>
                                <h5 class="font-weight-medium font-18">Wallet Balance: </h5>
                                <p class="my-5 text-muted pr-sm-10">{{ wallet.balance }}</p>
                                <h5 class="font-weight-medium font-18">Hex ChainId: </h5>
                                <p class="my-5 text-muted pr-sm-10">{{ wallet.chainId }}</p>
                                <h5 class="font-weight-medium font-18">Numeric ChainId: </h5>
                                <p class="my-5 text-muted pr-sm-10">{{ formatChainAsNum(wallet.chainId) }}</p>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                <!-- -----------------------------------------------
            Display Wallet Info
        ----------------------------------------------- -->
            </v-container>
        </div>
    </div>
</template>
<style>
.display {
    height: calc(100% - 136px);
    padding: 16px;
}
</style>