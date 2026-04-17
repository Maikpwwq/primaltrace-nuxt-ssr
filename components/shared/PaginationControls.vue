<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-vue";

interface Props {
  totalItems: number;
  pageSize?: number;
  modelValue?: number; // current page (1-based)
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 50,
  modelValue: 1,
});

const emit = defineEmits<{
  (e: "update:modelValue", page: number): void;
  (e: "page-change", payload: { page: number; offset: number; limit: number }): void;
}>();

const currentPage = ref(props.modelValue);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.totalItems / props.pageSize))
);

const offset = computed(() => (currentPage.value - 1) * props.pageSize + 1);

const displayRange = computed(() => {
  const start = offset.value;
  const end = Math.min(start + props.pageSize - 1, props.totalItems);
  return `${start}–${end} de ${props.totalItems}`;
});

const canGoPrev = computed(() => currentPage.value > 1);
const canGoNext = computed(() => currentPage.value < totalPages.value);

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  emit("update:modelValue", page);
  emit("page-change", {
    page,
    offset: (page - 1) * props.pageSize + 1,
    limit: props.pageSize,
  });
};

const goFirst = () => goToPage(1);
const goPrev = () => goToPage(currentPage.value - 1);
const goNext = () => goToPage(currentPage.value + 1);
const goLast = () => goToPage(totalPages.value);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== currentPage.value) currentPage.value = newVal;
  }
);

watch(
  () => props.totalItems,
  () => {
    if (currentPage.value > totalPages.value) {
      goToPage(totalPages.value);
    }
  }
);
</script>
<template>
  <div class="pagination-controls d-flex align-center justify-space-between flex-wrap ga-2 py-2">
    <span class="text-caption text-muted">
      {{ displayRange }}
    </span>

    <div class="d-flex align-center ga-1">
      <v-btn
        icon
        variant="text"
        size="small"
        :disabled="!canGoPrev"
        @click="goFirst"
        aria-label="Primera página"
      >
        <IconChevronsLeft :size="18" stroke-width="1.5" />
      </v-btn>

      <v-btn
        icon
        variant="text"
        size="small"
        :disabled="!canGoPrev"
        @click="goPrev"
        aria-label="Página anterior"
      >
        <IconChevronLeft :size="18" stroke-width="1.5" />
      </v-btn>

      <v-chip
        variant="tonal"
        color="primary"
        size="small"
        class="mx-1"
      >
        {{ currentPage }} / {{ totalPages }}
      </v-chip>

      <v-btn
        icon
        variant="text"
        size="small"
        :disabled="!canGoNext"
        @click="goNext"
        aria-label="Página siguiente"
      >
        <IconChevronRight :size="18" stroke-width="1.5" />
      </v-btn>

      <v-btn
        icon
        variant="text"
        size="small"
        :disabled="!canGoNext"
        @click="goLast"
        aria-label="Última página"
      >
        <IconChevronsRight :size="18" stroke-width="1.5" />
      </v-btn>
    </div>
  </div>
</template>
<style scoped>
.pagination-controls {
  min-height: 40px;
}
</style>
