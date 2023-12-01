<script setup lang="ts">
import { ref } from "vue";
import { IconLayoutDashboard } from '@tabler/icons-vue';
import { IconArticle } from '@tabler/icons-vue';
import { IconHome } from '@tabler/icons-vue';

import Connect from "@/components/section/web-3-auth/Connect.vue"

const drawer = ref(null);
</script>
<template>
  <div>
    <!-- -----------------------------------------------
          Start Header
    ----------------------------------------------- -->
    <v-app-bar class="app-header pt-lg-0 pt-3 overflow-visible" absolute flat elevate-on-scroll>
      <v-container class="fill-height" style="padding: 0 !important;">
        <v-toolbar class="py-2 pe-3 bg-transparent d-flex align-center overflow-visible" style="background: #00000057; backdrop-filter: blur(7px)">
          <!-- Logo -->
          <LcLogoWhiteTextLogo />
          <!-- Desktop view Navigation -->
          <div class="navigation ml-auto d-md-block d-sm-none" v-bind:class="[isActive ? 'd-block' : '']"
            @click="isActive = !isActive">
            <ul class="d-md-flex navbar-nav">
              <li class="nav-item">
                <NuxtLink class="nav-link d-md-flex align-center" to="/">
                  <IconHome color="white" :size="33" stroke-width="1" /> Inicio
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link d-md-flex align-center" to="/blog">
                  <IconArticle color="white" :size="33" stroke-width="1" /> Blog
                </NuxtLink>
              </li>
              <li class="nav-item d-md-flex d-sm-none">
                <!-- DashBoard -->
                <v-btn class="btn bg-white" flat>
                  <NuxtLink to="/dashboard" class="text-decoration-none text-dark d-md-flex align-center">
                    <IconLayoutDashboard color="black" :size="33" stroke-width="1" />DashBoard
                  </NuxtLink>
                </v-btn>
              </li>
              <Connect />
            </ul>
          </div>
          <v-app-bar-nav-icon width="30" class="d-md-none d-sm-flex ml-auto drawer-icon text-white mr-0"
            @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-toolbar>
      </v-container>
    </v-app-bar>
    <!-- -----------------------------------------------
          End Header
    ----------------------------------------------- -->
  </div>
  <!----sidebar menu drawer start----->
  <v-navigation-drawer v-model="drawer" temporary>
    <ul class="navbar-nav py-4">
      <li class="nav-item mb-3">
        <NuxtLink class="nav-link text-dark py-0" to="/">
          <IconHome color="white" :size="33" stroke-width="1" /> Inicio
        </NuxtLink>
      </li>
      <li class="nav-item mb-4">
        <NuxtLink class="nav-link text-dark py-0" to="/blog">
          <IconArticle color="white" :size="33" stroke-width="1" /> Blog
        </NuxtLink>
      </li>
      <li class="nav-item ml-3 mr-3 mb-4">
        <!-- DashBoard -->
        <v-btn color="error" block flat>
          <NuxtLink to="/dashboard" class="text-decoration-none text-white d-flex align-center">
            <IconLayoutDashboard color="black" :size="33" stroke-width="1" /> Web3 DashBoard
          </NuxtLink>
        </v-btn>
      </li>
      <Connect />
    </ul>
  </v-navigation-drawer>
</template>
