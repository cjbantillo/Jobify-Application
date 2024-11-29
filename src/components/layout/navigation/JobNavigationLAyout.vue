<script setup>
import BottomNavigationLayout from './BottomNavigationLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAvatarText } from '@/utils/helpers'
import { supabase, formActionDefault } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser.js'

// Use Pinia Store
const authStore = useAuthUserStore()

const drawer = ref(true)
const rail = ref(true)
const loaded = ref(false)
const loading = ref(false)

// Use Vue Router for navigation
const router = useRouter()

function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}
// Load Variables
const formAction = ref({
  ...formActionDefault,
})

// Logout Functionality
const onLogout = async () => {
  /// Reset Form Action utils; Turn on processing at the same time
  formAction.value = { ...formActionDefault, formProcess: true }

  // Get supabase logout functionality
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during logout:', error)
    return
  }

  formAction.value.formProcess = false
  // Reset State
  setTimeout(() => {
    authStore.$reset()
  }, 2500)
  // Redirect to homepage
  router.replace('/')
}
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
      <v-img :src="logo" alt="Logo" max-height="80" max-width="100" class="mr-4" />
      <h3 v-if="!mobile">Jobify</h3>
      <v-spacer></v-spacer>
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

        <v-row class="button-row align-end justify-end">
          <v-col>
            <v-btn
              class="w-50 rounded-pill btn"
              depressed
              @click="switchToEmployer"
            >
              Start Hiring
            </v-btn>
          </v-col>
        </v-row>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      rail-width="80"
      width="250"
      @click="rail = false"
    >

      <!-- Conditional Rendering of User Info -->
      <v-list-item
        :subtitle="authStore.userData.email"
        :title="
          authStore.userData.first_name + ' ' + authStore.userData.last_name
        "
        nav
      >
        <!-- Prepend Avatar -->
        <template v-slot:prepend>
          <v-avatar
            v-if="authStore.userData.image_url"
            :image="authStore.userData.image_url"
            color="#4caf50"
            :size="rail ? '24' : '40'"
          ></v-avatar>

          <v-avatar v-else color="#4caf50">
            <span>
              {{
                getAvatarText(
                  authStore.userData.first_name + ' ' + authStore.userData.last_name,
                )
              }}
            </span>
          </v-avatar>

        </template>

        <!-- Append Slot for the Button -->
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
          to="/jobdashboard"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-file-document-outline"
          title="Resume"
          value="applications"
          to="resume"
        ></v-list-item>

        <v-list-group
          prepend-icon="mdi-cog-outline"
          title="Settings"
          :value="settingsHover"
          no-action
          @mouseenter="settingsHover = true"
          @mouseleave="settingsHover = false"
        >
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
            </v-list-item>
          </template>

          <v-list-item
            v-for="item in settingsOptions"
            :key="item.title"
            :title="item.title"
            :to="item.to"
            class="pl-4"
          ></v-list-item>
        </v-list-group>


        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          :style="{ marginTop: 'auto' }"
          @click="Logout"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="showEmployerDialog" max-width="600px">
    <v-card class="p-5" :style="{ backgroundColor: '#f7f9f7' }">
      <v-card-title class="text-h6 text-center" :style="{ color: '#4caf50' }">
        Employer Details
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="employerForm.company_name"
          label="Company Name"
          required
          outlined
          dense
        />
        <v-text-field
          v-model="employerForm.company_social"
          label="Company Socials"
          outlined
          dense
        />
        <v-select
          v-model="employerForm.company_category"
          :items="categories"
          label="Company Category"
          required
          item-value="name"
          item-text="name"
          outlined
          dense
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="showEmployerDialog = false"
          :style="{ color: '#4caf50' }"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success"
          @click="submitEmployerDetails"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

    <v-main :class="{ 'pt-2': mobile, 'pt-8': !mobile }">
      <v-container :fluid="mobile">
        <slot name="content"></slot>
      </v-container>
    </v-main>

    <BottomNavigationLayout v-if="mobile" />
  </v-app>
</template>

<style scoped>
<<<<<<< HEAD
.v-list-item:hover {
  background-color: #4caf50;
  color: white;
=======
@import url('https://fonts.googleapis.com/css2?family=Matemasie&family=Varela+Round&display=swap');

*{
  font-family: 'Varela Round', sans-serif;
  font-weight: 400;
  font-style: normal;
>>>>>>> 03f741c8566eaa163699614422f45d0f1e099eb8
}
.button-row {
  color: #fff; /* Same primary green for the text */
  font-weight: 100;
  font-size: 0.5rem;
  transition: all 0.3s ease;
  float: right;

}
.button-row .btn{
  text-transform: none;
  float: right;
  background-color: rgb(22, 71, 35);
}
.search-bar {
  font-family: 'Varela Round', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.appbar {
  background: #4caf50;
}
.v-btn {
  font-weight: 500;
}

.v-select, .v-text-field {
  margin-bottom: 20px; /* Margin between fields */
}

.v-card {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px; /* Padding around the card */
}

.v-dialog .v-card-title {
  font-weight: 600;
  padding-bottom: 20px; /* Padding below the title */
}

.v-card-actions {
  display: flex;
  justify-content: space-between;
  padding: 20px 24px;
}

.v-btn.primary {
  background-color: #4caf50 !important;
}
.v-avatar {
  width: 40px;
  height: 40px;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%; /* Keep it circular */
  margin: 0 auto; /* Center the avatar */
  transition: width 0.2s ease, height 0.2s ease; /* Smooth resizing */
  margin: 0px;
}

.v-navigation-drawer[rail] .v-avatar {
  width: 24px;
  height: 24px;
}
.v-navigation-drawer[rail] .v-list-item {
  justify-content: center; /* Center list items in collapsed state */
}
.v-navigation-drawer {
  transition: width 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.v-navigation-drawer:hover {
  width: 250px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.v-navigation-drawer[rail] {
  width: 40px !important;
}

.v-navigation-drawer[rail]:hover {
  width: 250px !important;
}

.v-list-item {
  display: flex;
  align-items: center;
  margin: 5px 0; /* Adjusted to avoid redundant margin conflicts */
  height: 2rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* List Item Hover */
.v-list-item:hover {
  background-color: #e8f5e9; /* Light green background on hover */
  color: #4caf50; /* Primary green for text on hover */
}

/* List Group Header Styles */
.v-list-group__header {
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* List Group Header Hover */
.v-list-group__header:hover {
  background-color: #4caf50; /* Primary green background */
  color: white; /* White text for contrast */
}

/* Alternate Hover Background */
.v-list-item:hover.alt {
  background-color: #d0f0c0; /* Softer green alternative */
  color: #388e3c; /* Darker green text for contrast */
}

</style>
