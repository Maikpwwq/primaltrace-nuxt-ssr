<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { ref, computed } from "vue";
import { ethers } from "ethers";
import { useWalletStore } from "@/stores";
import { useNotificationStore } from "@/stores/notification";
import { storeToRefs } from "pinia";
import { formatAddress } from "@/utils";
import { grantRole, revokeRole } from "@/services/thridWeb/contractWriteInteract";
import {
  IconShieldCheck,
  IconUserPlus,
  IconUserMinus,
  IconLock,
} from "@tabler/icons-vue";

const storeWallet = useWalletStore();
const { wallet } = storeToRefs(storeWallet);
const notifyStore = useNotificationStore();

const isSubmitting = ref(false);
const targetAddress = ref("");
const selectedRole = ref("OPERATOR_ROLE");

const roleOptions = [
  { title: "Operador — Escribir productos, trazabilidad, alertas", value: "OPERATOR_ROLE" },
  { title: "Auditor — Acceso de lectura verificada", value: "AUDITOR_ROLE" },
];

const connectedAddress = computed(() =>
  wallet.value?.accounts?.[0] ? formatAddress(wallet.value.accounts[0]) : ""
);

const isValidAddress = computed(() => {
  return /^0x[a-fA-F0-9]{40}$/.test(targetAddress.value);
});

/**
 * Computes the keccak256 hash of a role name to match the Solidity constant.
 * e.g. keccak256("OPERATOR_ROLE") → same bytes32 as the contract's OPERATOR_ROLE constant.
 */
const getRoleHash = (roleName: string): string => {
  return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(roleName));
};

const handleGrantRole = async () => {
  if (!isValidAddress.value) {
    notifyStore.notify("Dirección de wallet inválida. Debe ser una dirección Ethereum válida (0x...).", "warning");
    return;
  }

  isSubmitting.value = true;
  try {
    const roleHash = getRoleHash(selectedRole.value);
    await grantRole(roleHash, targetAddress.value);
    notifyStore.notify(
      `Rol ${selectedRole.value} otorgado a ${targetAddress.value.slice(0, 10)}...`,
      "success"
    );
    targetAddress.value = "";
  } catch (err: any) {
    notifyStore.notify("Error al otorgar rol: " + (err.reason || err.message), "error");
  } finally {
    isSubmitting.value = false;
  }
};

const handleRevokeRole = async () => {
  if (!isValidAddress.value) {
    notifyStore.notify("Dirección de wallet inválida.", "warning");
    return;
  }

  isSubmitting.value = true;
  try {
    const roleHash = getRoleHash(selectedRole.value);
    await revokeRole(roleHash, targetAddress.value);
    notifyStore.notify(
      `Rol ${selectedRole.value} revocado de ${targetAddress.value.slice(0, 10)}...`,
      "warning"
    );
    targetAddress.value = "";
  } catch (err: any) {
    notifyStore.notify("Error al revocar rol: " + (err.reason || err.message), "error");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
<template>
  <div id="roleManager" class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
              Gestión de Roles
            </h2>
            <p class="text-muted mt-2">
              Administra los permisos de acceso al contrato inteligente. Solo el
              administrador del contrato (DEFAULT_ADMIN_ROLE) puede asignar o revocar roles.
            </p>
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-6" justify="center">
        <v-col cols="10" md="8">
          <v-card class="card-shadow mb-4 border rounded-sm" elevation="2">
            <v-card-title class="d-flex align-center ga-2 pa-4">
              <IconShieldCheck color="#7c4dff" :size="28" stroke-width="1.5" />
              <span>Control de Acceso (RBAC)</span>
            </v-card-title>

            <v-card-text>
              <v-alert type="info" variant="tonal" density="compact" class="mb-4">
                <strong>Tu wallet:</strong> {{ connectedAddress || "No conectada" }}
              </v-alert>

              <v-select
                v-model="selectedRole"
                :items="roleOptions"
                item-title="title"
                item-value="value"
                label="Selecciona un rol"
                variant="outlined"
                color="primary"
                class="mb-3"
              >
                <template #prepend-inner>
                  <IconLock color="#7c4dff" :size="20" stroke-width="1.5" />
                </template>
              </v-select>

              <v-text-field
                v-model="targetAddress"
                label="Dirección de wallet (0x...)"
                variant="outlined"
                color="primary"
                placeholder="0x0000000000000000000000000000000000000000"
                :error="targetAddress.length > 0 && !isValidAddress"
                :error-messages="
                  targetAddress.length > 0 && !isValidAddress
                    ? 'Dirección Ethereum inválida'
                    : ''
                "
                class="mb-3"
              ></v-text-field>

              <div class="d-flex ga-3 mt-2">
                <v-btn
                  color="success"
                  elevation="0"
                  :loading="isSubmitting"
                  :disabled="!isValidAddress"
                  @click="handleGrantRole"
                >
                  <IconUserPlus color="white" :size="22" stroke-width="1.5" class="mr-1" />
                  Otorgar Rol
                </v-btn>

                <v-btn
                  color="error"
                  variant="outlined"
                  elevation="0"
                  :loading="isSubmitting"
                  :disabled="!isValidAddress"
                  @click="handleRevokeRole"
                >
                  <IconUserMinus :size="22" stroke-width="1.5" class="mr-1" />
                  Revocar Rol
                </v-btn>
              </div>
            </v-card-text>

            <v-card-text class="pt-0">
              <v-divider class="my-3"></v-divider>
              <p class="text-caption text-muted">
                <strong>OPERATOR_ROLE:</strong> Puede agregar productos, registrar trazabilidad, actualizar stock y reportar alertas.<br />
                <strong>AUDITOR_ROLE:</strong> Acceso de lectura verificado para auditorías y cumplimiento normativo.<br />
                <strong>DEFAULT_ADMIN_ROLE:</strong> Puede crear catálogos, asociar códigos QR y gestionar roles.
              </p>
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
