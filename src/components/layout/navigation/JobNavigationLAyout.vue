<script setup>
import BottomNavigationLayout from './BottomNavigationLayout.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase, formActionDefault } from '@/utils/supabase.js';
import { useAuthUserStore } from '@/stores/authUser';
import { useWindowSize } from '@vueuse/core';

// Reactive screen dimensions
const { width } = useWindowSize();
const mobile = computed(() => width.value <= 768);

// Pinia store for auth user
const authStore = useAuthUserStore();

// Reactive variables
const drawer = ref(true);
const rail = ref(true);
const loaded = ref(false);
const loading = ref(false);
const user = ref(null);

// Vue Router for navigation
const router = useRouter();

const onClick = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
};

const formAction = ref({ ...formActionDefault });

// Logout function
const Logout = async () => {
  formAction.value = { ...formActionDefault, formProcess: true };

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during logout:', error);
    return;
  }

  formAction.value.formProcess = false;

  setTimeout(() => {
    authStore.$reset();
  }, 2500);

  router.replace('/');
};


// Fetch user data on component mount
const fetchUserData = async () => {
  try {
    const { data: currentUser, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Error fetching current user:', userError);
      return;
    }

    const { data, error } = await supabase
      .from('users') // Adjust table name to match your Supabase schema
      .select('first_name, last_name') // Fetch only required fields
      .eq('id', currentUser.user.id) // Use the logged-in user's ID
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
      return;
    }

    // Update `user` with the fetched data
    user.value = {
      name: data.first_name + ' ' + data.last_name,  // Concatenate first and last name
      avatar_url: data.avatar_url || 'https://via.placeholder.com/150', // Fallback avatar
    };

  } catch (err) {
    console.error('Unexpected error fetching user data:', err);
  }
  console.log(user.value)
};


// Lifecycle hook
onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <v-app class="d-flex fill-height">
    <v-app-bar
      fixed
      class="px-3 appbar"
      scroll-behavior="hide"
      scroll-threshold="100"
      :dense="mobile"
    >
      <v-img src="" alt="Logo" max-height="30" max-width="100" class="mr-4" />
      <h3 v-if="!mobile">Dashboard</h3>
      <v-spacer></v-spacer>
      <v-text-field
        v-if="!mobile"
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

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <!-- Conditional Rendering of User Info -->
      <v-list-item
        v-if="user"
        :prepend-avatar="user.avatar_url"
        :title="user.name"
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
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Dashboard"
          value="home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="Profile"
          value="account"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-file-document-outline"
          title="Resume"
          value="applications"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cog-outline"
          title="Settings"
          value="settings"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          :style="{ marginTop: 'auto' }"
          @click="Logout"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main :class="{ 'pt-2': mobile, 'pt-8': !mobile }">
      <v-container :fluid="mobile">
        <slot name="content"></slot>
      </v-container>
    </v-main>

    <BottomNavigationLayout v-if="mobile" />
  </v-app>
</template>

<style scoped>
.v-list-item:hover {
  background-color: #4caf50;
  color: white;
}
.appbar {
  background: #4caf50;
}
</style>
