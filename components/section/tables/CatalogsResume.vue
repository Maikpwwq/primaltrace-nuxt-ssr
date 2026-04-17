<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Polygon from "/images/polygon-zkevm/main.svg";
import BaseTable from "./BaseTable.vue";
import PaginationControls from "@/components/shared/PaginationControls.vue";
import {
  getCatalogsPaginated,
  getCatalogCounter,
} from "@/services/thridWeb/contractReadInteract";
import { useNotificationStore } from "@/stores/notification";

const PAGE_SIZE = 10;

const headers = [
  { title: "ID", value: "catalogId" },
  { title: "Nombre", value: "catalogName" },
  { title: "Descripción", value: "catalogDescription" },
  { title: "#Productos", value: "productCount" },
  { title: "Metadata", value: "catalogMetadata" },
  { title: "Código QR", value: "catalogQrCode" },
  { title: "Creado", value: "creationDate" },
];

const items = ref<Array<Record<string, any>>>([]);
const totalItems = ref(0);
const currentPage = ref(1);
const loading = ref(false);
const notify = useNotificationStore();

/**
 * Maps raw V0.5 Catalog struct (returned by getCatalogsPaginated) to a flat object.
 * ThirdWeb SDK returns structs as objects with named properties.
 */
const mapCatalog = (raw: any): Record<string, any> => ({
  catalogId: Number(raw.catalogId ?? raw[0]),
  catalogName: raw.catalogName ?? raw[1] ?? "",
  catalogDescription: raw.catalogDescription ?? raw[2] ?? "",
  productCount: raw.products?.length ?? raw[5]?.length ?? 0,
  catalogMetadata: raw.catalogMetadata ?? raw[6] ?? "",
  catalogQrCode: raw.catalogQrCode ?? raw[7] ?? "",
  creationDate: raw.createdAt ?? raw[3]
    ? new Date(Number(raw.createdAt ?? raw[3]) * 1000).toLocaleDateString("es-CO")
    : "—",
});

const fetchPage = async (offset: number, limit: number) => {
  loading.value = true;
  try {
    const data = await getCatalogsPaginated(offset, limit);
    items.value = (data ?? []).map(mapCatalog);
  } catch (err: any) {
    console.error("CatalogsResume: fetch failed", err);
    notify.notify(err.message || "Error al cargar catálogos", "error");
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
    const count = await getCatalogCounter();
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
  <div id="catalogsResume" class="py-5">
    <v-row justify="center">
      <v-col class="pa-0" cols="10">
        <div class="text-center mx-3">
          <h2 class="section-title font-weight-medium">
            <img
              :src="Polygon"
              class="logo-height"
              alt="logo smartChain polygon"
            />
            Consulta detalles de los catálogos del contrato
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
          Aún no hay registrado ningún catálogo en este contrato inteligente.
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>
