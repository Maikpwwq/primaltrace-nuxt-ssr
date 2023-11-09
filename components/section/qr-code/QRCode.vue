<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs } from 'qrcode.vue'
import { useSmartContract } from '@/store/smart-contract'
import { storeToRefs } from 'pinia'

const storeContract = useSmartContract()
// but skip any action or non reactive (non ref/reactive) property
const { contract } = storeToRefs(storeContract) // Destructuring from a Store 

const value = ref(contract.value.contractAddress)
const level = ref<Level>('M')
const size = ref(150)
const margin = ref(2)
const renderAs = ref<RenderAs>('svg')
</script>
<template>
    <div class="d-flex align-center">
        <qrcode-vue :value="value" :margin="margin" :size="size" :level="level" :render-as="renderAs" />
    </div>
</template>