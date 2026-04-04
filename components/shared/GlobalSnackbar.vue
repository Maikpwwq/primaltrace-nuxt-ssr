<script setup lang="ts">
import { useNotificationStore } from "@/stores/notification";
import { storeToRefs } from "pinia";
import { IconCheck, IconX, IconAlertTriangle, IconInfoCircle } from "@tabler/icons-vue";

const notificationStore = useNotificationStore();
const { show, message, color, icon } = storeToRefs(notificationStore);
</script>

<template>
  <v-snackbar
    v-model="show"
    :color="color"
    elevation="24"
    :timeout="5000"
    location="top"
  >
    <div class="d-flex align-center">
      <v-avatar size="32" class="mr-3" v-if="color === 'success'">
        <IconCheck color="white" />
      </v-avatar>
      <v-avatar size="32" class="mr-3" v-else-if="color === 'error'">
        <IconX color="white" />
      </v-avatar>
      <v-avatar size="32" class="mr-3" v-else-if="color === 'warning'">
        <IconAlertTriangle color="white" />
      </v-avatar>
      <v-avatar size="32" class="mr-3" v-else>
        <IconInfoCircle color="white" />
      </v-avatar>
      <span class="text-white font-weight-medium">{{ message }}</span>
    </div>

    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="notificationStore.close()"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>
