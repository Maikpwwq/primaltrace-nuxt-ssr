<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
const data = "";
const handleCatalog = () => {
    console.log('handleCatalog', obj)
    // addTraceabilityInfo(TRACEABILITY_INFO).then((data)=>{
    //   console.log('handleCatalog',data)
    // })
}

const obj = reactive({
    catalogName: "",
    catalogId: "",
    catalogMetadata: "",
})


const selected = ref([])
</script>
<template>
    <div id="trackCatalog" class="blog-component mini-spacer">
        <v-container>

            <v-row justify="center">
                <v-col cols="12" sm="10" md="9" lg="7">
                    <div class="text-center">
                        <h2 class="section-title font-weight-medium">
                            <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
                            Asignar catálogo de productos
                        </h2>
                        <p class="text-muted">
                            Crea un nuevo contrato inteligente para asignar un nuevo catálogo de productos o bien selecciona
                            un catálogo específico de la lista desplegable de catalogos.
                        </p>
                    </div>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" sm="10" md="9" lg="7">
                    <v-card class="card-shadow mb-4">
                        <v-card-text>
                            <v-text-field color="primary" v-model="obj.catalogName" label="Nombre del catálogo:"
                                variant="underlined"></v-text-field>
                            <v-text-field color="primary" v-model="obj.catalogId" label="Catálogo ID:"
                                variant="underlined"></v-text-field>
                            <v-text-field color="primary" v-model="obj.catalogMetadata" label="metadata URL:"
                                variant="underlined"></v-text-field>
                            <div class="mt-1">
                                <v-btn class="bg-success mr-3 text-white" elevation="0" @click="handleCatalog">
                                    Definir catálogo
                                </v-btn>
                            </div>
                        </v-card-text>
                        <v-card-text>
                            <v-row class="mt-7">
                                <v-col cols="12" class="py-0">
                                    <v-text-field label="Catálogo" variant="outlined" color="primary"
                                        placeholder="Elige un catálogo"></v-text-field>
                                    <select v-model="selected">
                                        <option disabled value="">Por favor, seleccione uno</option>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <!-- inline object literal -->
                                        <!-- <option :value="{ number: 123 }">123</option> -->
                                    </select>
                                </v-col>
                            </v-row>
                            <ul>
                                <!-- "Manufacturado" "Almacenado" "Enviado a distribuidor" -->
                                <li>Nombre del catálogo: {{ obj.catalogName }}</li>
                                <li>Catálogo ID: {{ obj.catalogId }}</li>
                                <li>metadata URL *opcional: {{ obj.catalogMetadata }}</li>
                            </ul>
                            <div class="mt-1">
                                <v-btn class="mr-3" @click="handleCatalog"> Definir catálogo
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div></template>
