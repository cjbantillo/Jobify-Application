<script setup>
import EmployerNavigationLayout from '@/components/layout/navigation/EmployerNavigationLayout.vue'
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const categories = ref([
  'Customer Service Representative',
  'Sales Associate',
  'Tutoring',
  'Freelance Writing/Content Creation',
  'Data Entry',
  'Online Surveys and Market Research',
  'Virtual Assistant',
  'Food Delivery Rider/Driver',
  'Social Media Management',
  'Event Staff',
  'Graphic Design/Multimedia',
  'Photography/Videography',
  'Translation/Transcription',
  'Brand Ambassador',
  'Call Center Agent',
  'Fitness Trainer/Instructor',
  'Household Helper',
  'Pet Care',
  'Delivery or Courier Service',
  'Website Development/Design',
  'Others',
])

const newJobPost = ref({
  title: '',
  salary: '',
  category: '',
  job_description: '',
  location: '',

})

const jobPosts = ref([]) // To store job posts
const showPostPopup = ref(false) // Control popup visibility
const userId = ref(null) // Store logged-in user ID
const companyName = ref('') // Store company name from employer profile

// Fetch job posts for the logged-in user
const fetchJobPosts = async () => {
  try {
    const { data: userResponse, error: userError } =
      await supabase.auth.getUser()
    if (userError || !userResponse?.user) {
      console.error('Error fetching user or user not authenticated:', userError)
      return
    }

    const loggedInUserId = userResponse.user.id

    // Fetch employer profile using user ID
    const { data: employerProfiles, error: profileError } = await supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', loggedInUserId)

    if (profileError) {
      console.error('Error fetching employer profile:', profileError)
      return
    }

    if (!employerProfiles || employerProfiles.length === 0) {
      console.error('No employer profile found for the user.')
      return
    }

    const employerProfile = employerProfiles[0]
    userId.value = employerProfile.id
    companyName.value = employerProfile.company_name // Assign the company name

    // Fetch job listings using employer ID
    const { data: jobListings, error: jobsError } = await supabase
      .from('job_listings')
      .select('*')
      .eq('employer_id', userId.value)

    if (jobsError) {
      console.error('Error fetching job posts:', jobsError)
      return
    }

    jobPosts.value = jobListings || []
    showPostPopup.value = jobPosts.value.length === 0 // Show popup if no posts exist
  } catch (error) {
    console.error('Unexpected error fetching job posts:', error)
  }
}

// Add a new job post
const addJobPost = async () => {
  try {
    const { data, error } = await supabase.from('job_listings').insert([
      {
        job_title: newJobPost.value.title, // Job title
        salary_range: newJobPost.value.salary, // Salary range
        category: newJobPost.value.category, // Job category
        job_description: newJobPost.value.job_description, // Job description
        location: newJobPost.value.location, // Optional field
        employer_id: userId.value, // Use fetched employer ID
      },
    ])

    await fetchJobPosts()

    if (error) {
      console.error('Error inserting job post:', error)
      return
    }

    // Push to the local list for reactivity
    jobPosts.value.push(data[0])
    newJobPost.value = {
      title: '',
      salary: '',
      category: '',
      location: '',
      job_description: '',
    }
    showPostPopup.value = false
    console.log('Job post added successfully:', data[0])
  } catch (err) {
    console.error('Unexpected error adding job post:', err)
  }
}

// Delete a job post
const deleteJobPost = async jobId => {
  try {
    const { error } = await supabase
      .from('job_listings')
      .delete()
      .eq('id', jobId)

    if (error) {
      console.error('Error deleting job post:', error)
      return
    }

    // Remove the job post from the local list
    jobPosts.value = jobPosts.value.filter(job => job.id !== jobId)
    console.log('Job post deleted successfully')
  } catch (err) {
    console.error('Unexpected error deleting job post:', err)
  }
}

// Fetch data when the component is mounted
onMounted(fetchJobPosts)
</script>

<template>
  <EmployerNavigationLayout>
    <template #content>
      <v-app class="d-flex fill-height">
        <v-main class="pt-8">
          <v-container variant="outlined" class="pa-8">
            <v-row>
              <v-col>
                <!-- Display existing job posts if any -->
                <div v-if="jobPosts.length > 0">
                  <v-btn @click="showPostPopup = true" class="mb-8"
                    >Post a New Job</v-btn
                  >

                  <v-card
                    v-for="(job, index) in jobPosts"
                    :key="index"
                    class="job-card mb-4"
                  >
                    <v-card-title class="job-title">{{
                      job.job_title
                    }}</v-card-title>
                    <v-card-subtitle class="salary-category">
                      <span class="salary"
                        >Salary: <i class="mdi mdi-currency-php"></i>
                        {{ job.salary_range }}</span
                      >
                      <span class="category">Category: {{ job.category }}</span>
                    </v-card-subtitle>
                    <v-card-text class="location"
                      >location: {{ job.location }}</v-card-text
                    >
                    <v-card-text class="job-description"
                      >Description: {{ job.job_description }}</v-card-text
                    >
                    <v-card-actions>
                      <v-btn @click="deleteJobPost(job.id)">
                        Delete
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>

                <!-- If no job posts, automatically show popup -->
                <v-dialog v-model="showPostPopup" persistent max-width="500">
                  <v-card class="pa-8 pop-up">
                    <v-card-title>Post a Job</v-card-title>
                    <v-card-text>
                      <v-form @submit.prevent="addJobPost">
                        <v-text-field
                          density="compact"
                          rounded
                          variant="outlined"
                          v-model="newJobPost.title"
                          label="Job Title"
                          required
                        ></v-text-field>
                        <v-text-field
                          prepend-inner-icon="mdi-currency-php"
                          density="compact"
                          rounded
                          type="number"
                          variant="outlined"
                          v-model="newJobPost.salary"
                          label="Salary"
                          required
                        ></v-text-field>
                        <v-select
                          density="compact"
                          rounded
                          variant="outlined"
                          v-model="newJobPost.category"
                          :items="categories"
                          label="Job Category"
                          required
                        ></v-select>
                        <v-text-field
                          density="compact"
                          rounded
                          variant="outlined"
                          v-model="newJobPost.location"
                          label="Location"
                          required
                        ></v-text-field>
                        <v-textarea
                          density="compact"
                          rounded
                          variant="outlined"
                          v-model="newJobPost.job_description"
                          label="Job Description"
                          required
                        ></v-textarea>
                        <div class="button-container mt-4">
                          <v-btn
                            rounded
                            type="submit"
                            :event="addJobPost"
                            class="apply-button"
                            >Add Job</v-btn
                          >
                          <v-btn
                            rounded
                            class="ml-2"
                            @click="showPostPopup = false"
                            >Cancel</v-btn
                          >
                        </div>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </template>
  </EmployerNavigationLayout>
</template>

<style scoped src="@/views/system/style/PostJobDashboardStyle.css"></style>
