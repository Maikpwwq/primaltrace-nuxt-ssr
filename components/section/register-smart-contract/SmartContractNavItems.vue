<script setup lang="ts">
import { headerDashBoard } from "@/data/CustomComponents";

const cleanSelection = () => {
  selection.string = "";
};

const handleCLick = (index: number) => {
  slides.number = index;
};

const handleSelect = (action: string) => {
  selection.string = action;
};

const selection = reactive({
  string: "",
});


</script>

<script lang="ts">
import { ref } from "vue";
const slides = reactive({
  number: 0,
});
let menuSlide = ref(slides);
export { menuSlide }; 
</script>

<template>
  <li
    class="nav-item d-flex align-center mb-3"
    v-for="nav in headerDashBoard"
    :key="nav.title"
    text
  >
    <div v-if="selection.string !== '' && selection.string === nav.action">
      <v-btn
        @click="cleanSelection()"
        class="btn px-4 bg-primary ml-2 d-flex"
        flat
      >
        Atras
      </v-btn>
      <v-btn
        v-for="elm in nav.group"
        :to="elm.href"
        v-scroll-to="elm.href"
        @click="handleCLick(elm.index)"
        class="btn px-4 bg-primary ml-2 d-flex"
        flat
      >
        <!-- d-none -->
        {{ elm.title }}
      </v-btn>
    </div>

    <v-btn
      v-if="selection.string === ''"
      @click="handleSelect(nav.action)"
      class="btn px-4 bg-primary ml-2 d-flex"
      flat
    >
      <!-- d-none -->
      {{ nav.title }}
    </v-btn>
    <!-- <NuxtLink :to="nav.href" v-scroll-to="nav.href" class="nav-link"
                                            @click="handleCLick(nav.index)">
                                            {{ nav.title }}
                                        </NuxtLink> -->
  </li>
</template>
