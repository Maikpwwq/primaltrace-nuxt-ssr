<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Polygon from "/images/polygon-zkevm/main.svg";
import BaseTable from "./BaseTable.vue";
import PaginationControls from "@/components/shared/PaginationControls.vue";
import {
  getAlertsPaginated,
  getAlertCounter,
} from "@/services/thridWeb/contractReadInteract";
import { useNotificationStore } from "@/stores/notification";

const PAGE_SIZE = 10;

const headers = [
  { title: "ID", value: "alertId" },
  { title: "Producto", value: "productId" },
  { title: "Trazabilidad", value: "traceabilityId" },
  { title: "Tipo", value: "alertType" },
  { title: "Título", value: "alertTitle" },
  { title: "Subtítulo", value: "alertSubtitle" },
  { title: "Descripción", value: "alertDescription" },
  { title: "Parámetro", value: "alertParam" },
  { title: "Condición", value: "conditionalTrigguer" },
  { title: "Reportó", value: "reportedBy" },
  { title: "Resuelta", value: "resolved" },
  { title: "Fecha", value: "createdAt" },
];

const ALERT_TYPE_LABELS: Record<number, string> = {
  0: "Noticias",
  1: "Seguridad",
  2: "Eventos",
  3: "Producto",
};

const items = ref<Array<Record<string, any>>>([]);
const totalItems = ref(0);
const currentPage = ref(1);
const loading = ref(false);
const notify = useNotificationStore();

/**
 * Maps raw V0.5 AlertInfo struct to a flat table-friendly object.
 * The contract returns: (alertId, productId, traceabilityId, alertType,
 * alertTitle, alertSubtitle, alertDescription, alertParam,
 * conditionalTrigguer, reportedBy, resolved, createdAt)
 */
const mapAlert = (raw: any): Record<string, any> => ({
  alertId: Number(raw.alertId ?? raw[0]),
  productId: Number(raw.productId ?? raw[1]),
  traceabilityId: Number(raw.traceabilityId ?? raw[2]),
  alertType: ALERT_TYPE_LABELS[Number(raw.alertType ?? raw[3])] ?? String(raw[3]),
  alertTitle: raw.alertTitle ?? raw[4] ?? "",
  alertSubtitle: raw.alertSubtitle ?? raw[5] ?? "",
  alertDescription: raw.alertDescription ?? raw[6] ?? "",
  alertParam: raw.alertParam ?? raw[7] ?? "",
  conditionalTrigguer: raw.conditionalTrigguer ?? raw[8] ?? "",
  reportedBy: (() => {
    const addr = raw.reportedBy ?? raw[9] ?? "";
    return typeof addr === "string" && addr.length > 10
      ? `${addr.slice(0, 6)}…${addr.slice(-4)}`
      : addr;
  })(),
  resolved: (raw.resolved ?? raw[10]) ? "✅ Sí" : "❌ No",
  createdAt: raw.createdAt ?? raw[11]
    ? new Date(Number(raw.createdAt ?? raw[11]) * 1000).toLocaleDateString("es-CO")
    : "—",
});

const fetchPage = async (offset: number, limit: number) => {
  loading.value = true;
  try {
    const data = await getAlertsPaginated(offset, limit);
    items.value = (data ?? []).map(mapAlert);
  } catch (err: any) {
    console.error("AlertsResume: fetch failed", err);
    notify.notify(err.message || "Error al cargar alertas", "error");
    items.value = [];
  } finally {
    loading.value = false;
  }
};

const onPageChange = (payload: { page: number; offset: number; limit: number }) => {
  currentPage.value = payload.page;
  fetchPage(payload.offset, payload.limit);
};

onMounted(async () => {
  try {
    const count = await getAlertCounter();
    totalItems.value = Number(count);
  } catch {
    totalItems.value = 0;
  }
  if (totalItems.value > 0) {
    fetchPage(1, PAGE_SIZE);
  }
});
</script>

<template>
  <div id="alertsResume" class="py-5">
    <v-row justify="center">
      <v-col class="pa-0" cols="10">
        <div class="text-center mx-3">
          <h2 class="section-title font-weight-medium">
            <img
              :src="Polygon"
              class="logo-height"
              alt="logo smartChain polygon"
            />
            Consulta las alertas registradas en el contrato
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-9" justify="center">
      <v-col cols="10">
        <v-progress-linear
          v-if="loading"
          indeterminate
          color="primary"
          class="mb-4"
        />

        <div v-if="items.length > 0">
          <BaseTable :headers="headers" :items="items" />
          <PaginationControls
            v-model="currentPage"
            :total-items="totalItems"
            :page-size="PAGE_SIZE"
            @page-change="onPageChange"
          />
        </div>

        <v-alert
          v-else-if="!loading && totalItems === 0"
          type="info"
          variant="tonal"
          class="mt-4"
        >
          Aún no hay registros de alertas en este contrato inteligente.
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>
