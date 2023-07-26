<script setup lang="ts">
// import WhiteTLogo from '/images/logos/white-text.png';
import AddTraceabilityInfo from "@/components/section/add-traceability-info/AddTraceabilityInfo.vue";
import AddProduct from "@/components/section/add-product/AddProduct.vue";
import ConnectWallet from "@/components/section/connect-wallet/ConnectWallet.vue";
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
                        <div class="bg-primary contact-detail-card">
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
