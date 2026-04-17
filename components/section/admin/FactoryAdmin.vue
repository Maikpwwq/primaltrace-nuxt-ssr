<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useWalletStore } from "@/stores";
import { useSmartContract } from "@/stores/smart-contract";
import { useNotificationStore } from "@/stores/notification";
import { storeToRefs } from "pinia";
import {
  IconRocket,
  IconPlus,
  IconRefresh,
  IconExternalLink,
  IconCopy,
} from "@tabler/icons-vue";

const storeWallet = useWalletStore();
const { wallet } = storeToRefs(storeWallet);
const storeContract = useSmartContract();
const { contract } = storeToRefs(storeContract);
const notifyStore = useNotificationStore();

// ── State ───────────────────────────────────────────────────────────────
const loading = ref(false);
const deployedContracts = ref<
  Array<{
    address: string;
    catalogName: string;
    deployedAt: string;
    owner: string;
  }>
>([]);

// Deploy form
const deployForm = ref({
  catalogName: "",
  catalogDescription: "",
  catalogMetadata: "",
  catalogQrCode: "",
});

const isFormValid = computed(() => deployForm.value.catalogName.trim().length > 0);

const connectedAddress = computed(() => wallet.value?.accounts?.[0] ?? "");

// ── Contract Stats ──────────────────────────────────────────────────────
const stats = ref({
  totalDeployments: 0,
  userDeployments: 0,
  remainingDeployments: 0,
});

// ── Actions ─────────────────────────────────────────────────────────────

/**
 * Load user's deployed contracts from Factory.
 * TODO: Replace with actual factory.getUserContracts(address) when Factory is deployed.
 */
const loadContracts = async () => {
  loading.value = true;
  try {
    // TODO: const contracts = await factoryRead.getUserContracts(connectedAddress.value);
    // For now, check localStorage for previously deployed contracts
    const stored = localStorage.getItem("primal_deployed_contracts");
    if (stored) {
      deployedContracts.value = JSON.parse(stored);
    }

    stats.value = {
      totalDeployments: deployedContracts.value.length,
      userDeployments: deployedContracts.value.length,
      remainingDeployments: 3 - deployedContracts.value.length, // Free tier: 3 contracts
    };
  } catch (err) {
    console.error("FactoryAdmin: failed to load contracts", err);
  } finally {
    loading.value = false;
  }
};

/**
 * Deploy a new Catalogs instance via Factory.
 * TODO: Replace with actual factory.deployContract(...) when Factory is deployed.
 */
const handleDeploy = async () => {
  if (!isFormValid.value) {
    notifyStore.notify("El nombre del catálogo es requerido.", "warning");
    return;
  }

  loading.value = true;
  try {
    // TODO: Replace with Factory contract call
    // const salt = ethers.utils.randomBytes(32);
    // const addr = await factoryWrite.deployContract(
    //   deployForm.value.catalogName,
    //   deployForm.value.catalogDescription,
    //   deployForm.value.catalogMetadata,
    //   deployForm.value.catalogQrCode,
    //   salt
    // );

    notifyStore.notify(
      "⚠️ Factory aún no está desplegado. Usa el Dashboard para desplegar contratos directamente.",
      "warning"
    );
  } catch (err: any) {
    notifyStore.notify("Error al desplegar: " + (err.reason || err.message), "error");
  } finally {
    loading.value = false;
  }
};

const copyAddress = (address: string) => {
  navigator.clipboard.writeText(address);
  notifyStore.notify("Dirección copiada al portapapeles", "info");
};

const switchToContract = (address: string) => {
  storeContract.setContractAddress(address);
  notifyStore.notify(`Contrato activo cambiado a ${address.slice(0, 10)}...`, "success");
};

onMounted(loadContracts);
</script>

<template>
  <div id="factory-admin">
    <v-row>
      <!-- Factory Stats -->
      <v-col cols="12">
        <h3 class="text-h6 font-weight-bold mb-4">Factory — Despliegue de Contratos</h3>
        <v-alert type="info" variant="tonal" density="compact" class="mb-4">
          <strong>Estado:</strong> El contrato Factory (PrimalTraceFactory.sol) está diseñado
          pero aún no desplegado en Cardona. Las funciones de despliegue se activarán cuando
          el Factory esté en la red.
        </v-alert>
      </v-col>

      <!-- Deploy New Contract -->
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="0" variant="outlined">
          <v-card-title class="d-flex align-center ga-2 pa-4">
            <IconPlus :size="22" color="#7c4dff" stroke-width="1.5" />
            Desplegar Nuevo Contrato
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="deployForm.catalogName"
              label="Nombre del catálogo inicial *"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="mb-2"
            />
            <v-text-field
              v-model="deployForm.catalogDescription"
              label="Descripción"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="mb-2"
            />
            <v-text-field
              v-model="deployForm.catalogMetadata"
              label="Metadata URL (opcional)"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="mb-2"
            />
            <v-text-field
              v-model="deployForm.catalogQrCode"
              label="Código QR (opcional)"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="mb-3"
            />
            <v-btn
              color="primary"
              elevation="0"
              :loading="loading"
              :disabled="!isFormValid"
              @click="handleDeploy"
              block
            >
              <IconRocket :size="18" stroke-width="1.5" class="mr-1" />
              Desplegar vía Factory
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Deployed Contracts List -->
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="0" variant="outlined">
          <v-card-title class="d-flex align-center justify-space-between pa-4">
            <div class="d-flex align-center ga-2">
              <IconRocket :size="22" color="#7c4dff" stroke-width="1.5" />
              Mis Contratos
            </div>
            <v-btn icon variant="text" size="small" @click="loadContracts">
              <IconRefresh :size="18" stroke-width="1.5" />
            </v-btn>
          </v-card-title>
          <v-card-text>
            <!-- Stats summary -->
            <v-row dense class="mb-3">
              <v-col cols="4">
                <div class="text-center">
                  <p class="text-h5 font-weight-bold text-primary">
                    {{ stats.userDeployments }}
                  </p>
                  <p class="text-caption text-medium-emphasis">Desplegados</p>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="text-center">
                  <p class="text-h5 font-weight-bold text-success">
                    {{ Math.max(0, stats.remainingDeployments) }}
                  </p>
                  <p class="text-caption text-medium-emphasis">Disponibles</p>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="text-center">
                  <p class="text-h5 font-weight-bold text-info">3</p>
                  <p class="text-caption text-medium-emphasis">Límite Free</p>
                </div>
              </v-col>
            </v-row>

            <v-divider class="mb-3" />

            <!-- Contracts list -->
            <v-list
              v-if="deployedContracts.length > 0"
              density="compact"
              class="bg-transparent"
            >
              <v-list-item
                v-for="(c, i) in deployedContracts"
                :key="i"
                class="mb-2 rounded"
              >
                <v-list-item-title class="text-body-2 font-weight-medium">
                  {{ c.catalogName }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption font-mono">
                  {{ c.address }}
                </v-list-item-subtitle>
                <template #append>
                  <v-btn
                    icon
                    variant="text"
                    size="x-small"
                    @click="copyAddress(c.address)"
                  >
                    <IconCopy :size="16" stroke-width="1.5" />
                  </v-btn>
                  <v-btn
                    icon
                    variant="text"
                    size="x-small"
                    :href="`https://cardona-zkevm.polygonscan.com/address/${c.address}`"
                    target="_blank"
                  >
                    <IconExternalLink :size="16" stroke-width="1.5" />
                  </v-btn>
                  <v-btn
                    size="x-small"
                    color="primary"
                    variant="tonal"
                    @click="switchToContract(c.address)"
                  >
                    Usar
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>

            <v-alert
              v-else
              type="info"
              variant="tonal"
              density="compact"
            >
              No hay contratos desplegados aún. Usa el formulario para crear uno.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.font-mono {
  font-family: "Roboto Mono", monospace;
  word-break: break-all;
}
</style>
