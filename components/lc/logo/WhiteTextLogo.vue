<script setup lang="ts">
import { ref } from 'vue';
import WhiteTLogo from '/images/logos/white-text.png';
</script>

<template>
    <NuxtLink to="/" class="d-flex">
        <img :src="WhiteTLogo" class="logo-height" alt="logo"/>
    </NuxtLink>
</template>

<style>
.logo-height{
    height: 48px;
}
</style>