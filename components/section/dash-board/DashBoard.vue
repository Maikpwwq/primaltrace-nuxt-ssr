<script setup lang="ts">
// import WhiteTLogo from '/images/logos/white-text.png';
import AddTraceabilityInfo from "@/components/section/add-traceability-info/AddTraceabilityInfo.vue";
import AddProduct from "@/components/section/add-product/AddProduct.vue";
import ConnectWallet from "@/components/section/connect-wallet/ConnectWallet.vue";
import Web3Auth from "@/components/section/web-3-auth/Web3Auth.vue";
import SelectSmartContract from "@/components/section/select-smart-contract/SelectSmartContract.vue";

import { headerDashBoard } from "@/data/CustomComponents";

// const THIRDWEB = process.env.NUXT_THIRDWEB_PRIVATE_KEY; // don't work
// const config = useRuntimeConfig();
// const THIRDWEB_PRIVATE_KEY = config.public.thirdwebPrivateKey; //works 
// const THIRDWEB_CLIENT_ID = config.public.thirdwebClientId;
// console.log("dev variables 1", THIRDWEB_PRIVATE_KEY, THIRDWEB_CLIENT_ID);
// const THIRDWEB_PRIVATE_KEY_2 = `${import.meta.env.NUXT_THIRDWEB_PRIVATE_KEY}` ; //works
// const THIRDWEB_CLIENT_ID_2 = `${import.meta.env.VITE_THIRDWEB_CLIENT_ID}`; 
// console.log("dev variables 2", THIRDWEB_PRIVATE_KEY_2, THIRDWEB_CLIENT_ID_2);
// const isActive = true;
</script>

<template>
    <div id="dash-board">
        <div class="mini-spacer">
            <v-container>
                <!-- -----------------------------------------------
                Start DashBoard
                -------------------------------------------------->
                <v-row justify="center">
                    <v-col cols="12" md="8">
                        <!-- DashBoard basic view Navigation -->
                        <!-- <v-app-bar class="app-header position-relative bg-dark header2" flat>
                            <v-container class="py-0 fill-height">
                                <v-toolbar>
                                    <div class="navigation ml-auto" v-bind:class="[isActive ? 'd-block' : '']"
                                        @click="isActive = !isActive">
                                        <ul class="navbar-nav d-flex" min-height="auto">
                                            <li class="nav-item" v-for="nav in headerDashBoard" :key="nav.title" text>
                                                <NuxtLink :to="nav.href" v-scroll-to="nav.href" class="nav-link">
                                                    {{ nav.title }}
                                                </NuxtLink>
                                            </li>
                                        </ul>
                                    </div>
                                </v-toolbar>
                            </v-container>
                        </v-app-bar> -->
                        <!-- TODO: delimitar height: 100vp; overflow-y: auto; -->
                        <v-col cols="12" class="">
                            <SelectSmartContract />
                            <AddProduct />
                            <AddTraceabilityInfo />
                        </v-col>
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="bg-primary">
                            <ConnectWallet />
                            <Web3Auth />
                        </div>
                    </v-col>
                </v-row>
                <!-- -----------------------------------------------
            End DashBoard
        ----------------------------------------------- -->
            </v-container>
        </div>
    </div>
</template>

<style>
.logo-white-text {
    height: 133px;
}
</style>
