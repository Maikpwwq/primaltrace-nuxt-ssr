<script setup lang="ts">
import Polygon from "/images/polygon-zkevm/main.svg";
// import { deployContract } from "@/services/thridWeb/deployContract";
import { createCatalog } from "@/services/thridWeb/contractWriteInteract";
import { IconWriting } from '@tabler/icons-vue';
import { IconFilePlus } from '@tabler/icons-vue';

const handleNewCatalog = async () => {
    console.log('handleCatalog', obj)
    await createCatalog(obj).then((data) => {
        console.log('handleProduct', data)
    })
    // deployContract(obj).then((data) => {
    //     console.log('handleCatalog', data)
    // })
}

const obj = reactive({
    catalogName: "",
    // catalogId: "",
    catalogMetadata: "",
    catalogDescription: "",
})

const handleClick = (e: any) => {
    console.log(e)
}

</script>
<template>
    <div id="trackCatalog" class="blog-component mini-spacer">
        <v-container>

            <v-row justify="center">
                <v-col cols="10">
                    <div class="text-center">
                        <h2 class="section-title font-weight-medium">
                            <img :src="Polygon" class="logo-height" alt="logo smartChain polygon" />
                            Agregar Catálogo de productos
                        </h2>
                        <p class="text-muted">
                            Para agregar tus productos debes crear un nuevo catálogo de productos.
                        </p>

                    </div>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="10">
                    <v-card class="card-shadow mb-4 border rounded-sm">
                        <v-card-text>
                            <p class="my-3">Completa los campos para definir un nuevo catálogo</p>
                            <v-text-field color="primary" v-model="obj.catalogName" label="Nombre del catálogo:"
                                variant="underlined"></v-text-field>
                            <v-text-field color="primary" v-model="obj.catalogDescription" label="Descripción del catálogo:"
                                variant="underlined"></v-text-field>
                            <v-text-field color="primary" v-model="obj.catalogMetadata" label="Metadata del catálogo URL:"
                                variant="underlined"></v-text-field>
                            <div class="mt-1">
                                <v-btn class="bg-success mr-3 text-white" elevation="0" @click="handleNewCatalog">
                                    <IconFilePlus color="white" :size="33" stroke-width="1" /> Definir nuevo catálogo
                                </v-btn>
                            </div>
                        </v-card-text>
                        <v-card-text>
                            <p>Confirma para agregar este catálogo al contrato</p>
                            <ul class="pa-4">
                                <!-- "Manufacturado" "Almacenado" "Enviado a distribuidor" -->
                                <li>Nombre: {{ obj.catalogName }}</li>
                                <!-- <li>Catálogo ID: {{ obj.catalogId }}</li> -->
                                <li>Descripción: {{ obj.catalogDescription }}</li>
                                <li>Catálogo metadata URL *opcional: {{ obj.catalogMetadata }}</li>
                            </ul>
                            <v-btn @click="handleClick" class="mb-3">
                                <IconWriting color="black" :size="33" stroke-width="1" /> Firmar catálogo
                            </v-btn>
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