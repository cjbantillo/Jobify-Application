<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import { useAuthUserStore } from '@/stores/authUser'
import { useWindowSize } from '@vueuse/core'
import { getAvatarText } from '@/utils/helpers'
import logo from '@/assets/logo.png'

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
const drawer = ref(true);
const rail = ref(true);
const loaded = ref(false);
const loading = ref(false);
const showUploadDialog = ref(false);
const settingsHover = ref(false);
const selectedFile = ref(null);
const fileName = ref('');
const fileInput = ref(null);

// Supabase bucket and file details
const schedules = 'schedules' // Ensure this matches your Supabase bucket name exactly
const filePath = ref('') // Use a ref for filePath

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

      <v-menu open-on-click>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon>mdi-bell-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
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
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
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

<style scoped src="./css/JobNavigationLAyoutStyle.css"></style>
