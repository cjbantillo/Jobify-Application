<script setup>
import { ref } from 'vue'
import BottomNavigationLayout from './navigation/BottomNavigationLayout.vue'
import Logo from '@/assets/jobify1_Logo.png'

const loaded = ref(false)
const loading = ref(false)

function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}
</script>

<template>
  <!-- toggle switch app bar login main -->
  <v-responsive class="border rounded">
    <v-app :theme="theme" class="d-flex flex-column fill-height">
      <!-- Add 'fixed' to v-app-bar so it doesn't cover the main content -->
      <v-app-bar
        fixed
        class="px-5 mb-4"
        color="white"
        scroll-behavior="hide"
        scroll-threshold="100"
      >
        <!-- Logo (Placeholder) -->
        <v-img
          :src="Logo"
          alt="Logo"
          max-height="30"
          max-width="100"
          class="mr-4"
        />

        <!-- Navigation Links -->
        <v-btn class="mr-2" :to="{ name: 'EmployerLogin' }"
          >Find Talent</v-btn
        >
        <v-btn class="mr-2" :to="{ name: 'StudentLogin' }"
          >Find Work</v-btn
        >
        <v-btn class="mr-2">Why Jobify</v-btn>
        <v-btn class="mr-2">What's New</v-btn>
        <v-btn class="mr-2">Enterprise</v-btn>

        <!-- Spacer to push the remaining items to the right -->
        <v-spacer></v-spacer>

        <!-- Search Bar -->
        <v-text-field
          clearable
          class="mr-4"
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search"
          variant="solo"
          hide-details
          single-line
          @click:append-inner="onClick"
        ></v-text-field>
      </v-app-bar>

      <!-- Add 'pt-8' to v-main to give space for the fixed app bar -->

      <v-main class="d-flex flex-column flex-grow-1 pt-8">
        <v-container>
          <slot name="content"></slot>
        </v-container>
      </v-main>
      <!-- footer -->
      <BottomNavigationLayout />
    </v-app>
  </v-responsive>
</template>
