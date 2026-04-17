<script setup lang="ts">
import { ref, computed } from "vue";
import { useWalletStore } from "@/stores";
import { useSmartContract } from "@/stores/smart-contract";
import { storeToRefs } from "pinia";
import AdminKPIs from "@/components/section/admin/AdminKPIs.vue";
import TierManager from "@/components/section/admin/TierManager.vue";
import FactoryAdmin from "@/components/section/admin/FactoryAdmin.vue";
import RoleManager from "@/components/section/role-management/RoleManager.vue";
import AlertsResume from "@/components/section/tables/AlertsResume.vue";
import BannerConnectWallet from "@/components/shared/lp-banner/BannerConnectWallet.vue";

import {
  IconDashboard,
  IconShieldCheck,
  IconUsers,
  IconRocket,
  IconBell,
} from "@tabler/icons-vue";

const storeWallet = useWalletStore();
const { wallet, hasProvider } = storeToRefs(storeWallet);

const storeContract = useSmartContract();
const { contract, hasContract } = storeToRefs(storeContract);

const isConnected = computed(
  () => hasProvider.value && wallet.value?.accounts?.length > 0
);

const activeTab = ref("kpis");

useHead({
  title: "Admin — PrimalTrace",
  meta: [
    {
      name: "description",
      content:
        "Panel de control administrativo de PrimalTrace. KPIs, gestión de roles, límites de uso y administración de contratos Factory.",
    },
  ],
});
</script>

<template>
  <div id="admin-control-center" class="admin-page">
    <!-- Not connected -->
    <BannerConnectWallet v-if="!isConnected" />

    <!-- Connected but no contract -->
    <v-container v-else-if="!hasContract || contract.contractAddress === ''" class="py-10">
      <v-row justify="center">
        <v-col cols="10" md="8">
          <v-alert type="warning" variant="tonal" prominent>
            <v-alert-title>Contrato no cargado</v-alert-title>
            Primero debes cargar o desplegar un contrato inteligente desde el
            <NuxtLink to="/dashboard" class="text-primary font-weight-bold">Dashboard</NuxtLink>.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>

    <!-- Admin Panel -->
    <v-container v-else fluid class="pa-4 pa-md-8">
      <!-- Header -->
      <v-row justify="center" class="mb-6">
        <v-col cols="12" md="10">
          <div class="d-flex align-center ga-3 mb-2">
            <v-avatar color="primary" size="48">
              <IconDashboard :size="28" color="white" stroke-width="1.5" />
            </v-avatar>
            <div>
              <h1 class="text-h5 font-weight-bold">Centro de Control Administrativo</h1>
              <p class="text-body-2 text-medium-emphasis">
                Gestión de KPIs, roles, límites de uso y contratos Factory
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Tabs -->
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-tabs v-model="activeTab" color="primary" bg-color="transparent" grow>
            <v-tab value="kpis">
              <IconDashboard :size="18" stroke-width="1.5" class="mr-2" />
              KPIs
            </v-tab>
            <v-tab value="roles">
              <IconShieldCheck :size="18" stroke-width="1.5" class="mr-2" />
              Roles
            </v-tab>
            <v-tab value="tiers">
              <IconUsers :size="18" stroke-width="1.5" class="mr-2" />
              Límites de Uso
            </v-tab>
            <v-tab value="factory">
              <IconRocket :size="18" stroke-width="1.5" class="mr-2" />
              Factory
            </v-tab>
            <v-tab value="alerts">
              <IconBell :size="18" stroke-width="1.5" class="mr-2" />
              Alertas
            </v-tab>
          </v-tabs>

          <v-divider />

          <v-tabs-window v-model="activeTab" class="mt-6">
            <v-tabs-window-item value="kpis">
              <AdminKPIs />
            </v-tabs-window-item>

            <v-tabs-window-item value="roles">
              <RoleManager />
            </v-tabs-window-item>

            <v-tabs-window-item value="tiers">
              <TierManager />
            </v-tabs-window-item>

            <v-tabs-window-item value="factory">
              <FactoryAdmin />
            </v-tabs-window-item>

            <v-tabs-window-item value="alerts">
              <AlertsResume />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.admin-page {
  min-height: 100vh;
  padding-top: 80px;
}
</style>
