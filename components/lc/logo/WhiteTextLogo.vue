<script setup lang="ts">
import { ref } from 'vue';
import WhiteTLogo from '/images/logos/white-text.png';
</script>

<template>
    <NuxtLink to="/" class="d-flex">
        <img :src="WhiteTLogo" class="logo-white-text" alt="logo"/>
    </NuxtLink>
</template>

<style>
.logo-white-text{
    height: 133px;
}
</style>