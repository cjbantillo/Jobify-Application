<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
<template>
  <!-- toggle switch app bar login main -->
  <v-responsive class="border rounded">
    <v-app :theme="theme" class="d-flex flex-column fill-height">
      <!-- Add 'fixed' to v-app-bar so it doesn't cover the main content -->
      <v-app-bar fixed class="px-3 mb-4" color="teal-darken-3">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="
            theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <!-- Add 'pt-8' to v-main to give space for the fixed app bar -->
      <v-main class="d-flex flex-column flex-grow-1 pt-8">
        <v-container>
          <slot name="content"></slot>
        </v-container>
      </v-main>

      <v-footer color="teal-darken-3" app>
        2024 - <strong>Jobify</strong>
      </v-footer>
    </v-app>
  </v-responsive>
</template>
