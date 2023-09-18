<script setup lang="ts">
import { ref } from "vue";
import { feature1 } from "@/data/CustomComponents";
</script>
<template>
  <div id="trackwise">
    <div class="feature1-component mini-spacer">
      <v-container>
        <!-- -----------------------------------------------
            Start Feature 1 Text
        ----------------------------------------------- -->
        <v-row justify="center">
          <v-col cols="12" md="10" lg="7">
            <div class="text-center">
              <v-chip size="small" class="bg-error" text-color="white">
                <!-- Productos/Servicios -->
                Seguimiento confiable apalancado por Blockchain.
              </v-chip>
              <h2 class="section-title font-weight-medium">TrackWise</h2>
              <p class="text-muted">
                Descubre como usar TrackWise al registrar información confiable para la supervisión de tus productos.
              </p>
            </div>
          </v-col>
        </v-row>

        <!-- -----------------------------------------------
            End Feature 1 Text
        ----------------------------------------------- -->
        <!-- -----------------------------------------------
            Start Feature 1
        ----------------------------------------------- -->
        <v-row justify="center" class="mt-13">
          <v-col cols="12" sm="6" v-for="card in feature1" :key="card.title">
            <v-card elevation="0">
              <div>
                <div class="icon-round bg-light-info">
                  <i :class="card.icon"></i>
                </div>
                <h5 class="font-weight-medium font-18">{{ card.title }}</h5>
                <p class="my-5 text-muted pr-sm-10">{{ card.desc }}</p>
                <a
                  href="#"
                  class="text-themecolor linking text-decoration-none d-flex align-center"
                >
                  Descubrir más <i class="mdi mdi-arrow-right"></i>
                </a>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <!-- -----------------------------------------------
            End Feature 1
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>
