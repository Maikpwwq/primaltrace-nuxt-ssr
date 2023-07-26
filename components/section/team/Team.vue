<script setup lang="ts">
import { ref } from "vue";
import { team } from "@/data/CustomComponents";
</script>
<template>
  <div>
    <div class="team-component mini-spacer">
      <v-container>
        <!-- -----------------------------------------------
            Start Team Text
        ----------------------------------------------- -->
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="7">
            <div class="text-center">
              <h2 class="section-title font-weight-medium">
                Un equipo Experimentado & Profesional
              </h2>
              <p class="text-muted">
                Experiencia en el ciclo de vida del producto y atención al
                cliente respaldada por blockchain.
              </p>
            </div>
          </v-col>
        </v-row>

        <!-- -----------------------------------------------
            End Team Text
        ----------------------------------------------- -->
        <!-- -----------------------------------------------
            Start Team
        ----------------------------------------------- -->
        <v-row class="mt-13 justify-center">
          <v-col cols="12" md="3" sm="6" v-for="card in team" :key="card.title">
            <v-card elevation="0" class="team-card mb-7">
              <div class="social-overlay overflow-hidden">
                <img
                  :src="`/images/team/${card.img}`"
                  :alt="card.img"
                  class="img-fluid"
                />
                <div class="img-overlay">
                  <ul>
                    <li v-for="social in card.socialicon" :key="social.icon">
                      <a :href="social.url">
                        <i :class="social.icon"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h5 class="team-title font-weight-medium font-18 mt-5">
                  {{ card.title }}
                </h5>
                <p class="team-subtitle text-muted mb-5">{{ card.subtitle }}</p>
              </div>
              <p class="text-muted">{{ card.desc }}</p>
            </v-card>
          </v-col>
        </v-row>
        <!-- -----------------------------------------------
            End Team
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>
