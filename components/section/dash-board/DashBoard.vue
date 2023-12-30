<script setup lang="ts">
import { ref, reactive } from "vue";
// import WhiteTLogo from '/images/logos/white-text.png';
// import ConnectWallet from "@/components/section/connect-wallet/ConnectWallet.vue";
// import ReadSmartContract from "@/components/section/read-contract/ReadSmartContract.vue";
import SmartContractRegister from "@/components/section/register-smart-contract/SmartContractRegister.vue";
import SmartContractSubMenu from "@/components/section/register-smart-contract/SmartContractSubMenu.vue";
import SmartContractNavItems from "@/components/section/register-smart-contract/SmartContractNavItems.vue";

import AddCatalog from "@/components/section/add-catalog/AddCatalog.vue";
import AddTraceabilityInfo from "@/components/section/add-traceability-info/AddTraceabilityInfo.vue";
import AddProduct from "@/components/section/add-product/AddProduct.vue";
import GetCatalog from "@/components/section/add-catalog/GetCatalog.vue";
import GetProduct from "@/components/section/add-product/GetProduct.vue";
import GetTraceabilityInfo from "@/components/section/add-traceability-info/GetTraceabilityInfo.vue";
import LoadCatalogsInfo from "@/components/section/dash-board/LoadCatalogsInfo.vue";
import LoadProductsInfo from "@/components/section/dash-board/LoadProductsInfo.vue";
import LoadRastrosInfo from "@/components/section/dash-board/LoadRastrosInfo.vue";

import CatalogsResume from "@/components/section/tables/CatalogsResume.vue";
import ProductsResume from "@/components/section/tables/ProductsResume.vue";
import TrazabilitiesResume from "@/components/section/tables/TrazabilitiesResume.vue";

import { storeToRefs } from "pinia";
import { useWalletStore } from "@/store";
import { useSmartContract } from "@/store/smart-contract";

const storeWallet = useWalletStore();
// but skip any action or non reactive (non ref/reactive) property
const { wallet, hasProvider } = storeToRefs(storeWallet); // Destructuring from a Store

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
const { contract, contractInfo, hasContract } = storeToRefs(storeContract); // Destructuring from a Store

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

import { menuSlide } from "@/components/section/register-smart-contract/SmartContractNavItems.vue";
const slides = menuSlide.value

let LOAD_CONTRACT = ref(true);
watchEffect(async () => {
  if (LOAD_CONTRACT.value && hasContract.value) {
    try {
      await LoadCatalogsInfo()
      await LoadProductsInfo()
      await LoadRastrosInfo()
      LOAD_CONTRACT.value = false
    } catch (err){
      console.error(err)
    }
  }
})

// reactive({
//   number: 0,
// });
</script>

<template>
  <div id="dash-board">
    <v-container class="pa-0" v-if="hasProvider && wallet.accounts.length > 0">
      <!-- -----------------------------------------------
                Start DashBoard
                -------------------------------------------------->

      <!----sidebar menu drawer start----->
      <div class="nav2" v-if="hasContract && contract.contractAddress !== ''">
        <v-navigation-drawer
          style="top: 193px"
          color="white"
          v-model="drawer"
          temporary
        >
          <div
            class="navigation"
            v-bind:class="[isActive ? 'd-block' : '']"
            @click="isActive = !isActive"
          >
            <ul class="navbar-nav px-3 py-5 mt-5" min-height="auto">
              <SmartContractNavItems />
            </ul>
          </div>
        </v-navigation-drawer>
      </div>

      <v-row
        justify="center"
        class="flex-md-row-reverse flex-sm-column ma-0 w-auto position-relative"
        style="top: 80px !important; padding-bottom: 80px !important"
      >
        <v-col
          cols="12"
          lg="5"
          md="5"
          sm="12"
          class="d-flex pa-0"
          style="height: fit-content"
        >
          <div class="bg-primary w-100">
            <SmartContractRegister />
          </div>
        </v-col>
        <!-- style="width: min-content;" -->
        <v-col
          v-if="hasContract && contract.contractAddress !== ''"
          cols="12"
          lg="7"
          md="7"
          sm="12"
          class="pa-0"
        >
          <SmartContractSubMenu />
          <!-- TODO: delimitar height: 100vp; overflow-y: auto; -->
          <!-- v-if="contractInfo.value-catalog"-->
          <v-col cols="12" class="pa-0">
            <AddCatalog v-if="slides.number === 1" />
            <AddProduct v-if="slides.number === 2" />
            <AddTraceabilityInfo v-if="slides.number === 3" />            
            <CatalogsResume v-if="slides.number === 4 || slides.number === 0" />
            <ProductsResume v-if="slides.number === 5" />
            <TrazabilitiesResume v-if="slides.number === 6" />
            <GetCatalog v-if="slides.number === 4 || slides.number === 0" />
            <GetProduct v-if="slides.number === 5" />
            <GetTraceabilityInfo v-if="slides.number === 6" />
            <!-- <ReadSmartContract /> -->
          </v-col>
        </v-col>
      </v-row>
      <!-- -----------------------------------------------
            End DashBoard
        ----------------------------------------------- -->
    </v-container>
  </div>
</template>

<style>
.logo-white-text {
  height: 133px;
}
</style>
