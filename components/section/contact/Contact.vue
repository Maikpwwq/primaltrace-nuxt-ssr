<script setup lang="ts">
import WhiteTLogo from "/images/logos/white-text.png";
import { createClient } from '@supabase/supabase-js';
import { reactive } from "vue";

const config = useRuntimeConfig();
const supabasePassword = config.public.supabasePassword;
const supabaseKey = config.public.supabaseKey;
// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://mpgfqlsbihynxqjmsgtj.supabase.co'; // `postgresql://postgres:${supabasePassword}@db.mpgfqlsbihynxqjmsgtj.supabase.co:5432/postgres`
const supabase = createClient(supabaseUrl, supabaseKey);


const obj = reactive({
  name: "",
  email: "",
  message: "",
})

const handleClick = async () => {
  console.log("contact form", obj)
  const { name, email, message } = obj
  const { data: contact_form, error } = await supabase
    .from('contact_form')
    .insert([{ name, email, message }]) // alreay auth loads id: 1, created_at: new Date(),
    .select('*')
  console.log("supabase contact form", contact_form, error)
  if (contact_form){
    console.log("Success supabase contact form", contact_form[contact_form.length - 1].id)
  } else if (error){
    console.log("Error supabase contact form", error)
  }
}

</script>

<template>
  <div id="form-contacto">
    <div class="mini-spacer">
      <v-container>
        <!-- -----------------------------------------------
            Start Contact Form
        ----------------------------------------------- -->
        <v-row justify="center">
          <v-col cols="12" md="8">
            <div>
              <h4 class="font-weight-medium contact-title mt-0">
                Formulario de Contacto
              </h4>
              <form>
                <v-row class="mt-7">
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field v-model="obj.name" name="name" label="Nombre" placeholder="Nombre" variant="outlined"
                      color="primary"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field v-model="obj.email" name="email" label="Correo electrónico"
                      placeholder="Correo electrónico" variant="outlined" type="email" color="primary"></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-textarea v-model="obj.message" name="message" label="Mensage" placeholder="Deje su mensage aquí"
                      color="primary" variant="outlined" rows="3"></v-textarea>
                  </v-col>
                </v-row>
                <v-btn to="/" class="btn-danger-gradient mt-7 px-8 py-2" variant="outlined" flat color="white"
                  @click="handleClick">
                  Enviar
                </v-btn>
              </form>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="bg-primary contact-detail-card">
              <h2 class="detail-title font-weight-medium text-white">
                Sede
                <img :src="WhiteTLogo" class="logo-white-text" alt="logo PrimalTrace" />
              </h2>
              <p class="mt-7 op-8 mb-0 text-white">+57 3196138057</p>
              <p class="op-8 mb-8 text-white">primaltrace@outlook.com</p>
              <p class="mt-7 op-8 mb-0 text-white">Bogotá,</p>
              <p class="op-8 mb-0 text-white">Colombia</p>
            </div>
          </v-col>
        </v-row>
        <!-- -----------------------------------------------
            End Contact Form
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>

<style>
.logo-white-text {
  height: 133px;
}
</style>
