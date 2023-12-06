<script setup lang="ts">
import SmartContractNavItems from "@/components/section/register-smart-contract/SmartContractNavItems.vue";
import { IconTransfer } from "@tabler/icons-vue";
import { storeToRefs } from "pinia";
import { useSmartContract } from "@/store/smart-contract";

const storeContract = useSmartContract();
// but skip any action or non reactive (non ref/reactive) property
const { hasContract } = storeToRefs(storeContract); // Destructuring from a Store

const drawer = ref(null);
</script>

<template>
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
          <SmartContractNavItems />
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
</template>
