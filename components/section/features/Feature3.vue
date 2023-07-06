<template>
  <div>
    <div class="feature3-component mini-spacer">
      <v-container class="position-relative">
        <!-- -----------------------------------------------
            Start Feature 3 Text
        ----------------------------------------------- -->
        <v-row>
          <v-col cols="12" md="10">
            <img src="/images/features/3/feature-img.jpg"
              alt="feature"
              class="rounded img-fluid"
            />
          </v-col>
          <v-col cols="12" sm="7" lg="5" class="feature3-card">
            <v-card class="card-shadow">
              <div>
                <div class="pa-10 text-center">
                  <v-chip size="small" class="bg-primary">
                    Productos/Servicios 3
                  </v-chip>
                  <h3 class="feature3-title font-weight-medium">
                    Soluciones Blockchain a medida
                  </h3>
                  <p class="text-muted">
                    Dejanos entender mejor tus necesidades.
                  </p>
                  <v-btn
                    color="error"
                    class="btn-custom-lg linking mt-10 btn-arrow"
                    nuxt
                    large
                    to="#form-contacto"
                    elevation="0"
                  >
                    <span>Contactar</span>
                    <i class="mdi mdi-arrow-right"></i>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- -----------------------------------------------
            End Feature 3 Text
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>

