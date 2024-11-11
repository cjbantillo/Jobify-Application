<script setup>

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
        <!-- Logo (Placeholder) -->
        <v-img src="" alt="Logo" max-height="30" max-width="100" class="mr-4" />

        <!-- Navigation Links -->
        <v-btn variant="text" class="mr-2">Find Talent</v-btn>
        <v-btn variant="text" class="mr-2">Find Work</v-btn>
        <v-btn variant="text" class="mr-2">Why Upwork</v-btn>
        <v-btn variant="text" class="mr-2">What's New</v-btn>
        <v-btn variant="text" class="mr-2">Enterprise</v-btn>

        <!-- Spacer to push the remaining items to the right -->
        <v-spacer></v-spacer>

        <!-- Search Bar -->
        <v-text-field
          hide-details
          clearable
          outlined
          dense
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          class="mr-4"
          :style="{ width: '200px' }"
        ></v-text-field>
        
        <v-btn variant="elevated" color="primary" class="mr-2">Log In</v-btn>
        <v-btn variant="elevated" color="green">Sign Up</v-btn>

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
