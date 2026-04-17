<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import Polygon from "/images/polygon-zkevm/main.svg";
import BaseTable from "./BaseTable.vue";
import PaginationControls from "@/components/shared/PaginationControls.vue";
import {
  getCatalogsPaginated,
  getCatalogCounter,
  getCatalog,
} from "@/services/thridWeb/contractReadInteract";
import { useNotificationStore } from "@/stores/notification";

const PAGE_SIZE = 10;

const headers = [
  { title: "ID", value: "productId" },
  { title: "Nombre", value: "productName" },
  { title: "Descripción", value: "productDescription" },
  { title: "Fabricante", value: "manufacturer" },
  { title: "Lote", value: "batchNumber" },
  { title: "Ubicación", value: "productionLocation" },
  { title: "Metadata", value: "metadataProducto" },
  { title: "QR", value: "productQrCode" },
  { title: "#Trazabilidad", value: "traceabilityCount" },
];

// Catalog selection
const catalogs = ref<Array<{ title: string; value: number }>>([]);
const selectedCatalogId = ref<number | null>(null);
const loadingCatalogs = ref(false);

// Products for selected catalog
const items = ref<Array<Record<string, any>>>([]);
const totalItems = ref(0);
const currentPage = ref(1);
const loading = ref(false);
const notify = useNotificationStore();

/**
 * Maps raw V0.5 Product struct to a flat table-friendly object.
 * Contract struct: (productId, catalogId, productName, productDescription,
 * manufacturer, manufacturingDate, batchNumber, productionLocation,
 * metadataProducto, productQrCode, lastModifiedAt, traceabilityInfo[])
 */
const mapProduct = (raw: any): Record<string, any> => ({
  productId: Number(raw.productId ?? raw[0]),
  productName: raw.productName ?? raw[2] ?? "",
  productDescription: raw.productDescription ?? raw[3] ?? "",
  manufacturer: raw.manufacturer ?? raw[4] ?? "",
  batchNumber: raw.batchNumber ?? raw[6] ?? "",
  productionLocation: raw.productionLocation ?? raw[7] ?? "",
  metadataProducto: raw.metadataProducto ?? raw[8] ?? "",
  productQrCode: raw.productQrCode ?? raw[9] ?? "",
  traceabilityCount: raw.traceabilityInfo?.length ?? raw[11]?.length ?? 0,
});

/**
 * Load catalog dropdown options on mount.
 * Uses getCatalogsPaginated to get up to 50 catalogs for the selector.
 */
const loadCatalogs = async () => {
  loadingCatalogs.value = true;
  try {
    const count = await getCatalogCounter();
    const total = Number(count);
    if (total === 0) return;
    const data = await getCatalogsPaginated(1, Math.min(total, 50));
    catalogs.value = (data ?? []).map((c: any) => ({
      title: `#${Number(c.catalogId ?? c[0])} — ${c.catalogName ?? c[1] ?? "Sin nombre"}`,
      value: Number(c.catalogId ?? c[0]),
    }));
  } catch (err: any) {
    console.error("ProductsResume: failed to load catalogs", err);
  } finally {
    loadingCatalogs.value = false;
  }
};

/**
 * Fetch products for the selected catalog.
 * Products are embedded in the Catalog struct (products[] field / field index 5),
 * so we use getCatalog(catalogId) and extract the products array.
 * Client-side pagination is applied since products are per-catalog.
 */
const fetchProducts = async () => {
  if (!selectedCatalogId.value) return;
  loading.value = true;
  items.value = [];

  try {
    const catalog = await getCatalog(selectedCatalogId.value);
    // catalog.products is an array of product IDs — but we need the full Product structs
    // The V0.5 contract's getProduct(productId) returns the full struct
    // For efficiency, we'll display what the catalog provides and map product IDs
    const productIds: number[] = (catalog.products ?? catalog[5] ?? []).map(Number);
    totalItems.value = productIds.length;

    // Client-side pagination
    const start = (currentPage.value - 1) * PAGE_SIZE;
    const pageIds = productIds.slice(start, start + PAGE_SIZE);

    // Fetch each product's full data
    const { getProduct } = await import("@/services/thridWeb/contractReadInteract");
    const products = await Promise.all(
      pageIds.map(async (id) => {
        try {
          return await getProduct(id);
        } catch {
          return null;
        }
      })
    );

    items.value = products.filter(Boolean).map(mapProduct);
  } catch (err: any) {
    console.error("ProductsResume: fetch failed", err);
    notify.notify(err.message || "Error al cargar productos", "error");
    items.value = [];
    totalItems.value = 0;
  } finally {
    loading.value = false;
  }
};

const onPageChange = (payload: { page: number; offset: number; limit: number }) => {
  currentPage.value = payload.page;
  fetchProducts();
};

watch(selectedCatalogId, () => {
  currentPage.value = 1;
  fetchProducts();
});

onMounted(loadCatalogs);
</script>

<template>
  <div id="productsResume" class="py-5">
    <v-row justify="center">
      <v-col class="pa-0" cols="10">
        <div class="text-center mx-3">
          <h2 class="section-title font-weight-medium">
            <img
              :src="Polygon"
              class="logo-height"
              alt="logo smartChain polygon"
            />
            Consulta los productos registrados en el contrato
          </h2>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-9" justify="center">
      <v-col cols="10">
        <v-autocomplete
          v-model="selectedCatalogId"
          :items="catalogs"
          :loading="loadingCatalogs"
          label="Selecciona un catálogo"
          placeholder="Busca o elige un catálogo"
          variant="outlined"
          color="primary"
          density="comfortable"
          clearable
          no-data-text="No hay catálogos disponibles"
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
          v-else-if="!loading && selectedCatalogId && totalItems === 0"
          type="info"
          variant="tonal"
          class="mt-4"
        >
          Aún no hay productos registrados en este catálogo.
        </v-alert>

        <v-alert
          v-else-if="!loading && !selectedCatalogId"
          type="info"
          variant="tonal"
          class="mt-4"
        >
          Selecciona un catálogo para ver sus productos.
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>
