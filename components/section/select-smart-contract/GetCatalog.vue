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
let LOAD = ref(false);

const obj: Catalog = reactive({
    catalogName: "",
    catalogId: CATALOG_ID.value,
    catalogMetadata: "",
    catalogDescription: "",
})

watchEffect(async () => {
    if (!LOAD && !hasContract) {
        await getCatalog(CATALOG_ID.value).then((resp) => {
            // TODO: Puede obtener multiples registros de productos
            setCatalogsInfo(resp)
            const trace = contractInfo.value.catalog;
            console.log('setCatalogs', resp)
            obj.catalogId = trace[0]._hex;
            obj.catalogName = trace[1];
            obj.catalogDescription = trace[2];
            obj.catalogMetadata = trace[3];
            LOAD.value = false
        })
    }
});

const handleClick = () => {
    console.log("get")
}


</script>
<template>
    <div id="" class="blog-component mini-spacer">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" sm="10" md="9" lg="7">
                    <div class="text-center">
                        <h2 class="section-title font-weight-medium">
                            <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
                            Confirma para agregar este catalogo al contrato
                        </h2>
                    </div>
                </v-col>
            </v-row>
            <v-row class="mt-9" justify="center">
                <v-col cols="12" sm="10" md="9" lg="7">
                    <v-card class="card-shadow mb-4 text-center">
                        <v-card-text>
                            <v-text-field v-model="CATALOG_ID" label="Catalogo" variant="outlined" color="primary"
                                placeholder="Id del catalogo"></v-text-field>
                            <ul v-if="obj">
                                <ul class="mt-1">
                                    <!-- "Manufacturado" "Almacenado" "Enviado a distribuidor" -->
                                    <li>Nombre del catálogo: {{ obj.catalogName }}</li>
                                    <!-- <li>Catálogo ID: {{ obj.catalogId }}</li> -->
                                    <li>Descripcion del catálogo: {{ obj.catalogDescription }}</li>
                                    <li>metadata URL *opcional: {{ obj.catalogMetadata }}</li>
                                </ul>
                            </ul>
                            <v-btn @click="handleClick"> Firmar catalogo </v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
