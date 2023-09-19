<script setup lang="ts">
import { ref } from "vue";
// import WhiteTLogo from '/images/logos/white-text.png';
import AddTraceabilityInfo from "@/components/section/add-traceability-info/AddTraceabilityInfo.vue";
import AddProduct from "@/components/section/add-product/AddProduct.vue";
import ConnectWallet from "@/components/section/connect-wallet/ConnectWallet.vue";
import ReadSmartContract from "@/components/section/read-contract/ReadSmartContract.vue";
import SmartContractRegister from "@/components/section/register-smart-contract/SmartContractRegister.vue";
import AddCatalog from "@/components/section/add-catalog/AddCatalog.vue";

import { IconTransfer } from "@tabler/icons-vue";

import { headerDashBoard } from "@/data/CustomComponents";

import { storeToRefs } from 'pinia'
import { useWalletStore } from '@/store'
import { useSmartContract } from '@/store/smart-contract'


const storeWallet = useWalletStore()
// but skip any action or non reactive (non ref/reactive) property
const { wallet, hasProvider } = storeToRefs(storeWallet) // Destructuring from a Store 

const storeContract = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { contract, hasContract } = storeToRefs(storeContract) // Destructuring from a Store 

// const THIRDWEB = process.env.NUXT_THIRDWEB_PRIVATE_KEY; // don't work
// const config = useRuntimeConfig();
// const THIRDWEB_PRIVATE_KEY = config.public.thirdwebPrivateKey; //works 
// const THIRDWEB_CLIENT_ID = config.public.thirdwebClientId;
// console.log("dev variables 1", THIRDWEB_PRIVATE_KEY, THIRDWEB_CLIENT_ID);
// const THIRDWEB_PRIVATE_KEY_2 = `${import.meta.env.NUXT_THIRDWEB_PRIVATE_KEY}` ; //works
// const THIRDWEB_CLIENT_ID_2 = `${import.meta.env.VITE_THIRDWEB_CLIENT_ID}`; 
// console.log("dev variables 2", THIRDWEB_PRIVATE_KEY_2, THIRDWEB_CLIENT_ID_2);
// const isActive = true;

const drawer = ref(null);

const handleCLick = (index: number) => {
    slides.number = index
}

const slides = reactive({
    number: 0
})

</script>

<template>
    <div id="dash-board">
        <div class="" v-if="hasProvider && wallet.accounts.length > 0">
            <v-container class="pa-0">
                <!-- -----------------------------------------------
                Start DashBoard
                -------------------------------------------------->
                <v-row justify="center" class="flex-md-row flex-sm-column-reverse ma-0 w-auto">
                    <!-- style="width: min-content;" -->
                    <v-col v-if="hasContract && contract.contractAddress !== ''" cols="12" lg="7" md="7" sm="12" class="pa-0">
                        <!-- DashBoard basic view Navigation -->
                        <v-app-bar class="app-header position-relative bg-dark header2 d-flex" flat style="height: max-content !important;">
                            <v-container class="pa-0 fill-height">
                                <v-toolbar class="px-5" >
                                    <div class="navigation mx-auto mx-sm-0 d-md-flex d-sm-none" v-bind:class="[isActive ? 'd-block' : '']"
                                        @click="isActive = !isActive">
                                        <ul class="d-flex flex-row" min-height="auto" style="list-style: none;">
                                            <li class="nav-item" v-for="nav in headerDashBoard" :key="nav.title" text>
                                                <v-btn :to="nav.href" v-scroll-to="nav.href" @click="handleCLick(nav.index)"
                                                    class="btn px-4 bg-primary ml-2 d-flex " flat>
                                                    <!-- d-none -->
                                                    {{ nav.title }}
                                                </v-btn>
                                                <!-- <NuxtLink :to="nav.href" v-scroll-to="nav.href" class="nav-link"
                                                    @click="handleCLick(nav.index)">
                                                    {{ nav.title }}
                                                </NuxtLink> -->
                                            </li>
                                        </ul>
                                    </div>
                                    <v-app-bar-nav-icon width="30"
                                        class="d-md-none d-sm-flex drawer-icon text-white ml-auto mr-0"
                                        @click.stop="drawer = !drawer">
                                        <IconTransfer  color="white" :size="33" stroke-width="1" />
                                    </v-app-bar-nav-icon>
                                </v-toolbar>
                            </v-container>
                        </v-app-bar>
                        <!-- -----------------------------------------------
                                End Header
                            ----------------------------------------------- -->
                        <!----sidebar menu drawer start----->
                        <div class="nav2">
                            <v-navigation-drawer style="top: 193px;" color="white" v-model="drawer" temporary>
                                <div class="navigation" v-bind:class="[isActive ? 'd-block' : '']"
                                    @click="isActive = !isActive">
                                    <ul class="navbar-nav px-3 py-5 mt-5" min-height="auto">
                                        <li class="nav-item mb-3" v-for="nav in headerDashBoard" :key="nav.title" text>
                                            <v-btn :to="nav.href" v-scroll-to="nav.href" @click="handleCLick(nav.index)"
                                                class="btn px-4 bg-primary ml-2 d-flex" flat>
                                                <!-- d-none -->
                                                {{ nav.title }}
                                            </v-btn>
                                            <!-- <NuxtLink :to="nav.href" v-scroll-to="nav.href" class="nav-link"
                                                @click="handleCLick(nav.index)">
                                                {{ nav.title }}
                                            </NuxtLink> -->
                                        </li>
                                    </ul>
                                </div>
                            </v-navigation-drawer>
                        </div>
                        <!-- TODO: delimitar height: 100vp; overflow-y: auto; -->
                        <!-- <slot name="read-contract"></slot>
                        <slot name="write-contract"></slot> -->

                        <v-col cols="12" class="pa-0">
                            <AddCatalog v-if="slides.number === 1" />
                            <AddProduct v-if="slides.number === 2" />
                            <AddTraceabilityInfo v-if="slides.number === 3" />
                        </v-col>
                        <v-col v-if="slides.number === 4 || slides.number === 0" cols="12" class="">
                            <ReadSmartContract />
                        </v-col>
                    </v-col>
                    <v-col cols="12" lg="5" md="5" sm="12" class="d-flex pa-0" style="height: fit-content;">
                        <div class="bg-primary w-100">
                            <SmartContractRegister />
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
