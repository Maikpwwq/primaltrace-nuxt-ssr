<script setup lang="ts">
import { ref, computed } from "vue";
import { ethers } from "ethers";
import { useWalletStore } from "@/stores";
import { useNotificationStore } from "@/stores/notification";
import { storeToRefs } from "pinia";
import {
  IconUsers,
  IconCrown,
  IconSearch,
  IconCheck,
  IconX,
} from "@tabler/icons-vue";

const storeWallet = useWalletStore();
const { wallet } = storeToRefs(storeWallet);
const notifyStore = useNotificationStore();

// ── Tier Definitions ────────────────────────────────────────────────────
const TIERS = {
  free: {
    name: "Gratuito",
    products: 10,
    events: 50,
    alerts: 100,
    color: "#78909c",
    icon: IconUsers,
  },
  enterprise: {
    name: "Enterprise",
    products: null, // Configurable
    events: null,
    alerts: null,
    color: "#7c4dff",
    icon: IconCrown,
  },
};

// ── State ───────────────────────────────────────────────────────────────
const isSubmitting = ref(false);
const lookupAddress = ref("");
const lookupResult = ref<{
  address: string;
  tier: string;
  products: number;
  events: number;
  alerts: number;
} | null>(null);

// Admin form for setting enterprise limits
const tierForm = ref({
  address: "",
  products: 100,
  events: 500,
  alerts: 1000,
});

const isValidAddress = computed(() =>
  /^0x[a-fA-F0-9]{40}$/.test(tierForm.value.address)
);

const isValidLookupAddress = computed(() =>
  /^0x[a-fA-F0-9]{40}$/.test(lookupAddress.value)
);

// ── Actions ─────────────────────────────────────────────────────────────

/**
 * Look up a user's current tier and usage.
 * When the Factory contract is deployed, this will call factory.usage(address) and factory.tierLimits(address).
 * For now, it returns mock free tier data.
 */
const handleLookup = async () => {
  if (!isValidLookupAddress.value) {
    notifyStore.notify("Dirección de wallet inválida.", "warning");
    return;
  }

  isSubmitting.value = true;
  try {
    // TODO: Replace with factory.usage(lookupAddress.value) when Factory is deployed
    // const usage = await getUsage(lookupAddress.value);
    // const limits = await getTierLimits(lookupAddress.value);

    lookupResult.value = {
      address: lookupAddress.value,
      tier: "Gratuito", // Will be determined by factory.tierLimits
      products: 0, // Will come from factory.usage
      events: 0,
      alerts: 0,
    };
    notifyStore.notify("Información de usuario cargada", "info");
  } catch (err: any) {
    notifyStore.notify("Error al consultar usuario: " + err.message, "error");
  } finally {
    isSubmitting.value = false;
  }
};

/**
 * Set enterprise tier limits for a user.
 * When Factory is deployed, this calls: factory.setTierLimit(address, products, events, alerts)
 */
const handleSetTier = async () => {
  if (!isValidAddress.value) {
    notifyStore.notify("Dirección de wallet inválida.", "warning");
    return;
  }

  isSubmitting.value = true;
  try {
    // TODO: Replace with actual Factory contract call when deployed
    // await setTierLimit(
    //   tierForm.value.address,
    //   tierForm.value.products,
    //   tierForm.value.events,
    //   tierForm.value.alerts
    // );

    notifyStore.notify(
      `Límites Enterprise configurados para ${tierForm.value.address.slice(0, 10)}... — ` +
      `${tierForm.value.products} productos, ${tierForm.value.events} eventos, ${tierForm.value.alerts} alertas`,
      "success"
    );

    tierForm.value.address = "";
  } catch (err: any) {
    notifyStore.notify("Error al configurar tier: " + (err.reason || err.message), "error");
  } finally {
    isSubmitting.value = false;
  }
};

/**
 * Reset a user back to free tier.
 */
const handleResetToFree = async () => {
  if (!isValidAddress.value) {
    notifyStore.notify("Dirección de wallet inválida.", "warning");
    return;
  }

  isSubmitting.value = true;
  try {
    // TODO: factory.setTierLimit(address, 10, 50, 100) when Factory deployed
    notifyStore.notify(
      `Usuario ${tierForm.value.address.slice(0, 10)}... restablecido al plan Gratuito`,
      "warning"
    );
    tierForm.value.address = "";
  } catch (err: any) {
    notifyStore.notify("Error al restablecer tier: " + err.message, "error");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div id="tier-manager">
    <v-row>
      <!-- Tier Overview -->
      <v-col cols="12">
        <h3 class="text-h6 font-weight-bold mb-4">Planes y Límites de Uso</h3>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card
              class="rounded-lg tier-card"
              elevation="0"
              variant="outlined"
              :style="{ borderColor: TIERS.free.color }"
            >
              <v-card-title class="d-flex align-center ga-2">
                <v-avatar :color="TIERS.free.color" size="36">
                  <IconUsers :size="20" color="white" stroke-width="1.5" />
                </v-avatar>
                Plan Gratuito
              </v-card-title>
              <v-card-text>
                <v-list density="compact" class="bg-transparent">
                  <v-list-item prepend-icon="mdi-package-variant">
                    <v-list-item-title>{{ TIERS.free.products }} productos</v-list-item-title>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-timeline-text">
                    <v-list-item-title>{{ TIERS.free.events }} eventos de trazabilidad</v-list-item-title>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-alert-circle-outline">
                    <v-list-item-title>{{ TIERS.free.alerts }} alertas</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card
              class="rounded-lg tier-card"
              elevation="0"
              variant="outlined"
              :style="{ borderColor: TIERS.enterprise.color }"
            >
              <v-card-title class="d-flex align-center ga-2">
                <v-avatar :color="TIERS.enterprise.color" size="36">
                  <IconCrown :size="20" color="white" stroke-width="1.5" />
                </v-avatar>
                Plan Enterprise
              </v-card-title>
              <v-card-text>
                <v-list density="compact" class="bg-transparent">
                  <v-list-item prepend-icon="mdi-infinity">
                    <v-list-item-title>Productos configurables</v-list-item-title>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-infinity">
                    <v-list-item-title>Eventos configurables</v-list-item-title>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-infinity">
                    <v-list-item-title>Alertas configurables</v-list-item-title>
                  </v-list-item>
                </v-list>
                <v-chip color="primary" variant="tonal" size="small" class="mt-2">
                  Precio por alcance del proyecto
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Lookup User -->
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="0" variant="outlined">
          <v-card-title class="d-flex align-center ga-2 pa-4">
            <IconSearch :size="22" color="#7c4dff" stroke-width="1.5" />
            Consultar Usuario
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="lookupAddress"
              label="Dirección de wallet (0x...)"
              variant="outlined"
              color="primary"
              density="comfortable"
              placeholder="0x0000...0000"
              :error="lookupAddress.length > 0 && !isValidLookupAddress"
              class="mb-3"
            />
            <v-btn
              color="primary"
              elevation="0"
              :loading="isSubmitting"
              :disabled="!isValidLookupAddress"
              @click="handleLookup"
              block
            >
              <IconSearch :size="18" stroke-width="1.5" class="mr-1" />
              Consultar
            </v-btn>

            <!-- Lookup Result -->
            <v-alert
              v-if="lookupResult"
              type="info"
              variant="tonal"
              class="mt-4"
              density="compact"
            >
              <p class="mb-1"><strong>Plan:</strong> {{ lookupResult.tier }}</p>
              <p class="mb-1"><strong>Productos:</strong> {{ lookupResult.products }} / {{ TIERS.free.products }}</p>
              <p class="mb-1"><strong>Eventos:</strong> {{ lookupResult.events }} / {{ TIERS.free.events }}</p>
              <p class="mb-0"><strong>Alertas:</strong> {{ lookupResult.alerts }} / {{ TIERS.free.alerts }}</p>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Set Enterprise Limits -->
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="0" variant="outlined">
          <v-card-title class="d-flex align-center ga-2 pa-4">
            <IconCrown :size="22" color="#7c4dff" stroke-width="1.5" />
            Configurar Límites Enterprise
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="tierForm.address"
              label="Dirección del usuario (0x...)"
              variant="outlined"
              color="primary"
              density="comfortable"
              :error="tierForm.address.length > 0 && !isValidAddress"
              class="mb-2"
            />
            <v-row dense>
              <v-col cols="4">
                <v-text-field
                  v-model.number="tierForm.products"
                  label="Productos"
                  type="number"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :min="1"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model.number="tierForm.events"
                  label="Eventos"
                  type="number"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :min="1"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model.number="tierForm.alerts"
                  label="Alertas"
                  type="number"
                  variant="outlined"
                  color="primary"
                  density="compact"
                  :min="1"
                />
              </v-col>
            </v-row>
            <div class="d-flex ga-3 mt-2">
              <v-btn
                color="primary"
                elevation="0"
                :loading="isSubmitting"
                :disabled="!isValidAddress"
                @click="handleSetTier"
              >
                <IconCheck :size="18" stroke-width="1.5" class="mr-1" />
                Aplicar Enterprise
              </v-btn>
              <v-btn
                color="warning"
                variant="outlined"
                elevation="0"
                :loading="isSubmitting"
                :disabled="!isValidAddress"
                @click="handleResetToFree"
              >
                <IconX :size="18" stroke-width="1.5" class="mr-1" />
                Restablecer a Gratuito
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.tier-card {
  transition: transform 0.2s ease;
}
.tier-card:hover {
  transform: translateY(-2px);
}
</style>
