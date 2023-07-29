<script setup lang="ts">
// import WhiteTLogo from '/images/logos/white-text.png';
import AddTraceabilityInfo from "@/components/section/add-traceability-info/AddTraceabilityInfo.vue";
import AddProduct from "@/components/section/add-product/AddProduct.vue";
import ConnectWallet from "@/components/section/connect-wallet/ConnectWallet.vue";

// const THIRDWEB = process.env.NUXT_THIRDWEB_PRIVATE_KEY; // don't work
// const config = useRuntimeConfig();
// const THIRDWEB_PRIVATE_KEY = config.public.apiKeyThirdWeb; //works
// const THIRDWEB_CLIENT_ID = config.public.clientIdThirdWeb;
// console.log("dev variables 1", THIRDWEB_PRIVATE_KEY, THIRDWEB_CLIENT_ID);
// const THIRDWEB_PRIVATE_KEY_2 = `${import.meta.env.NUXT_THIRDWEB_PRIVATE_KEY}` ; //works
// const THIRDWEB_CLIENT_ID_2 = `${import.meta.env.VITE_THIRDWEB_CLIENT_ID}`; 
// console.log("dev variables 2", THIRDWEB_PRIVATE_KEY_2, THIRDWEB_CLIENT_ID_2);
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
                        <AddTraceabilityInfo />
                        <AddProduct />
                    </v-col>
                    <v-col cols="12" md="4">
                        <div class="bg-primary">
                            <ConnectWallet />
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
