<script setup>
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue'
import { ref, onMounted, reactive } from 'vue'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'

const authStore = useAuthUserStore()

// Data and functions
const jobListings = ref([])
const loading = ref(true)
const error = ref(null)
const activePopupJobId = ref(null) // Track which job's popup is open
const newApplication = reactive({
  letter: '',
})

const clearDialog = () => {
  activePopupJobId.value = null
  newApplication.letter = ''
}

// Function to fetch job listings
const fetchJobListings = async () => {
  loading.value = true
  const { data, error: fetchError } = await supabase
    .from('job_listings')
    .select('*')
    .order('created_at', { ascending: false })

  if (fetchError) {
    error.value = fetchError.message
  } else {
    jobListings.value = data.map(job => ({
      ...job,
      relativeTime: calculateRelativeTime(job.created_at),
    }))
    console.log(jobListings.value)
  }
  loading.value = false
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

const sendApplication = async () => {
  try {
    // Validate input

    console.log({
      user_id: authStore.userData.id,
      job_id: activePopupJobId.value,
      employer_id: jobListings.value.find(
        job => job.id === activePopupJobId.value,
      )?.employer_id,
      cover_letter: newApplication.letter,
      created_at: new Date().toISOString(),
    })

    const { error: insertError } = supabase.from('applications').insert([
      {
        user_id: authStore.userData.id,
        job_id: activePopupJobId.value,
        employer_id: jobListings.value.find(
          job => job.id === activePopupJobId.value,
        )?.employer_id,
        cover_letter: newApplication.letter,
        created_at: new Date().toISOString(),
      },
    ])

    if (insertError) {
      console.error('Supabase Error:', insertError.message)
      throw new Error(`Error submitting application: ${insertError.message}`)
    }

    alert('Your application has been successfully submitted!')
    clearDialog()
  } catch (error) {
    console.error('Application Error:', error.message)
    alert(error.message)
  }
}

// Fetch job listings when component is mounted
onMounted(fetchJobListings)
onMounted(fetchUserData)
</script>

<template>
  <JobNavigationLayout>
    <template #content>
      <v-app class="d-flex fill-height">
        <!-- Main Content Area -->
        <v-main class="pt-8">
          <v-container>
            <v-card class="pa-8">
              <v-card-title class="title">Dashboard</v-card-title>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  xl="4"
                  class="pb-6"
                  v-for="job in jobListings"
                  :key="job.id"
                >
                  <v-card class="pa-6 hover-card" height="250px">
                    <v-card-title class="title">{{
                      job.job_title
                    }}</v-card-title>
                    <v-card-text>
                      <p class="budget">
                        <i class="mdi mdi-currency-php"></i>
                        {{ job.salary_range }}
                      </p>
                      <p class="location">
                        <span class="icon material-icons">Location</span
                        >{{ job.location }}
                      </p>
                      <div class="category-label">
                        Category: {{ job.category }}
                      </div>
                      <div class="job-type-duration">
                        Posted: {{ job.relativeTime }}
                      </div>
                    </v-card-text>
                    <div class="button-container">
                      <v-btn
                        class="apply-button mt-4"
                        @click="activePopupJobId = job.id"
                        >Apply</v-btn
                      >
                    </div>
                  </v-card>

                  <v-dialog
                    v-model="activePopupJobId"
                    :value="activePopupJobId === job.id"
                    persistent
                    max-width="500"
                  >
                    <v-card class="pa-8 pop-up">
                      <v-card-title>Send an Application letter</v-card-title>
                      <v-card-text>
                        <v-form @submit.prevent="sendApplication">
                          <v-textarea
                            density="compact"
                            rounded
                            variant="outlined"
                            v-model="newApplication.letter"
                            label="Application Letter"
                            required
                          >
                          </v-textarea>
                          <div class="button-container mt-4">
                            <v-btn
                              rounded
                              type="submit"
                              :event="sendApplication"
                              class="apply-button"
                              @click="activePopupJobId = null"
                              >Submit</v-btn
                            >
                            <v-btn
                              rounded
                              class="ml-2"
                              @click="activePopupJobId = null"
                              >Cancel</v-btn
                            >
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-main>
      </v-app>
    </template>
  </JobNavigationLayout>
</template>

<style scoped src="@/views/system/style/JobDashboardStyle.css"></style>
