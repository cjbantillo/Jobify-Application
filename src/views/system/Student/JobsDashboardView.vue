<script setup>
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue'
import { ref, onMounted, reactive } from 'vue'
import { supabase } from '@/utils/supabase'

// Data and functions
const jobListings = ref([])
const loading = ref(true)
const error = ref(null)
const activePopupJobId = ref(null) // Track which job's popup is open
const userApplications = ref([]) // Track applications by the user
const newApplication = reactive({
  application_letter: '',
  facebook_link: '',
  available_time:'',
})

const clearDialog = () => {
  activePopupJobId.value = null
  newApplication.letter = ''
  newApplication.facebook_link = ''
  newApplication.available_time = ''
}

// Snack bar state
const snackBar = reactive({
  show: false,
  color: '',
  message: '',
})

const showSnackBar = (message, color = 'success') => {
  snackBar.message = message
  snackBar.color = color
  snackBar.show = true
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


// Fetch applications of the current user
const fetchUserApplications = async () => {
  try {
    const { data: currentUser, error: userError } =
      await supabase.auth.getUser()
    if (userError || !currentUser?.user?.id) {
      console.error('Error fetching current user:', userError || 'No user logged in')
      return
    }

    const { data: applications, error: applicationsError } = await supabase
      .from('applications')
      .select('*')
      .eq('applicant_id', currentUser.user.id)

    if (applicationsError) {
      throw applicationsError
    }

    userApplications.value = applications.map(app => app.job_id)
  } catch (err) {
    console.error('Error fetching user applications:', err)
  }
}

// Check if the user has applied for a job
const hasApplied = jobId => userApplications.value.includes(jobId)

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
    const { data: currentUser, error } = await supabase.auth.getUser()

    if (error || !currentUser || !currentUser.user) {
      console.error('Error fetching user:', error)
      return
    }

    const applicationDetails = {
      job_id: activePopupJobId.value,
        employer_id: jobListings.value.find(
          job => job.id === activePopupJobId.value,
        )?.employer_id,
      applicant_id: currentUser.user.id,
      application_letter: newApplication.application_letter,
      facebook_link: newApplication.facebook_link,
      available_time: newApplication.available_time,
      created_at: new Date().toISOString(),
    }

    const { error: insertError } = await supabase
    .from('applications')
    .insert([applicationDetails]);

    if (insertError) {
      console.error('Supabase Error:', insertError.message)
      throw new Error(`Error submitting application: ${insertError.message}`)
    }
    await fetchJobListings()
    clearDialog()
    showSnackBar('Your application has been successfully submitted!', 'success')
  } catch (error) {
    console.error('Application Error:', error.message)
    showSnackBar(`Application failed to submit: ${error.message}`, 'error')

  }
}

const timeAvailable = ref([
  'Today',
  'Tomorrow',
  'This Week',
  'Next Week'
])

// Fetch job listings when component is mounted
onMounted(() => {
  fetchJobListings()
  fetchUserApplications()
  fetchUserData()
})
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
                  <v-card class="pa-6 hover-card" min-height="500px" rounded >
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
                      <v-textarea
                        v-model="job.job_description"
                        readonly
                        variant="outlined"
                        rounded
                        auto-grow
                        rows="2"
                      ></v-textarea>
                    </v-card-text>
                    <div class="button-container">
                      <v-btn
                        class="apply-button mt-4"
                        :disabled="hasApplied(job.id)"
                        @click="!hasApplied(job.id) && (activePopupJobId = job.id)"
                      >
                        {{ hasApplied(job.id) ? 'Applied' : 'Apply' }}
                      </v-btn>
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
                          <v-text-field
                          prepend-inner-icon="mdi-facebook"
                            density="compact"
                            rounded
                            variant="outlined"
                            v-model="newApplication.facebook_link"
                            label="Facebook Link (Please don't use dump accounts)"
                            required
                          ></v-text-field>
                          <v-select
                          density="compact"
                          rounded
                          variant="outlined"
                          v-model="newApplication.available_time"
                          :items="timeAvailable"
                          label="Available Time"
                          required
                        ></v-select>
                          <v-textarea
                            prepend-inner-icon="mdi-email-open-outline"
                            density="compact"
                            rounded
                            variant="outlined"
                            v-model="newApplication.application_letter"
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

          <!-- Snack Bar -->
        <v-snackbar
          v-model="snackBar.show"
          :color="snackBar.color"
          timeout="3000"
        >
          {{ snackBar.message }}
        </v-snackbar>

        </v-main>
      </v-app>
    </template>
  </JobNavigationLayout>
</template>

<style scoped src="@/views/system/style/JobDashboardStyle.css"></style>
