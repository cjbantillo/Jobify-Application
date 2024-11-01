<script setup>
import { ref, watch } from 'vue'

const theme = ref(localStorage.getItem('theme') ?? 'light')

// Function to toggle theme and save it in localStorage
function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value) // Save the theme preference
}

// Watch for theme changes and store it in localStorage (optional for extra safety)
watch(theme, newTheme => {
  localStorage.setItem('theme', newTheme)
})

const links = ['Home', 'About', 'Services']
</script>

<template>
  <!-- toggle switch app bar login main -->
  <v-responsive class="border rounded">
    <v-app :theme="theme" class="d-flex flex-column fill-height">
      <!-- Add 'fixed' to v-app-bar so it doesn't cover the main content -->
      <v-app-bar
        fixed
        class="px-3 mb-4"
        :color="theme === 'light' ? 'teal-lighten-1' : 'teal-darken-3'"
      >
        <v-spacer></v-spacer>

        <h4>Home</h4>

        <v-spacer></v-spacer>
        <h4>About</h4>
        <v-spacer></v-spacer>
        <h4>Services</h4>
        <v-spacer></v-spacer>
        <!-- logo for Jobify -->
        <img src="" alt="" />
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="
            theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          variant="elevated"
          :color="theme === 'light' ? 'teal-darken-3' : 'teal-lighten-1'"
          rounded="xl"
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

      <v-footer
        :color="theme === 'light' ? 'teal-lighten-1' : 'teal-darken-3'"
        elevation="24"
        
      >
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link"
            class="mx-2"
            color="white"
            rounded="xl"
            variant="text"
          >
            {{ link }}
          </v-btn>
          <v-col class="text-center mt-4" cols="12">
            {{ new Date().getFullYear() }} — <strong>Jobify</strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </v-responsive>
</template>
