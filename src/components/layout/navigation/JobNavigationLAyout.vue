<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import { useAuthUserStore } from '@/stores/authUser'
import { useWindowSize } from '@vueuse/core'
import { getAvatarText } from '@/utils/helpers'
import logo from '@/assets/jobify1_Logo.png'

// this item is for the notification bell for further update
const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]

// Reactive screen dimensions
const { width } = useWindowSize()
const mobile = computed(() => width.value <= 768)

// Pinia store for auth user
const authStore = useAuthUserStore()

// Reactive variables
const drawer = ref(true)
const rail = ref(true)
const loaded = ref(false)
const loading = ref(false)
const user = ref(null)
const showEmployerDialog = ref(false)
const showUploadDialog = ref(false)
const settingsHover = ref(false)
const selectedFile = ref(null)
const fileName = ref('')
const fileInput = ref(null)

// Supabase bucket and file details
const schedules = 'schedules' // Ensure this matches your Supabase bucket name exactly
const filePath = ref('') // Use a ref for filePath

// Form data for employer details
const employerForm = ref({
  company_name: '',
  company_social: '',
  company_description: '',
  company_category: '',
})

const categories = [
  'Retail and Wholesale',
  'Supermarkets and Grocery Stores',
  'Convenience Stores',
  'Pharmacies',
  'Hardware and Construction Supplies',
  'Clothing and Apparel',
  'Electronics and Gadgets',
  'Auto Parts and Accessories',
  'Wholesale and Trading Businesses',
  'Food and Beverage',
  'Restaurants',
  'Cafés and Coffee Shops',
  'Fast Food Chains',
  'Food Stalls and Kiosks',
  'Catering Services',
  'Bakeries and Pastry Shops',
  'Bars and Pubs',
  'Health and Wellness',
  'Clinics and Medical Services',
  'Fitness Centers and Gyms',
  'Spas and Wellness Centers',
  'Optical Shops',
  'Dental Clinics',
  'Professional Services',
  'Accounting and Bookkeeping',
  'Legal Services',
  'Marketing and Advertising',
  'IT and Web Development',
  'Real Estate Agencies',
  'Human Resource and Recruitment',
  'Travel and Tour Agencies',
  'Home and Construction',
  'Interior Design Services',
  'Construction Firms',
  'Appliance Repair Services',
  'Furniture Stores',
  'Landscaping Services',
  'Education and Training',
  'Tutorial Centers',
  'Daycares and Preschools',
  'Vocational and Technical Schools',
  'Language Learning Centers',
  'Review Centers',
  'Transportation and Logistics',
  'Public Transportation Operators',
  'Taxi and Ride-hailing Services',
  'Delivery and Courier Services',
  'Freight and Logistics Companies',
  'Vehicle Rentals',
  'Entertainment and Leisure',
  'Event Planning Services',
  'Party Supplies Rentals',
  'Photography and Videography',
  'Resorts and Hotels',
  'Game Zones and Arcades',
  'Agriculture and Farming',
  'Poultry and Livestock',
  'Agricultural Supply Stores',
  'Rice Milling and Grains Trading',
  'Fresh Produce Markets',
  'Technology and Communications',
  'Internet Service Providers',
  'Gadget Repair Shops',
  'Computer Shops',
  'Printing and Photocopying Services',
  'Financial Services',
  'Banks and Lending Institutions',
  'Pawnshops',
  'Money Remittance Services',
  'Insurance Agencies',
  'Investment and Trading Services',
]

const settingsOptions = [
  { title: 'Account Information', to: '/settings/account-information' },
  { title: 'Change Password', to: '/settings/change-password' },
  { title: 'Security & Privacy', to: '/settings/security-privacy' },
]

// Vue Router for navigation
const router = useRouter()

const onClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}

const formAction = ref({ ...formActionDefault })

// Logout function
const Logout = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during logout:', error)
    return
  }

  formAction.value.formProcess = false

  setTimeout(() => {
    authStore.$reset()
  }, 2500)

  router.replace('/')
}

// Fetch user data on component mount
const fetchUserData = async () => {
  try {
    const { data: currentUser, error: userError } =
      await supabase.auth.getUser()
    if (userError || !currentUser?.user?.id) {
      console.error(
        'Error fetching current user:',
        userError || 'No user logged in',
      )
      return
    }
  } catch (err) {
    console.error('Unexpected error fetching user data:', err)
  }
}

const submitEmployerDetails = async () => {
  try {
    const { data: currentUser, error: userError } =
      await supabase.auth.getUser()
    if (userError || !currentUser || !currentUser.user) {
      console.error('Error fetching user:', userError)
      return
    }

    const employerDetails = {
      user_id: currentUser.user.id,
      company_name: employerForm.value.company_name,
      company_social: employerForm.value.company_social,
      company_category: employerForm.value.company_category,
      created_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('employer_profiles')
      .insert([employerDetails])

    if (error) {
      console.error('Error inserting employer details:', error)
      return
    }

    showEmployerDialog.value = false
    router.push('/employerdashboard')
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

// Upload file to Supabase
const uploadFile = async () => {
  if (!selectedFile.value) return

  try {
    loading.value = true
    const { error } = await supabase.storage
      .from(schedules) // Ensure the bucket name is correct
      .upload(filePath.value, selectedFile.value, {
        cacheControl: '3600',
        upsert: true,
        contentType: selectedFile.value.type,
      })

    if (error) throw error

    alert('Successfully submitted!')
    showUploadDialog.value = false
  } catch (error) {
    console.error('Error uploading schedule:', error.message)
    alert(`Failed to upload schedule: ${error.message}`)
  } finally {
    loading.value = false
  }
}

// Handle file input change
const handleFileChange = event => {
  processFile(event.target.files[0])
}

// Process the selected file
const processFile = file => {
  selectedFile.value = file
  fileName.value = file.name
  filePath.value = `${authStore.userData.first_name || ''} ${authStore.userData.last_name || ''}/${file.name}` // Create a unique file path
}

// Lifecycle hook
onMounted(() => {
  fetchUserData()
})
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
      <v-img
        :src="logo"
        alt="Logo"
        max-height="80"
        max-width="100"
        class="mr-4"
      />
      <h3 v-if="!mobile">Jobify</h3>
      <v-spacer></v-spacer>
      <v-text-field
        clearable
        class="my-auto search-bar"
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search"
        variant="outlined"
        hide-details
        single-line
        rounded
        @click:append-inner="onClick"
      />
      <v-spacer></v-spacer>

      <!-- notification bell  -->
     
    <v-menu
      open-on-click
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon
        >
        <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      rail-width="80"
      width="250"
      @click="rail = false"
    >
      <v-list-item
        :subtitle="authStore.userData.email"
        :title="
          authStore.userData.first_name + ' ' + authStore.userData.last_name
        "
        nav
      >
        <template v-slot:prepend>
          <v-avatar
            v-if="authStore.userData.image_url"
            :image="authStore.userData.image_url"
            color="#4caf50"
            :size="rail ? '24' : '40'"
          ></v-avatar>
          <v-avatar v-else color="#4caf50">
            <span>{{
              getAvatarText(
                authStore.userData.first_name +
                  ' ' +
                  authStore.userData.last_name,
              )
            }}</span>
          </v-avatar>
        </template>
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
          to="/resume"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-upload"
          title="Upload Schedule"
          value="upload"
          @click="showUploadDialog = true"
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
            <v-list-item v-bind="props"></v-list-item>
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

    <v-dialog v-model="showUploadDialog" max-width="600px">
      <v-card class="p-5" :style="{ backgroundColor: '#f7f9f7' }">
        <v-card-title class="text-h6 text-center" :style="{ color: '#4caf50' }">
          Upload Schedule
        </v-card-title>
        <v-card-text>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            "
          >
            <v-btn
              color="success"
              @click="$refs.fileInput.click()"
              :style="{ backgroundColor: '#4caf50', color: 'white' }"
              prepend-icon="mdi-upload"
            >
              Upload Schedule
            </v-btn>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              style="display: none"
            />
            <span v-if="fileName" style="margin-top: 10px">{{ fileName }}</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="showUploadDialog = false"
            :style="{ color: '#4caf50' }"
          >
            Cancel
          </v-btn>
          <v-btn color="success" @click="uploadFile"> Submit </v-btn>
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
@import url('https://fonts.googleapis.com/css2?family=Matemasie&family=Varela+Round&display=swap');

* {
  font-family: 'Varela Round', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.button-row {
  color: #fff; /* Same primary green for the text */
  font-weight: 100;
  font-size: 0.5rem;
  transition: all 0.3s ease;
  float: right;
}

.button-row .btn {
  text-transform: none;
  float: right;
  background-color: rgb(22, 71, 35);
}

.search-bar {
  margin: 0 auto;
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

.v-select,
.v-text-field {
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

.v-btn.primary,
.v-btn.success {
  background-color: #4caf50 !important;
  color: white !important;
}

.v-avatar {
  width: 40px;
  height: 40px;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%; /* Keep it circular */
  margin: 0 auto; /* Center the avatar */
  transition:
    width 0.2s ease,
    height 0.2s ease; /* Smooth resizing */
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
  transition:
    width 0.3s ease,
    box-shadow 0.3s ease;
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
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

/* List Item Hover */
.v-list-item:hover {
  background-color: #e8f5e9; /* Light green background on hover */
  color: #4caf50; /* Primary green for text on hover */
}

/* List Group Header Styles */
.v-list-group__header {
  font-weight: 500;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
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

/* Upload Schedule Styles */
.v-dialog .v-card {
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.v-dialog .v-card-title {
  font-weight: 600;
  text-align: center;
  color: #4caf50;
}

.v-dialog .v-card-actions {
  display: flex;
  justify-content: flex-end;
}

.v-btn.success {
  background-color: #4caf50 !important;
  color: white !important;
}

.v-dialog .v-btn {
  margin: auto;
}
</style>
