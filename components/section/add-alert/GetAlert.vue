<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { ref, reactive } from "vue";
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'
import type { AlertInfo } from "@/schemas/index"

const storeContract = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { contract, contractInfo, hasContract, error, errorMessage, isConnecting } = storeToRefs(storeContract) // Destructuring from a Store 
// actions can just be destructured
const { setContract, setTraceabilityInfo, setHasContract, setError, setErrorMessage, setIsConnecting, clearError, clearContract } = storeContract

const ALERT_ID = ref(1);
let LOAD_ALERT = ref(true);

const data: AlertInfo = reactive({
    alertId: ALERT_ID,
    productId: 0,
    traceabilityId: 0,
    alertType: 3,
    alertTitle: "",
    alertSubtitle: "",
    alertDescription: "",
    alertParam: "",
    conditionalTrigguer: "",
    reportedBy: "",
    resolved: false,
    timestamp: 0,
});

watchEffect(async () => {
    if (LOAD_ALERT.value && contractInfo.value.alerts?.length > 0) {
        try {
            const trace = contractInfo.value.alerts[1];
            console.log('getAlertInfo', contractInfo.value.alerts, trace)
            data.alertId = trace.id
            data.productId = trace.productId;
            data.traceabilityId = trace.traceabilityId;
            data.alertType = trace.alertType;
            data.alertTitle = trace.alertTitle;
            data.alertSubtitle = trace.alertSubtitle;
            data.alertDescription = trace.alertDescription;
            data.alertParam = trace.alertTitle;
            data.conditionalTrigguer = trace.conditionalTrigguer;
            data.reportedBy = trace.reportedBy;
            data.resolved = trace.resolved;
            data.timestamp = trace.timestamp;
            LOAD_ALERT.value = false
        } catch (err: any) {
            console.log(err.reason);
            alert("Esta alerta aun no existe");
            ALERT_ID.value = 1;
        }
    }
});

const handleChange = () => {
    console.log("change", LOAD_ALERT.value, hasContract.value)
    LOAD_ALERT.value = true
}

</script>
<template>
    <div id="" class="blog-component mini-spacer">
        <v-container>
            <v-row justify="center">
                <v-col class="pa-0" cols="10">
                    <div class="text-center mx-3">
                        <h2 class="section-title font-weight-medium">
                            <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
                            Consulta las alertas generadas asociadas con un producto del contrato
                        </h2>
                    </div>
                </v-col>
            </v-row>
            <v-row class="mt-9" justify="center">
                <v-col cols="10">
                    <v-card class="py-4 card-shadow mb-4 text-center border rounded-sm">
                        <v-card-text>
                            <v-text-field v-model="ALERT_ID" label="Alerta" variant="outlined" color="primary"
                                placeholder="Id de la alerta" @change="handleChange"></v-text-field>
                            <ul v-if="data" class="mt-1 text-start" style="list-style: none;">
                                <!-- id, productId, traceabilityId, alertType, alertTitle, alertSubtitle, alertDescription, alertParam, conditionalTrigguer, reportedBy, resolved, timestamp -->
                                <li>Id: {{ data.alertId }}</li>
                                <li>Product ID: {{ data.productId }}</li>
                                <li>Trazabilidad Id: {{ data.traceabilityId }}</li>
                                <li>Tipo de alerta: {{ data.alertType }}</li>
                                <li>Titulo: {{ data.alertTitle }}</li>
                                <li>Subtitulo: {{ data.alertSubtitle }}</li>
                                <li>Descripción: {{ data.alertDescription }}</li>
                                <li>Parametro de la alerta: {{ data.alertParam }}</li>
                                <li>Condición de alerta: {{ data.conditionalTrigguer }}</li>
                                <li>Reporto: {{ data.reportedBy }}</li>
                                <li>Alerta resuelta: {{ data.resolved }}</li>
                                <li>Fecha de alerta: {{ data.timestamp }}</li>                                
                            </ul>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<style>
.logo-height {
    height: 33px;
}
</style>
