<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
import { getCatalog } from "@/services/thridWeb/contractReadInteract";
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'
import type { Catalog } from "@/schemas/index"

const store = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { contract, contractInfo, hasContract, error, errorMessage, isConnecting } = storeToRefs(store) // Destructuring from a Store 
// actions can just be destructured
const { setContract, setCatalogsInfo, setHasContract, setError, setErrorMessage, setIsConnecting, clearError, clearContract } = store

const CATALOG_ID = ref(1);
let LOAD_CATALOG = ref(true);

const obj: Catalog = reactive({
    catalogName: "",
    catalogId: CATALOG_ID.value,
    catalogMetadata: "",
    catalogDescription: "",
})

watchEffect(async () => {
    if (LOAD_CATALOG.value && hasContract.value) {
        await getCatalog(CATALOG_ID.value).then((resp) => {
            // TODO: Puede obtener multiples registros de productos
            setCatalogsInfo(resp)
            const trace = contractInfo.value.catalog;
            console.log('setCatalogs', resp)
            obj.catalogId = trace[0]._hex;
            obj.catalogName = trace[1];
            obj.catalogDescription = trace[2];
            obj.catalogMetadata = trace[3];
            LOAD_CATALOG.value = false
        })
    }
});

const handleChange = () => {
  console.log("change", LOAD_CATALOG.value, hasContract.value)
  LOAD_CATALOG.value = true
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
                            Consulta detalles de un catálogo del contrato
                        </h2>
                    </div>
                </v-col>
            </v-row>
            <v-row class="mt-9" justify="center">
                <v-col cols="10">
                    <v-card class="py-4 card-shadow mb-4 text-center border rounded-sm">
                        <v-card-text>
                            <v-text-field v-model="CATALOG_ID" label="Catálogo" variant="outlined" color="primary"
                                placeholder="Id del catálogo" @change="handleChange"></v-text-field>
                            <!-- <v-row class="mt-7">
                                <v-text-field label="Catálogo" variant="outlined" color="primary"
                                    placeholder="Elige un catálogo">
                                </v-text-field>
                                <select  v-model="showCatalogs">
                                        <option disabled value="">Por favor, seleccione uno</option>
                                        <option v-for="catalog in showCatalogs" :value={catalog} :key="catalog">{{catalog}}</option>
                                        v-model="selected.catalog"
                                    </select> 
                                <v-btn class="ms-4" style="max-height: 56px;" @click="handleClick"> Elegir catálogo
                                </v-btn>
                                <v-btn class="ms-4" style="max-height: 56px;" @click="handleReadQR"> Leer código QR
                                    </v-btn>
                            </v-row>-->
                            <ul v-if="obj">
                                <ul class="mt-1 text-start" style="list-style: none;">
                                    <!-- "Manufacturado" "Almacenado" "Enviado a distribuidor" -->
                                    <li>Nombre: {{ obj.catalogName }}</li>
                                    <!-- <li>Catálogo ID: {{ obj.catalogId }}</li> -->
                                    <li>Descripción: {{ obj.catalogDescription }}</li>
                                    <li>Catálogo metadata URL *opcional: {{ obj.catalogMetadata }}</li>
                                </ul>
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