<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { ref, reactive, computed } from "vue";
import { ethers } from "ethers";
import { useNotificationStore } from "@/stores/notification";
import { useSmartContract } from "@/stores/smart-contract";
import { storeToRefs } from "pinia";
import {
  getProduct,
  getProductIntegrityHash,
} from "@/services/thridWeb/contractReadInteract";
import {
  IconShieldCheck,
  IconSearch,
  IconCircleCheck,
  IconAlertTriangle,
  IconFingerprint,
} from "@tabler/icons-vue";

const notifyStore = useNotificationStore();
const storeContract = useSmartContract();
const { contractInfo } = storeToRefs(storeContract);

const isVerifying = ref(false);
const productIdInput = ref<number | undefined>(undefined);
const verificationResult = ref<"idle" | "verified" | "tampered" | "error">("idle");
const productDetails = reactive({
  productName: "",
  manufacturer: "",
  batchNumber: "",
  catalogId: 0,
  manufacturingDate: 0,
  productionLocation: "",
  integrityHash: "",
});

const productOptions = computed(() =>
  (contractInfo.value?.products || []).map((p: any) => ({
    title: `#${p.productId} — ${p.productName}`,
    value: p.productId,
  }))
);

const hasResult = computed(() => verificationResult.value !== "idle");

const handleVerify = async () => {
  if (!productIdInput.value || productIdInput.value <= 0) {
    notifyStore.notify("Ingresa un ID de producto válido.", "warning");
    return;
  }

  isVerifying.value = true;
  verificationResult.value = "idle";

  try {
    const product = await getProduct(productIdInput.value);

    if (!product || !product.productName) {
      verificationResult.value = "error";
      notifyStore.notify("Producto no encontrado en el contrato.", "error");
      return;
    }

    // Extract product info
    const name = product.productName || product[2] || "";
    const manufacturer = product.manufacturer || product[4] || "";
    const batchNumber = product.batchNumber || product[6] || "";

    productDetails.productName = name;
    productDetails.manufacturer = manufacturer;
    productDetails.batchNumber = batchNumber;
    productDetails.catalogId = Number(product.catalogId || product[1] || 0);
    productDetails.manufacturingDate = Number(product.manufacturingDate || product[5] || 0);
    productDetails.productionLocation = product.productionLocation || product[7] || "";

    // Fetch on-chain integrity hash
    const onChainHash = await getProductIntegrityHash(productIdInput.value);
    productDetails.integrityHash = onChainHash;

    // Compute client-side hash: keccak256(abi.encodePacked(name, manufacturer, batchNumber))
    const clientHash = ethers.utils.solidityKeccak256(
      ["string", "string", "string"],
      [name, manufacturer, batchNumber]
    );

    // Compare hashes
    if (clientHash === onChainHash) {
      verificationResult.value = "verified";
      notifyStore.notify("✅ Integridad verificada — los datos coinciden con la blockchain.", "success");
    } else {
      verificationResult.value = "tampered";
      notifyStore.notify("❌ Los datos no coinciden con el hash de integridad en la blockchain.", "error");
    }
  } catch (err: any) {
    verificationResult.value = "error";
    notifyStore.notify(
      "Error al verificar producto: " + (err.reason || err.message),
      "error"
    );
  } finally {
    isVerifying.value = false;
  }
};

const formatTimestamp = (ts: number) => {
  if (!ts || ts === 0) return "N/A";
  return new Date(ts * 1000).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const resetVerification = () => {
  verificationResult.value = "idle";
  productIdInput.value = undefined;
  productDetails.productName = "";
  productDetails.manufacturer = "";
  productDetails.batchNumber = "";
  productDetails.catalogId = 0;
  productDetails.manufacturingDate = 0;
  productDetails.productionLocation = "";
  productDetails.integrityHash = "";
};
</script>
<template>
  <div id="verifyProduct" class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Verificación de Integridad
            </h2>
            <p class="text-muted mt-2">
              Verifica que los datos de un producto no han sido manipulados comparando
              el hash de integridad almacenado en la blockchain.
            </p>
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-6" justify="center">
        <v-col cols="10" md="8">
          <v-card class="card-shadow mb-4 border rounded-sm" elevation="2">
            <v-card-title class="d-flex align-center ga-2 pa-4">
              <IconFingerprint color="#7c4dff" :size="28" stroke-width="1.5" />
              <span>Verificar Producto</span>
            </v-card-title>

            <v-card-text>
              <v-autocomplete
                v-model="productIdInput"
                :items="productOptions"
                item-title="title"
                item-value="value"
                label="Selecciona o ingresa ID del producto"
                variant="outlined"
                color="primary"
                clearable
                class="mb-3"
              >
                <template #prepend-inner>
                  <IconSearch color="#7c4dff" :size="20" stroke-width="1.5" />
                </template>
              </v-autocomplete>

              <div class="d-flex ga-3">
                <v-btn
                  color="primary"
                  elevation="0"
                  :loading="isVerifying"
                  :disabled="!productIdInput"
                  @click="handleVerify"
                >
                  <IconShieldCheck color="white" :size="22" stroke-width="1.5" class="mr-1" />
                  Verificar Integridad
                </v-btn>

                <v-btn
                  v-if="hasResult"
                  variant="outlined"
                  color="secondary"
                  elevation="0"
                  @click="resetVerification"
                >
                  Limpiar
                </v-btn>
              </div>
            </v-card-text>

            <!-- Verification Result -->
            <v-card-text v-if="hasResult">
              <v-divider class="mb-4"></v-divider>

              <!-- Verified -->
              <v-alert
                v-if="verificationResult === 'verified'"
                type="success"
                variant="tonal"
                prominent
                class="mb-4"
              >
                <template #prepend>
                  <IconCircleCheck :size="32" stroke-width="1.5" />
                </template>
                <strong>✅ Integridad Verificada</strong><br />
                Los datos del producto coinciden con el hash almacenado en la blockchain.
                Este producto no ha sido manipulado.
              </v-alert>

              <!-- Tampered -->
              <v-alert
                v-if="verificationResult === 'tampered'"
                type="error"
                variant="tonal"
                prominent
                class="mb-4"
              >
                <template #prepend>
                  <IconAlertTriangle :size="32" stroke-width="1.5" />
                </template>
                <strong>❌ Integridad Comprometida</strong><br />
                Los datos del producto NO coinciden con el hash almacenado en la blockchain.
                Este producto podría haber sido manipulado.
              </v-alert>

              <!-- Error -->
              <v-alert
                v-if="verificationResult === 'error'"
                type="warning"
                variant="tonal"
                class="mb-4"
              >
                No se pudo verificar el producto. Asegúrate de que el ID es correcto y
                que estás conectado al contrato.
              </v-alert>

              <!-- Product Details Card -->
              <v-card
                v-if="verificationResult !== 'error'"
                variant="outlined"
                class="pa-4"
              >
                <h4 class="mb-3 font-weight-medium">Datos del Producto</h4>
                <v-table density="compact">
                  <tbody>
                    <tr>
                      <td class="font-weight-bold">Nombre</td>
                      <td>{{ productDetails.productName }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Fabricante</td>
                      <td>{{ productDetails.manufacturer }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Nº de Lote</td>
                      <td>{{ productDetails.batchNumber }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Catálogo ID</td>
                      <td>{{ productDetails.catalogId }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Fecha de Fabricación</td>
                      <td>{{ formatTimestamp(productDetails.manufacturingDate) }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Ubicación de Producción</td>
                      <td>{{ productDetails.productionLocation }}</td>
                    </tr>
                    <tr v-if="productDetails.integrityHash">
                      <td class="font-weight-bold">Hash de Integridad</td>
                      <td class="text-caption" style="word-break: break-all;">
                        {{ productDetails.integrityHash }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.logo-height {
  height: 33px;
}
</style>
