<script setup lang="ts">
import { ref } from "vue";
import DashBoard from "@/components/section/dash-board/DashBoard.vue";
import BannerConnectWallet from "@/components/shared/lp-banner/BannerConnectWallet.vue";
</script>

<template>
    <div>
        <!-------Banner-------->
        <BannerConnectWallet />
        <!--------------------->
        <!-------DashBoard-------->
        <DashBoard />
        <!--------------------->
    </div>
</template>
