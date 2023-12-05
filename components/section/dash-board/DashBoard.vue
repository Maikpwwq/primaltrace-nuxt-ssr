<script setup lang="ts">
import { ref, reactive } from "vue";
// import WhiteTLogo from '/images/logos/white-text.png';
import ConnectWallet from "@/components/section/connect-wallet/ConnectWallet.vue";
import ReadSmartContract from "@/components/section/read-contract/ReadSmartContract.vue";
import SmartContractRegister from "@/components/section/register-smart-contract/SmartContractRegister.vue";

import AddCatalog from "@/components/section/add-catalog/AddCatalog.vue";
import AddTraceabilityInfo from "@/components/section/add-traceability-info/AddTraceabilityInfo.vue";
import AddProduct from "@/components/section/add-product/AddProduct.vue";
import GetCatalog from "@/components/section/add-catalog/GetCatalog.vue";
import GetProduct from "@/components/section/add-product/GetProduct.vue";
import GetTraceabilityInfo from "@/components/section/add-traceability-info/GetTraceabilityInfo.vue";

import CatalogsResume from "@/components/section/tables/CatalogsResume.vue";
import ProductsResume from "@/components/section/tables/ProductsResume.vue";
import TrazabilitiesResume from "@/components/section/tables/TrazabilitiesResume.vue";

import { IconTransfer } from "@tabler/icons-vue";

import { headerDashBoard } from "@/data/CustomComponents";

import { storeToRefs } from "pinia";
import { useWalletStore } from "@/store";
import { useSmartContract } from "@/store/smart-contract";

const storeWallet = useWalletStore();
// but skip any action or non reactive (non ref/reactive) property
const { wallet, hasProvider } = storeToRefs(storeWallet); // Destructuring from a Store

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
const { contract, hasContract } = storeToRefs(storeContract); // Destructuring from a Store

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

const cleanSelection = () => {
  selection.string = "";
};

const handleCLick = (index: number) => {
  slides.number = index;
};

const handleSelect = (action: string) => {
  selection.string = action;
};

const selection = reactive({
  string: "",
});

const slides = reactive({
  number: 0,
});
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
              <li
                class="nav-item mb-3"
                v-for="nav in headerDashBoard"
                :key="nav.title"
                text
              >
                <div
                  v-if="
                    selection.string !== '' && selection.string === nav.action
                  "
                >
                  <v-btn
                    @click="cleanSelection()"
                    class="btn px-4 bg-primary ml-2 d-flex"
                    flat
                  >
                    Atras
                  </v-btn>
                  <v-btn
                    v-for="elm in nav.group"
                    :to="elm.href"
                    v-scroll-to="elm.href"
                    @click="handleCLick(elm.index)"
                    class="btn px-4 bg-primary ml-2 d-flex"
                    flat
                  >
                    <!-- d-none -->
                    {{ elm.title }}
                  </v-btn>
                </div>

                <v-btn
                  v-if="selection.string === ''"
                  @click="handleSelect(nav.action)"
                  class="btn px-4 bg-primary ml-2 d-flex"
                  flat
                >
                  <!-- d-none -->
                  {{ nav.title }}
                </v-btn>
              </li>
            </ul>
          </div>
        </v-navigation-drawer>
      </div>

      <v-row
        justify="center"
        class="flex-md-row-reverse flex-sm-column ma-0 w-auto position-relative"
        style="top: 80px !important; padding-bottom: 80px !important;"
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
          <!-- DashBoard basic view Navigation -->
          <div class="pa-0">
            <v-col
              class="pe-5 bg-dark header2 d-flex flex-column w-auto"
              style="min-width: 330px"
            >
              <!-- Logo -->
              <LcLogoWhiteTextLogo class="" />
              <div
                class="navigation mx-auto mx-sm-0 d-md-flex d-sm-none flex-column w-100 justify-end"
                v-bind:class="[isActive ? 'd-block' : '']"
                @click="isActive = !isActive"
              >
                <ul
                  v-if="hasContract"
                  class="d-flex flex-row justify-space-between"
                  min-height="auto"
                  style="list-style: none"
                >
                  <li
                    class="nav-item d-flex align-center"
                    v-for="nav in headerDashBoard"
                    :key="nav.title"
                    text
                  >
                    <div
                      v-if="
                        selection.string !== '' &&
                        selection.string === nav.action
                      "
                    >
                      <v-btn
                        @click="cleanSelection()"
                        class="btn px-4 bg-primary ml-2 d-flex"
                        flat
                      >
                        Atras
                      </v-btn>
                      <v-btn
                        v-for="elm in nav.group"
                        :to="elm.href"
                        v-scroll-to="elm.href"
                        @click="handleCLick(elm.index)"
                        class="btn px-4 bg-primary ml-2 d-flex"
                        flat
                      >
                        <!-- d-none -->
                        {{ elm.title }}
                      </v-btn>
                    </div>

                    <v-btn
                      v-if="selection.string === ''"
                      @click="handleSelect(nav.action)"
                      class="btn px-4 bg-primary ml-2 d-flex"
                      flat
                    >
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
              <v-app-bar-nav-icon
                width="30"
                class="d-md-none d-sm-flex drawer-icon text-white ml-auto mr-0"
                @click.stop="drawer = !drawer"
              >
                <IconTransfer color="white" :size="33" stroke-width="1" />
              </v-app-bar-nav-icon>
            </v-col>
          </div>
          <!-- TODO: delimitar height: 100vp; overflow-y: auto; -->

          <v-col cols="12" class="pa-0">
            <AddCatalog v-if="slides.number === 1" />
            <AddProduct v-if="slides.number === 2" />
            <AddTraceabilityInfo v-if="slides.number === 3" />
            <GetCatalog v-if="slides.number === 4 || slides.number === 0"  />
            <CatalogsResume />
            <ProductsResume />
            <TrazabilitiesResume />
            <GetProduct v-if="slides.number === 5"  />
            <GetTraceabilityInfo v-if="slides.number === 6"  />
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
