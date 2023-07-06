<template>
  <div id="nosotros">
    <div class="banner2-component">
      <v-container>
        <!-- -----------------------------------------------
            Start Banner2
        ----------------------------------------------- -->
        <v-row justify="center">
          <v-col cols="12" sm="8" class="d-flex align-center">
            <div class="text-center">
              <h2 class="banner2-title font-weight-light">
                Sistemas de
                <span class="font-weight-bold">
                  administración y seguimiento inteligente
                </span>
                de primera calidad
              </h2>

              <div class="mt-md-16 mt-sm-8 pt-2">
                <v-btn nuxt large to="#trackwise" class="btn-custom-lg btn-arrow" depressed color="error" elevation="0">
                  <span>Portafolio</span>
                  <i class="mdi mdi-arrow-right"></i>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- -----------------------------------------------
            End Banner2
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "Banner2",
  data() {
    return {};
  },
  methods: {},
};
</script>
