<script setup>
import BottomNavigationLayout from './BottomNavigationLayout.vue'
import { useRouter } from 'vue-router'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import { useAuthUserStore } from '@/stores/authUser'
import { useWindowSize } from '@vueuse/core'
import { getAvatarText } from '@/utils/helpers'
import { ref, computed, onMounted } from 'vue'
import logo from '@/assets/logo-removebg-preview.png'

// Reactive variables
const notifications = ref([])

// Declare employerId to store the employer ID from the profile
const employerId = ref()

// Fetch employer ID from the profile
const fetchEmployerId = async () => {
  try {

    // Fetch the employer profile to get employer_id
    const { data: employerProfile, error: employerError } = await supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', authStore.userData.id)
      .single()

    if (employerError) {
      console.error('Error fetching employer profile:', employerError)
      return
    }

      employerId.value = employerProfile.id
  } catch (err) {
    console.error('Unexpected error fetching employer ID:', err)
  }
}
const fetchNotifications = async () => {
  try {


    const { data, error } = await supabase
      .from('view_applicant_who_are_confirmed')
      .select('*')
      .eq('confirmation', 'confirmed') // Filter by confirmation
      //.eq('employer_id', employerId.value); // Filter by employer ID

    if (error) {
      console.error('Error fetching notifications:', error);
      return;
    }

    notifications.value = data
      ? data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      : [];
  } catch (err) {
    console.error('Error fetching notifications:', err);
  }
};


const subscribeToNotifications = async () => {
  try {
    const { data: currentUser, error: userError } = await supabase.auth.getUser();

    if (userError || !currentUser?.user?.id) {
      console.error(
        'Error fetching current user:',
        userError || 'No user logged in',
      );
      return;
    }

    // Subscribe to changes in the `applications` table
    supabase
      .channel('applications-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'applications' },
        async (payload) => {
          // Check if the change is relevant to the view
          if (payload.new.confirmation === 'confirmed') {
            // Fetch updated data from the view
            const { data: updatedNotifications, error } = await supabase
              .from('view_applicant_who_are_confirmed')
              .select('*')
              .eq('confirmation', 'confirmed');

            if (error) {
              console.error('Error fetching updated notifications:', error);
              return;
            }

            // Update the notifications array
            notifications.value = updatedNotifications
              ? updatedNotifications.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
              : [];
          }
        },
      )
      .subscribe();
  } catch (err) {
    console.error('Unexpected error subscribing to notifications:', err);
  }
};


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
const showEmployerDialog = ref(false)
const settingsHover = ref(false)

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

const companyName = ref('')

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
    // Fetch employer profile
    const { data: employerProfile, error: employerError } = await supabase
      .from('employer_profiles') // Replace with your table name
      .select('company_name')
      .eq('user_id', currentUser.user.id)
      .single()

    if (employerError) {
      console.error('Error fetching employer profile:', employerError)
      return
    }

    // Set company name
    if (employerProfile) {
      companyName.value = employerProfile.company_name
    }
  } catch (err) {
    console.error('Unexpected error fetching user data:', err)
  }
}

const submitEmployerDetails = async () => {
  try {
    // Get the current logged-in user
    const { data: currentUser, error: userError } =
      await supabase.auth.getUser()
    if (userError || !currentUser || !currentUser.user) {
      console.error('Error fetching user:', userError)
      return
    }

    // Prepare the employer details to be inserted
    const employerDetails = {
      user_id: currentUser.user.id, // Map the foreign key
      company_name: employerForm.value.company_name,
      company_social: employerForm.value.company_social,
      company_category: employerForm.value.company_category,
      created_at: new Date().toISOString(), // Timestamp
    }

    // Insert the employer details into the 'employer_profiles' table
    const { data, error } = await supabase
      .from('employer_profiles') // Your table name
      .insert([employerDetails])

    if (error) {
      console.error('Error inserting employer details:', error)
      return
    }

    console.log('Employer details submitted successfully:', data)

    // Close the dialog after successful submission
    showEmployerDialog.value = false

    // Redirect to the employer dashboard
    router.push('/employerdashboard')
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}


// Function to calculate relative time
const calculateRelativeTime = dateString => {
  const now = new Date()
  const jobDate = new Date(dateString)
  const diffInSeconds = Math.floor((now - jobDate) / 1000)

  const minutes = Math.floor(diffInSeconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else {
    return 'Just now'
  }
}


// Lifecycle hook
onMounted(() => {
  fetchUserData()
  // Fetch initial notifications
  fetchNotifications()
  // Start listening for real-time updates
  subscribeToNotifications ()
  fetchEmployerId()
  supabase.removeAllChannels()
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
      <h3 v-if="!mobile">
      <v-icon left>mdi-office-building-minus-outline</v-icon>
      {{ companyName || 'Loading' }}
    </h3>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
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

      <!-- // Notification Bell -->

      <v-menu open-on-click>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-badge :color="'error'" :content="notifications.length">
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list dense rounded>
          <v-card
            v-for="(notification, index) in notifications"
            :key="index"
            class="ma-5 pa-4"
            rounded
            @click="markAsViewed(notification.id)"
          >
            <v-card-title>
              <span class="font-weight-bold">{{
                notification.job_title || 'Unknown Job'
              }}</span>
            </v-card-title>
            <v-card-subtitle class="text-caption">
              You have successfully hired {{ notification.full_name }}
            </v-card-subtitle>

            <v-card-subtitle class="text-caption">
              {{ calculateRelativeTime(notification.updated_at) }}
            </v-card-subtitle>
          </v-card>

          <v-list-item v-if="!notifications.length">
            <v-list-item-title class="text-center"
              >No new notifications</v-list-item-title
            >
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
                  authStore.userData.first_name +
                    ' ' +
                    authStore.userData.last_name,
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
          to="/employerdashboard"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-briefcase-outline"
          title="Employer Information"
          value="applications"
          to="/employerinformation"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-alpha-a"
          title="Posted Jobs"
          value="postedjobs"
          to="/postedjobs"
        ></v-list-item>
        <!--
        <v-list-item
          prepend-icon="mdi-application"
          title="Applications List"
          value="application-list"
          to="/application-list"
        ></v-list-item> -->

        <v-list-group
          prepend-icon="mdi-cog-outline"
          title="Settings"
          :value="settingsHover"
          no-action
          @mouseenter="settingsHover = true"
          @mouseleave="settingsHover = false"
        >
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props"> </v-list-item>
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
          <v-btn color="success" @click="submitEmployerDetails"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main :class="{ 'pt-2': mobile, 'pt-8': !mobile }">
      <v-container :fluid="mobile">
        <slot name="content"></slot>
      </v-container>
    </v-main>

    <BottomNavigationLayout />
  </v-app>
</template>

<style scoped src="./css/EmployerNavigationLayoutStyle.css"></style>
