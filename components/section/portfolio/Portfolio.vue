<script setup lang="ts">
import { ref } from "vue";
import {portfolio} from '@/data/CustomComponents'
</script>
<template>
  <div id="casos-uso">
    <div class="portfolio-component mini-spacer">
      <v-container>
        <!-- -----------------------------------------------
            Start Portfolio Text
        ----------------------------------------------- -->
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="7">
            <div class="text-center">
              <h2 class="section-title font-weight-medium">
                Casos de uso
              </h2>
              <p class="text-muted">
                El Blockchain puede ser implementado para garantizar la autenticidad de los productos y la transparencia en las transacciones.
              </p>
            </div>
          </v-col>
        </v-row>

        <!-- -----------------------------------------------
            End Portfolio Text
        ----------------------------------------------- -->
        <!-- -----------------------------------------------
            Start Portfolio
        ----------------------------------------------- -->
        <v-row class="mt-8">
          <v-col
            cols="12"
            md="4"
            sm="6"
            v-for="card in portfolio"
            :key="card.title"
          >
            <v-card class="portfolio-card overflow-hidden card-shadow">
              <div class="portfolio-img">
                <img :src="`/images/portfolio/${card.img}`" class="img-fluid" :alt="card.img" />
              </div>
              <v-card-text class="pa-5">
                <h5 class="font-weight-medium font-18">{{ card.title }}</h5>
                <p class="font-14 mb-0 text-muted">{{ card.subtext }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- -----------------------------------------------
            End Portfolio
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>
