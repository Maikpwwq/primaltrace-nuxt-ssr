<script setup lang="ts">
import { ref } from "vue";
import { feature2 } from "@/data/CustomComponents";
</script>
<template>
  <div id="trustblock">
    <div class="feature2-component mini-spacer bg-extra-light">
      <v-container>
        <!-- -----------------------------------------------
            Start Feature 2 Text
        ----------------------------------------------- -->
        <v-row justify="center">
          <v-col cols="12" md="10" lg="7">
            <div class="text-center">
              <v-chip size="small" class="bg-primary" text-color="white">
                <!-- Productos/Servicios -->
                Autenticidad de origen respaldado por Blockchain.
              </v-chip>
              <h2 class="section-title font-weight-medium">TrustBlock</h2>
              <p class="text-muted">
                Con TrustBlock conoce los aspectos más relevantes de tus productos en la cadena de suministro y en la cadena de producción. 
              </p>
            </div>
          </v-col>
        </v-row>

        <!-- -----------------------------------------------
            End Feature 2 Text
        ----------------------------------------------- -->
        <!-- -----------------------------------------------
            Start Feature 2
        ----------------------------------------------- -->
        <v-row justify="center" class="feature2-spacer">
          <v-col
            cols="12"
            md="6"
            class="mb-3"
            v-for="card in feature2"
            :key="card.title"
          >
            <v-card elevation="0">
              <v-row>
                <v-col cols="12" sm="8" class="py-0">
                  <v-card-text>
                    <div class="d-flex align-center pt-5 pl-2 pb-4">
                      <v-row>
                        <v-col cols="12" sm="4">
                          <img
                            :src="`/images/features/2/${card.img}`"
                            class="img-fluid rounded"
                            alt="feature2"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="8"
                          class="px-md-0 d-flex align-center"
                        >
                          <h4 class="font-weight-medium font-18">
                            {{ card.title }}
                          </h4>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-btn
                    block
                    class="linking bg-info feature2-action-btn mt-sm-0 mt-n5"
                  >
                    <a
                      href="#form-contacto"
                      class="text-white linking text-decoration-none d-flex align-center"
                      >Conversar
                      <i class="mdi mdi-arrow-right"></i>
                    </a>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <!-- -----------------------------------------------
            End Feature 2
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>
