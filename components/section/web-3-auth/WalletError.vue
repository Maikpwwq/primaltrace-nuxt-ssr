<script setup lang="ts">
import { ref } from "vue";
import { useWalletStore } from '@/store'
import { storeToRefs } from 'pinia'

const store = useWalletStore()
const { error, errorMessage } = storeToRefs(store) // Destructuring from a Store 
</script>
<template>
    <div id="wallet-connect-error">
        <v-container>
            <!-- -----------------------------------------------
            Start WalletError
        ----------------------------------------------- -->
            <v-row class="mt-8 metaMaskError" justify="center">
                <v-col cols="12" md="4" sm="6">
                    <div v-if="error" @click="error = false">
                        <strong> Error: </strong> {{ errorMessage }}
                    </div>
                </v-col>
            </v-row>
            <!-- -----------------------------------------------
            End WalletError
        ----------------------------------------------- -->
        </v-container>
    </div>
</template>
<style>
.metaMaskError {
    height: 36px;
    padding: 16px;
    color: #EFEFEF;
    background-color: transparent;
}
</style>