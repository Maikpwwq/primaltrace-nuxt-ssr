<script setup lang="ts">
import { ref } from "vue";
// import { start } from "@/ethers/QRCode/index";
import { headerMenu } from "@/data/CustomComponents";
import { IconLayoutDashboard } from '@tabler/icons-vue';

const drawer = ref(null);
const handleCLick = () => {
  // start();

};
</script>
<template>
  <div class="navigation-sticky">
    <!-- -----------------------------------------------
          Start Header
    ----------------------------------------------- -->
    <v-app-bar app class="app-header position-relative bg-dark header2" flat>
      <v-container class="py-0 fill-height">
        <v-toolbar>
          <!-- Logo -->
          <div class="logo">
            <LcLogoWhiteLogo />
          </div>
          <!-- Desktop view Navigation -->
          <div class="navigation ml-auto" v-bind:class="[isActive ? 'd-block' : '']" @click="isActive = !isActive">
            <ul class="navbar-nav d-flex" min-height="auto">
              <li class="nav-item" v-for="nav in headerMenu" :key="nav.title" text>
                <NuxtLink :to="nav.href" v-scroll-to="nav.href" class="nav-link">{{ nav.title }}</NuxtLink>
              </li>
            </ul>
          </div>
          <!-- login-regiter -->
          <v-btn to="/dashboard" @click="handleCLick" class="btn px-6 bg-primary ml-2 d-md-flex d-none" flat>
            <IconLayoutDashboard color="black" :size="33" stroke-width="1" /> Web3 DashBoard
          </v-btn>
          <!-- Todo: Metamask btn connect -->
          <!-- Display a connect button and the current account -->
          <!-- <button class="enableEthereumButton"> Conecta MetaMask</button> -->
          <!-- <h2>Account: <span class="showAccount"></span></h2> -->
          <v-app-bar-nav-icon width="30" class="d-md-none d-sm-flex drawer-icon text-white ml-auto mr-0"
            @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-toolbar>
      </v-container>
    </v-app-bar>
  </div>
  <!-- -----------------------------------------------
          End Header
    ----------------------------------------------- -->
  <!----sidebar menu drawer start----->
  <div class="navigation-sticky nav2">
    <v-navigation-drawer style="top: 193px;" color="white" v-model="drawer" temporary>
      <div class="navigation" v-bind:class="[isActive ? 'd-block' : '']" @click="isActive = !isActive">
        <ul class="navbar-nav py-4" min-height="auto">
          <li class="nav-item mb-3" v-for="nav in headerMenu" :key="nav.title" text>
            <NuxtLink :to="nav.href" v-scroll-to="nav.href" class="nav-link text-dark">{{ nav.title }}</NuxtLink>
          </li>
          <li class="nav-item mx-3 mt-4">
            <v-btn to="/dashboard" @click="handleCLick" class="btn bg-primary-light" flat block variant="outlined" color="primary">
              <IconLayoutDashboard color="black" :size="33" stroke-width="1" /> Web3 DashBoard
            </v-btn>
          </li>
        </ul>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<style>
.navigation-sticky {
  position: sticky;
  top: 0;
  z-index: 13;
}
</style>
