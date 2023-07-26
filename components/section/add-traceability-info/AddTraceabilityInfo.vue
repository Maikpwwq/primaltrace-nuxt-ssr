<script setup lang="ts"></script>
<template>
  <div class="blog-component mini-spacer">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="7">
          <div class="text-center">
            <h2 class="section-title font-weight-medium">
              Agregar Información de trazabilidad
            </h2>
            <p class="text-muted">
              Selecciona un producto específico de la lista desplegable o
              mediante un campo de búsqueda.
            </p>
            <v-row class="mt-7">
              <v-col cols="12" md="6" class="py-0">
                <v-text-field label="Product" variant="outlined" color="primary" placeholder="Elige un producto"></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-9" justify="center">
        <v-col cols="12" md="4" sm="6">
          <ul>
            <!-- "Manufacturado" "Almacenado" "Enviado a distribuidor" -->
            <li>acción</li>
            <li>actor ID</li>
            <li>metadata URL * opcional</li>
          </ul>
          <v-btn> Agregar trazabilidad </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
