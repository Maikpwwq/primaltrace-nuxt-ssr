<script setup lang="ts">
import { ref } from "vue";
import { BlogArticle } from "@/data/CustomComponents";
const route = useRoute()
const currentArticle = route?.params.id
console.log(currentArticle)
</script>
<template>
  <div>
    <div class="blog-component mini-spacer">
      <v-container>
        <!-- -----------------------------------------------
            Start Blog Article Text
        ----------------------------------------------- -->
        <v-row class="mt-9" justify="center" >
          <v-col cols="12" md="8" sm="12" v-for="card in BlogArticle" :key="card.title">
            <v-card elevation="0" v-if="card.route === currentArticle" class="blog-card overflow-hidden">
              
              <v-card-title class="text-center">
                <h2 class="section-title font-weight-bold" style="white-space: break-spaces;">
                  {{ card.title }}
                </h2>
              </v-card-title>

              <v-card-subtitle class="text-center">
                <p class="mb-6 blog-title font-weight-medium font-18" style="white-space: break-spaces;">
                    {{ card.subtitle }}
                </p>
              </v-card-subtitle>

              <div class="position-relative mb-6">
                <img
                  :src="`/images/blog/${card.img}`"
                  :alt="card.img"
                  class="img-fluid"
                />
                <div class="date-badge bg-info-grediant">
                  {{ card.month }} <span>{{ card.date }}</span>
                </div>
              </div>

              <div class="text-center">
                <p class="my-5 font-weight-medium text-dark">
                  {{ card.descA }}
                </p>  
                <p class="my-5 font-weight-medium text-dark">
                  {{ card.descB }}
                </p>                
              </div>

              <v-card-actions>
                <a href="/blog" class="text-decoration-none">
                  <div class="text-themecolor mt-5 linking d-flex align-center">
                    Aprende Más <i class="mdi mdi-arrow-right"></i>
                  </div>
                </a>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <!-- -----------------------------------------------
            End Blog Article Text
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>
