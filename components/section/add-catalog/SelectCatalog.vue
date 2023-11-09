<script setup lang="ts">
import { getContractCatalogs } from "@/services/thridWeb/contractReadInteract";
import { ref, reactive, watchEffect } from "vue";


const selected = reactive({
    catalog: "",
})

let LOAD = ref(true);
const showCatalogs = ref([]);

watchEffect(async () => {
    if (!LOAD) {
        await getContractCatalogs().then((data: any) => {
            console.log('getContractCatalogs', data)
            showCatalogs.value = data
        })
    }
})

const handleClick = (e: any) => {
    console.log(e)
}

const handleReadQR = () => { }

const switchSelect = (event: any) => {
    selected.catalog = event.target.value;
}

</script>
<template>
    <div id="" class="blog-component mini-spacer">
        <v-container>

            <v-row class="mt-7">
                <!-- <v-text-field label="Catálogo" variant="outlined" color="primary" placeholder="Elige un catálogo">
                    v-model="selected.catalog"
                </v-text-field> -->
                <p> Elige un catálogo</p>
                <!-- v-model="showCatalogs" -->
                <select @change="switchSelect($event)">
                    <option disabled value="">Seleccione un catalogo</option>
                    <option v-for="catalog in showCatalogs" :value={catalog} :key="catalog">{{ catalog }}</option>
                </select>
                <v-btn class="ms-4" style="max-height: 56px;" @click="handleClick"> Elegir catálogo
                </v-btn>
                <v-btn class="ms-4" style="max-height: 56px;" @click="handleReadQR"> Leer código QR
                </v-btn>
                <p>Elegiste: {{ selected.catalog }}</p>
            </v-row>

        </v-container>
    </div>
</template>
<style></style>