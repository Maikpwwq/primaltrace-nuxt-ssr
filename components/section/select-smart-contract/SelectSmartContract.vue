<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
const data = "";
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
                            Crea un nuevo contrato inteligente para asignar un nuevo catálogo de productos o bien selecciona un catálogo específico
                            de la lista desplegable de catalogos.
                        </p>
                    </div>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" sm="10" md="9" lg="7">
                    <v-card class="card-shadow mb-4">
                        <v-card-text>
                            <v-text-field v-model="catalogName" color="primary" label="Nombre del catálogo:"
                                variant="underlined"></v-text-field>
                            <v-text-field v-model="catalogID" color="primary" label="Catálogo ID:"
                                variant="underlined"></v-text-field>
                            <v-text-field v-model="metadataURL" color="primary" label="metadata URL:"
                                variant="underlined"></v-text-field>
                            <div class="mt-1">
                                <v-btn class="bg-success mr-3 text-white" elevation="0"> Definir catálogo
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-9" justify="center">
                <v-col cols="12" lg="7" md="5" sm="8">
                    <v-row class="mt-7">
                        <v-col cols="12" class="py-0">
                            <v-text-field label="Catálogo" variant="outlined" color="primary"
                                placeholder="Elige un catálogo"></v-text-field>
                        </v-col>
                    </v-row>
                    <ul>
                        <!-- "Manufacturado" "Almacenado" "Enviado a distribuidor" -->
                        <li>Nombre del catálogo:  {{ data }}</li>
                        <li>Catálogo ID: </li>
                        <li>metadata URL *opcional: </li>
                    </ul>
                    <v-btn> Definir catálogo </v-btn>
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>
