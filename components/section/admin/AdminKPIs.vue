<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getCatalogCounter,
  getProductCounter,
  getAlertCounter,
} from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from "@/stores/smart-contract";
import { storeToRefs } from "pinia";
import {
  IconBox,
  IconCategory,
  IconAlertTriangle,
  IconRoute,
  IconTrendingUp,
  IconClock,
} from "@tabler/icons-vue";

const storeContract = useSmartContract();
const { contract } = storeToRefs(storeContract);

const loading = ref(true);

const kpis = ref({
  catalogs: 0,
  products: 0,
  alerts: 0,
  resolvedAlerts: 0,
  traceabilityEvents: 0,
  contractAge: "—",
});

const cards = ref([
  {
    title: "Catálogos",
    key: "catalogs",
    icon: IconCategory,
    color: "#7c4dff",
    gradient: "linear-gradient(135deg, #7c4dff 0%, #651fff 100%)",
  },
  {
    title: "Productos",
    key: "products",
    icon: IconBox,
    color: "#00c853",
    gradient: "linear-gradient(135deg, #00c853 0%, #00e676 100%)",
  },
  {
    title: "Alertas",
    key: "alerts",
    icon: IconAlertTriangle,
    color: "#ff6d00",
    gradient: "linear-gradient(135deg, #ff6d00 0%, #ff9100 100%)",
  },
  {
    title: "Eventos de Trazabilidad",
    key: "traceabilityEvents",
    icon: IconRoute,
    color: "#2979ff",
    gradient: "linear-gradient(135deg, #2979ff 0%, #448aff 100%)",
  },
]);

onMounted(async () => {
  loading.value = true;
  try {
    const [catalogCount, productCount, alertCount] = await Promise.allSettled([
      getCatalogCounter(),
      getProductCounter(),
      getAlertCounter(),
    ]);

    kpis.value.catalogs =
      catalogCount.status === "fulfilled" ? Number(catalogCount.value) : 0;
    kpis.value.products =
      productCount.status === "fulfilled" ? Number(productCount.value) : 0;
    kpis.value.alerts =
      alertCount.status === "fulfilled" ? Number(alertCount.value) : 0;
  } catch (err) {
    console.error("AdminKPIs: failed to load counters", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div id="admin-kpis">
    <!-- KPI Cards -->
    <v-row class="mb-6">
      <v-col
        v-for="card in cards"
        :key="card.key"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          class="kpi-card rounded-lg"
          elevation="0"
          :style="{ borderLeft: `4px solid ${card.color}` }"
        >
          <v-card-text class="d-flex align-center justify-space-between pa-4">
            <div>
              <p class="text-caption text-medium-emphasis text-uppercase tracking-wide mb-1">
                {{ card.title }}
              </p>
              <v-skeleton-loader v-if="loading" type="text" width="60" />
              <p v-else class="text-h4 font-weight-bold" :style="{ color: card.color }">
                {{ (kpis as any)[card.key] }}
              </p>
            </div>
            <v-avatar :color="card.color" size="48" class="kpi-icon-avatar">
              <component :is="card.icon" :size="24" color="white" stroke-width="1.5" />
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contract Info -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="0" variant="outlined">
          <v-card-title class="d-flex align-center ga-2 pa-4">
            <IconTrendingUp :size="22" color="#7c4dff" stroke-width="1.5" />
            Resumen del Contrato
          </v-card-title>
          <v-card-text>
            <v-list density="compact" class="bg-transparent">
              <v-list-item>
                <template #prepend>
                  <v-icon color="primary" size="small">mdi-file-document-outline</v-icon>
                </template>
                <v-list-item-title class="text-body-2">Dirección del Contrato</v-list-item-title>
                <v-list-item-subtitle class="text-caption font-mono">
                  {{ contract.contractAddress }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="primary" size="small">mdi-link-variant</v-icon>
                </template>
                <v-list-item-title class="text-body-2">Explorer</v-list-item-title>
                <v-list-item-subtitle>
                  <a
                    :href="`https://cardona-zkevm.polygonscan.com/address/${contract.contractAddress}`"
                    target="_blank"
                    rel="noopener"
                    class="text-primary"
                  >
                    Ver en PolygonScan ↗
                  </a>
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="primary" size="small">mdi-shield-check-outline</v-icon>
                </template>
                <v-list-item-title class="text-body-2">Versión</v-list-item-title>
                <v-list-item-subtitle>CatalogsV0.5</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="primary" size="small">mdi-ethereum</v-icon>
                </template>
                <v-list-item-title class="text-body-2">Red</v-list-item-title>
                <v-list-item-subtitle>Polygon zkEVM Cardona Testnet (2442)</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="0" variant="outlined">
          <v-card-title class="d-flex align-center ga-2 pa-4">
            <IconClock :size="22" color="#7c4dff" stroke-width="1.5" />
            Uso por Entidad
          </v-card-title>
          <v-card-text>
            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span class="text-body-2">Catálogos</span>
                <span class="text-body-2 font-weight-bold">{{ kpis.catalogs }}</span>
              </div>
              <v-progress-linear
                :model-value="Math.min((kpis.catalogs / 10) * 100, 100)"
                color="#7c4dff"
                height="8"
                rounded
              />
            </div>
            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span class="text-body-2">Productos</span>
                <span class="text-body-2 font-weight-bold">{{ kpis.products }} / 10</span>
              </div>
              <v-progress-linear
                :model-value="Math.min((kpis.products / 10) * 100, 100)"
                :color="kpis.products >= 10 ? 'error' : '#00c853'"
                height="8"
                rounded
              />
            </div>
            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span class="text-body-2">Alertas</span>
                <span class="text-body-2 font-weight-bold">{{ kpis.alerts }} / 100</span>
              </div>
              <v-progress-linear
                :model-value="Math.min((kpis.alerts / 100) * 100, 100)"
                :color="kpis.alerts >= 100 ? 'error' : '#ff6d00'"
                height="8"
                rounded
              />
            </div>
            <v-alert type="info" variant="tonal" density="compact" class="mt-3">
              <strong>Plan Gratuito:</strong> 10 productos, 50 eventos, 100 alertas.
              <NuxtLink to="/#pricing" class="text-primary font-weight-bold">Actualizar →</NuxtLink>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.kpi-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
.kpi-icon-avatar {
  opacity: 0.9;
}
.tracking-wide {
  letter-spacing: 0.05em;
}
.font-mono {
  font-family: "Roboto Mono", monospace;
  word-break: break-all;
}
</style>
