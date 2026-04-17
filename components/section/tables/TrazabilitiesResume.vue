<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import Polygon from "/images/polygon-zkevm/main.svg";
import BaseTable from "./BaseTable.vue";
import PaginationControls from "@/components/shared/PaginationControls.vue";
import {
  getProductCounter,
  getProduct,
  getProductTraceabilityInfo,
} from "@/services/thridWeb/contractReadInteract";
import { useNotificationStore } from "@/stores/notification";

const PAGE_SIZE = 10;

const ACTOR_TYPE_LABELS: Record<number, string> = {
  0: "Fabricante",
  1: "Distribuidor",
  2: "Minorista",
  3: "Inspector",
  4: "Consumidor",
};

const headers = [
  { title: "ID", value: "traceId" },
  { title: "Acción", value: "action" },
  { title: "Fecha", value: "timestamp" },
  { title: "Actor", value: "actor" },
  { title: "Tipo Actor", value: "actorType" },
  { title: "Actor ID", value: "actorId" },
  { title: "Metadata", value: "metadataAction" },
  { title: "Certificación", value: "certificationType" },
  { title: "Fecha Cert.", value: "certificationDate" },
  { title: "Resultado", value: "certificationResult" },
];

// Product selection
const products = ref<Array<{ title: string; value: number }>>([]);
const selectedProductId = ref<number | null>(null);
const loadingProducts = ref(false);

// Traceability entries for selected product
const items = ref<Array<Record<string, any>>>([]);
const totalItems = ref(0);
const currentPage = ref(1);
const loading = ref(false);
const notify = useNotificationStore();

// Full traceability data cached for client-side pagination
let cachedTraceData: any[] = [];

/**
 * Maps raw V0.5 TraceabilityInfo struct to a flat table-friendly object.
 * Contract struct: (traceId, action, timestamp, actor, actorType,
 * actorId, metadataAction, productId, certificationType,
 * certificationDate, certificationResult)
 */
const mapTrace = (raw: any): Record<string, any> => ({
  traceId: Number(raw.traceId ?? raw[0]),
  action: raw.action ?? raw[1] ?? "",
  timestamp: raw.timestamp ?? raw[2]
    ? new Date(Number(raw.timestamp ?? raw[2]) * 1000).toLocaleDateString("es-CO")
    : "—",
  actor: (() => {
    const addr = raw.actor ?? raw[3] ?? "";
    return typeof addr === "string" && addr.length > 10
      ? `${addr.slice(0, 6)}…${addr.slice(-4)}`
      : addr;
  })(),
  actorType: ACTOR_TYPE_LABELS[Number(raw.actorType ?? raw[4])] ?? String(raw[4]),
  actorId: raw.actorId ?? raw[5] ?? "",
  metadataAction: raw.metadataAction ?? raw[6] ?? "",
  certificationType: raw.certificationType ?? raw[8] ?? "",
  certificationDate: raw.certificationDate ?? raw[9]
    ? new Date(Number(raw.certificationDate ?? raw[9]) * 1000).toLocaleDateString("es-CO")
    : "—",
  certificationResult: raw.certificationResult ?? raw[10] ?? "",
});

/**
 * Load product dropdown options on mount.
 * Fetches up to 50 products for the selector.
 */
const loadProducts = async () => {
  loadingProducts.value = true;
  try {
    const count = await getProductCounter();
    const total = Number(count);
    if (total === 0) return;

    const productList: Array<{ title: string; value: number }> = [];
    const limit = Math.min(total, 50);
    for (let i = 1; i <= limit; i++) {
      try {
        const p = await getProduct(i);
        productList.push({
          title: `#${i} — ${p.productName ?? p[2] ?? "Sin nombre"}`,
          value: i,
        });
      } catch {
        // Product may not exist at this ID
      }
    }
    products.value = productList;
  } catch (err: any) {
    console.error("TrazabilitiesResume: failed to load products", err);
  } finally {
    loadingProducts.value = false;
  }
};

/**
 * Fetch traceability entries for the selected product.
 * Uses getProductTraceabilityInfo(productId) and applies client-side pagination.
 */
const fetchTraceability = async () => {
  if (!selectedProductId.value) return;
  loading.value = true;
  items.value = [];

  try {
    const data = await getProductTraceabilityInfo(selectedProductId.value);
    cachedTraceData = data ?? [];
    totalItems.value = cachedTraceData.length;
    applyClientPagination();
  } catch (err: any) {
    console.error("TrazabilitiesResume: fetch failed", err);
    notify.notify(err.message || "Error al cargar trazabilidad", "error");
    items.value = [];
    totalItems.value = 0;
  } finally {
    loading.value = false;
  }
};

const applyClientPagination = () => {
  const start = (currentPage.value - 1) * PAGE_SIZE;
  const page = cachedTraceData.slice(start, start + PAGE_SIZE);
  items.value = page.map(mapTrace);
};

const onPageChange = (payload: { page: number; offset: number; limit: number }) => {
  currentPage.value = payload.page;
  applyClientPagination();
};

watch(selectedProductId, () => {
  currentPage.value = 1;
  cachedTraceData = [];
  fetchTraceability();
});

onMounted(loadProducts);
</script>

<template>
  <div id="trazabilitiesResume" class="py-5">
    <v-row justify="center">
      <v-col class="pa-0" cols="10">
        <div class="text-center mx-3">
          <h2 class="section-title font-weight-medium">
            <img
              :src="Polygon"
              class="logo-height"
              alt="logo smartChain polygon"
            />
            Consulta toda la información de trazabilidad asociada con un
            producto del catálogo
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-9" justify="center">
      <v-col cols="10">
        <v-autocomplete
          v-model="selectedProductId"
          :items="products"
          :loading="loadingProducts"
          label="Selecciona un producto"
          placeholder="Busca o elige un producto"
          variant="outlined"
          color="primary"
          density="comfortable"
          clearable
          no-data-text="No hay productos disponibles"
          class="mb-4"
        />

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
          v-else-if="!loading && selectedProductId && totalItems === 0"
          type="info"
          variant="tonal"
          class="mt-4"
        >
          Aún no hay registros de trazabilidad para este producto.
        </v-alert>

        <v-alert
          v-else-if="!loading && !selectedProductId"
          type="info"
          variant="tonal"
          class="mt-4"
        >
          Selecciona un producto para ver su información de trazabilidad.
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>
