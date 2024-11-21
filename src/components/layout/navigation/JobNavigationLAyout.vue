<script setup>
import BottomNavigationLayout from './BottomNavigationLayout.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(true);
const rail = ref(true);
const loaded = ref(false);
const loading = ref(false);

// Use Vue Router for navigation
const router = useRouter();

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
}

function handleLogout() {
  // Perform logout logic here, like clearing tokens or session data

  // Redirect to homepage
  router.push('/homepage');
}

</script>

<template>
  <v-app :theme="theme" class="d-flex fill-height">
    <!-- Fixed App Bar -->
    <v-app-bar
      fixed
      color="primary"
      class="px-3"
      scroll-behavior="hide"
      scroll-threshold="100"
    >
      <!-- Logo placeholder -->
      <v-img src="" alt="Logo" max-height="30" max-width="100" class="mr-4" />
      <h3>Job Finder Dashboard</h3>
      <v-spacer></v-spacer>

      <!-- Search Bar -->
      <v-text-field
        max-width="400"
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

    <!-- Navigation Drawer (Rail Mode) -->
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Dashboard" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="Profile" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-file-document-outline" title="Resume" value="applications"></v-list-item>
          <v-list-item prepend-icon="mdi-cog-outline" title="Settings" value="settings"></v-list-item>

          <!-- Use style attribute to add margin -->
          <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" :style="{ marginTop: 'auto' }" @click="handleLogout"></v-list-item>
        </v-list>
      </v-navigation-drawer>

    <!-- Main Content Area -->
    <v-main class="pt-8">
      <v-container>
        <slot name="content"></slot>
      </v-container>
    </v-main>

    <!-- Footer -->
    <BottomNavigationLayout />
  </v-app>
</template>

<style scoped>
.v-list-item:hover {
  background-color:  #4caf50; 
  color: white; 
}
</style>
