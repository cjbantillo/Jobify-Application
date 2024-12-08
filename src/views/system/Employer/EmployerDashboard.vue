<script setup>
import EmployerNavigationLayout from '@/components/layout/navigation/EmployerNavigationLayout.vue'
import { ref, onMounted, reactive } from 'vue'
import { supabase } from '@/utils/supabase'

const showPopup = ref(false)
const userInfo = ref(null) // Store user information
const employerForm = ref({
  company_name: '',
  company_social: '',
  company_category: '',
})

const categories = ref([
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
])

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

const fetchUserInfo = async () => {
  try {
    // Get the current logged-in user
    const { data: user, error } = await supabase.auth.getUser()

    if (error || !user?.user) {
      console.error('Error fetching user or user not authenticated:', error)
      return
    }

    // Fetch the employer profile
    const { data: profile, error: profileError } = await supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', user.user.id)
      .single()

    if (profileError || !profile) {
      console.log('No profile found or an error occurred:', profileError)
      showPopup.value = true // Show popup if no profile exists or error occurs
    } else {
      showPopup.value = false // Do not show popup if profile exists
    }

    // Fetch and store user details
    userInfo.value = { ...user.user } // Store user info
  } catch (err) {
    console.error('Unexpected error while fetching user information:', err)
  }
}

const submitEmployerDetails = async () => {
  try {
    const { data: currentUser, error } = await supabase.auth.getUser()

    if (error || !currentUser || !currentUser.user) {
      console.error('Error fetching user:', error)
      return
    }

    const employerDetails = {
      user_id: currentUser.user.id,
      ...employerForm.value, // Spread form values
      created_at: new Date().toISOString(),
    }

    const { error: insertError } = await supabase
      .from('employer_profiles')
      .insert([employerDetails])

    await fetchUserInfo()
    if (insertError) {
      console.error('Error inserting employer details:', insertError)
    } else {
      console.log('Employer details submitted successfully.')
      showPopup.value = false // Close popup after success
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}
// Users data and error handling
const loading = ref(true)

const jobPosts = ref([]) // To store job posts
const userId = ref(null) // Store logged-in user ID
const companyName = ref('')
const fetchJobPosts = async () => {
  try {
    const { data: userResponse, error: userError } = await supabase.auth.getUser()
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
    companyName.value = employerProfile.company_name

    // Fetch job listings using employer ID
    const { data: jobListings, error: jobsError } = await supabase
      .from('job_listings')
      .select('*')
      .eq('employer_id', userId.value)
      .order('created_at', { ascending: false })

    if (jobsError) {
      console.error('Error fetching job posts:', jobsError)
      return
    }

    jobPosts.value = jobListings.map(job => {
  // Calculate relative time for each job
      job.relativeTime = calculateRelativeTime(job.created_at);
      return job;
    });

    jobPosts.value = []

    // For each job, calculate relative time and fetch the number of applicants
    for (const job of jobListings) {
      // Calculate relative time
      const { data: applications, error: appError } = await supabase
        .from('applications')
        .select('*')
        .eq('job_id', job.id)

      if (appError) {
        console.error('Error fetching applications for job:', appError)
        continue
      }

      applications.value = applications.map(application => ({
      ...application,
      relativeTime: calculateRelativeTime(application.created_at),
    }))

      job.applicant_count = applications.length
      jobPosts.value.push(job)
    }
  } catch (error) {
    console.error('Unexpected error fetching job posts:', error)
  }
}

const applicantDialog = ref(false)
const selectedJob = ref(null)
const jobApplicants = ref([]) // Store applicants for the selected job
const fetchJobApplicants = async (job_id) => {
  try {
    const { data, error } = await supabase
      .from('view_applicant_data_in_applied_certain_job')
      .select('*')
      .eq('job_id', job_id);

    if (error) {
      console.error('Error fetching job applicants:', error);
      return;
    }

    // Update each applicant with the relative time
    jobApplicants.value = data.map(applicant => ({
      ...applicant,
      relativeTime: calculateRelativeTime(applicant.created_at), // Add relative time for each applicant
    }));

    console.log('Fetched job applicants:', jobApplicants.value);
  } catch (err) {
    console.error('Unexpected error while fetching applicants:', err);
  }
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


const messageInput = ref(''); // Store the message input
const messagePopupCard = ref(false); // Control the visibility of the message popup card
const selectedApplicant = ref(null); // Store the selected applicant

// Function to show the message popup when the "Hire" button is clicked
const promptMessage = (applicantId) => {
  selectedApplicant.value = applicantId;
  messagePopupCard.value = true;
};
// Function to hire the applicant with the provided message
const hireApplicantWithMessage = async () => {
  try {
    const { data: currentUser, error } = await supabase.auth.getUser();
    if (error || !currentUser?.user) {
      console.error('Error fetching user:', error);
      return;
    }

    // Update applicant status to "hired" and add the message
    const { error: hireError } = await supabase
      .from('applications')
      .update({ status: 'hired', message: messageInput.value, updated_at: new Date().toISOString(), })
      .eq('applicant_id', selectedApplicant.value)
      .eq('job_id', selectedJob.value.id) // Use job_id


    if (hireError) {
      showSnackBar(`Application failed to submit: ${hireError.message}`, 'error')
    } else {
      showSnackBar('Your message has been successfully sent!', 'success')
      await fetchJobPosts()
      await fetchJobApplicants()
      messagePopupCard.value = false; // Close the message popup after hiring
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

const openApplicantsDialog = (job) => {
  selectedJob.value = job; // Set the selected job
  fetchJobApplicants(job.id); // Fetch the applicants for the selected job
  applicantDialog.value = true; // Open the dialog
}


// Fetch user info on component mount
onMounted(async () => {
  await fetchUserInfo()
  await fetchJobPosts()
})
</script>

<template>
  <EmployerNavigationLayout>
    <template #content>
      <v-app class="d-flex fill-height">
        <v-main class="pt-8">
          <v-container>
            <!-- Dashboard Card -->
            <v-card outlined class="dashboard-card pa-8 cont" height="fill">
              <v-card-title class="title text-h5 mb-6" :style="{ color: '#4caf50' }">Dashboard</v-card-title>
              <v-divider class="mt-n3 mb-4"></v-divider>


              <div v-if="!loading && jobPosts.length === 0" class="text-center">
                No job posts found.
              </div>

              <v-container v-else>
                <v-row>
                  <v-col v-for="job in jobPosts" :key="job.id" cols="12" md="6" lg="4">
                    <!-- Job Cards -->
                    <v-card class="hover-card pa-8 ma-3" rounded>
                      <v-card-title class="title" style="font-size: 1.3rem;">{{ job.job_title }}</v-card-title>

                      <v-card-subtitle>
                        {{ job.job_description }}
                      </v-card-subtitle>
                      <v-card-text>
                        <strong>Posted:</strong> {{ job.relativeTime }}
                        <br />
                        <strong>Applicants:</strong> {{ job.applicant_count }}
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="openApplicantsDialog(job)" class="apply-button">View Details</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>

          </v-container>
        </v-main>

        <!-- Applicant Dialog -->
        <v-dialog v-model="applicantDialog" persistent max-width="600">
          <v-card class="rounded-lg shadow-lg" :style="{ backgroundColor: '#ffffff' }">
            <v-card-title class="pa-8 d-flex justify-space-between align-center" :style="{ backgroundColor: '#4caf50', color: '#ffffff' }">
              <span>{{ selectedJob?.job_title }}</span>
              <v-btn icon @click="applicantDialog = false" class="white--text">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text>
              <v-list dense>
                <v-list-item-group v-if="jobApplicants.length > 0">
                  <v-list-item v-for="applicant in jobApplicants" :key="applicant.id" class="pa-4 mb-4" :style="{ backgroundColor: '#f1f8e9', borderRadius: '20px' }">
                    <v-list-item-content rounded>
                      <v-list-item-title class="text-h6 font-weight-bold">{{ applicant.full_name }}</v-list-item-title>
                      <v-list-item-subtitle class="text-body2">{{ applicant.email }}</v-list-item-subtitle>
                      <strong>Applied:</strong> {{ applicant.relativeTime }}

                      <v-textarea
                        v-model="applicant.application_letter"
                        variant="outlined"
                        readonly
                        class="ma-8"
                        rounded
                      ></v-textarea>
                    </v-list-item-content>

                    <v-btn
                      @click="promptMessage(applicant.applicant_id)"
                      color="success"
                      :disabled="applicant.status === 'hired'"
                      class="ml-4"
                      rounded
                      elevation="2"
                    >
                      {{ applicant.status === 'hired' ? 'Hired' : 'Hire' }}
                    </v-btn>
                  </v-list-item>
                  <v-divider class="my-4"></v-divider>
                </v-list-item-group>

                <v-list-item v-else>
                  <v-list-item-content>
                    <v-chip color="grey lighten-3" text-color="black">No applicants for this job.</v-chip>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>

            <v-card-actions class="d-flex justify-end">
              <v-btn text @click="applicantDialog = false" class="text-body-2">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Employer Profile Popup -->
        <v-dialog v-model="showPopup" persistent max-width="500">
          <v-card>
            <v-card-title class="pa-8">Create Employer Profile</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitEmployerDetails" ref="form">
                <v-text-field
                  v-model="employerForm.company_name"
                  prepend-inner-icon="mdi-briefcase"
                  label="Company Name"
                  variant="outlined"
                  density="compact"
                  required
                  rounded
                ></v-text-field>
                <v-text-field
                  v-model="employerForm.company_social"
                  prepend-inner-icon="mdi-facebook"
                  label="Social Media"
                  variant="outlined"
                  density="compact"
                  required
                  rounded
                ></v-text-field>
                <v-text-field
                  v-model="employerForm.address"
                  prepend-inner-icon="mdi-earth"
                  label="Address"
                  variant="outlined"
                  density="compact"
                  required
                  rounded
                ></v-text-field>
                <v-select
                  v-model="employerForm.company_category"
                  prepend-inner-icon="mdi-shape-plus"
                  :items="categories"
                  label="Category"
                  variant="outlined"
                  required
                  rounded
                  density="compact"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="submitEmployerDetails">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Hiring Message Popup -->
        <v-dialog v-model="messagePopupCard" persistent max-width="500">
          <v-card>
            <v-card-title class="pa-8">Enter a Message for the Applicant</v-card-title>
            <v-card-text>
              <v-textarea
                v-model="messageInput"
                label="Message for Applicant"
                variant="outlined"
                rows="4"
                density="compact"
                required
                rounded
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="messagePopupCard = false">Cancel</v-btn>
              <v-btn @click="hireApplicantWithMessage">Send & Hire</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Snack Bar -->
        <v-snackbar
          v-model="snackBar.show"
          :color="snackBar.color"
          timeout="3000"
        >
          {{ snackBar.message }}
        </v-snackbar>
      </v-app>
    </template>
  </EmployerNavigationLayout>
</template>

<style scoped src="@/views/system/style/EmployerDashboardStyle.css"></style>
