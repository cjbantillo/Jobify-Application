<script setup>
import { ref, computed } from 'vue'
import BottomNavigationLayout from './navigation/BottomNavigationLayout.vue'
import Logo from '@/assets/logo.png'
import { useWindowSize } from '@vueuse/core'
import '@mdi/font/css/materialdesignicons.css'

const loaded = ref(false)
const loading = ref(false)

// Use useWindowSize for reactive screen dimensions
const { width } = useWindowSize()

// Mobile variable: true if the width is less than or equal to 768px
const mobile = computed(() => width.value <= 768)

function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}
</script>
<template>
  <v-responsive class="border rounded">
    <v-app class="d-flex flex-column fill-height">
      <v-app-bar
        fixed
        class="px-5 mb-4"
        color="white"
        scroll-behavior="hide"
        scroll-threshold="100"
      >
        <!-- Logo (adjust size based on mobile variable) -->
        <v-img :src="Logo" alt="Logo" class="mr-4" height="100px" />

        <!-- Navigation Links -->
        <template v-if="!mobile"> </template>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <!-- Search Bar -->
        <v-text-field
          clearable
          class="mr-4 search-bar"
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search"
          variant="solo"
          hide-details
          single-line
          rounded
          @click:append-inner="onClick"
        />
      </v-app-bar>

      <v-main class="d-flex flex-column flex-grow-1 pt-8">
        <v-container>
          <slot name="content"></slot>
        </v-container>
      </v-main>
      <BottomNavigationLayout />
    </v-app>
  </v-responsive>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Matemasie&family=Varela+Round&display=swap');

.search-bar {
  font-family: 'Varela Round', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.nav-link {
  text-transform: none !important;
  color: #213a58;
  font-family: 'Varela Round', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.nav-link:hover {
  background-color: #4caf50;
  color: #fff;
}
v-img {
  height: 50px;
}
</style>
