<script setup>
import EmployerNavigationLayout from '@/components/layout/navigation/EmployerNavigationLayout.vue';
import { ref, onMounted } from 'vue';
import { supabase, supabaseAdmin } from '@/utils/supabase';

const showPopup = ref(false);
const userInfo = ref(null); // Store user information
const employerForm = ref({
  company_name: '',
  company_social: '',
  company_category: '',
});

const categories = ref([
  "Retail and Wholesale",
  "Supermarkets and Grocery Stores",
  "Convenience Stores",
  // ... other categories
]);

const fetchUserInfo = async () => {
  try {
    // Get the current logged-in user
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user?.user) {
      console.error('Error fetching user or user not authenticated:', error);
      return;
    }

    // Fetch the employer profile
    const { data: profile, error: profileError } = await supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', user.user.id)
      .single();

    if (profileError || !profile) {
      console.log('No profile found or an error occurred:', profileError);
      showPopup.value = true; // Show popup if no profile exists or error occurs
    } else {
      showPopup.value = false; // Do not show popup if profile exists
    }

    // Fetch and store user details
    userInfo.value = { ...user.user }; // Store user info
    delete userInfo.value.is_employers; // Remove the `is_employers` field
  } catch (err) {
    console.error('Unexpected error while fetching user information:', err);
  }
};

const submitEmployerDetails = async () => {
  try {
    const { data: currentUser, error } = await supabase.auth.getUser();

    if (error || !currentUser || !currentUser.user) {
      console.error('Error fetching user:', error);
      return;
    }

    const employerDetails = {
      user_id: currentUser.user.id,
      ...employerForm.value, // Spread form values
      created_at: new Date().toISOString(),
    };

    const { error: insertError } = await supabase
      .from('employer_profiles')
      .insert([employerDetails]);

    if (insertError) {
      console.error('Error inserting employer details:', insertError);
    } else {
      console.log('Employer details submitted successfully.');
      showPopup.value = false; // Close popup after success
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

// Users data and error handling
const users = ref([]);
const loading = ref(true);
const errorMessage = ref('');
const resumes = ref([]);

// Function to fetch users
const fetchAllUsers = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const { data: allUsers, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    if (usersError || !allUsers?.users) {
      console.error('Error fetching users:', usersError);
      errorMessage.value = 'Failed to load users';
      return;
    }

    // Filter users where 'is_employer' is true
    const filteredUsers = allUsers.users.filter(user => !user.user_metadata.is_employer);
    const user_name = allUsers.users.map(user => `${user.user_metadata.first_name} ${user.user_metadata.last_name}`);
    users.value = filteredUsers;

    // Fetch signed URLs for resumes
    const resumePromises = filteredUsers.map(async (user) => {
      const user_id = user.id; // Assuming `user_id` is stored in `user_metadata`
      try {
        const { data: signedURL, error: urlError } = await supabase.storage
          .from('resumes')
          .createSignedUrl(`${ user_name }.pdf`); // 1-hour expiry

        if (urlError) {
          console.error(`Error generating signed URL for user ${user_id}:`, urlError.message);
          return { user_id, resumeLink: null, error: urlError.message };
        }

        return { user_id, resumeLink: signedURL.signedUrl, error: null }; // Success
      } catch (err) {
        console.error(`Unexpected error generating URL for user ${user_id}:`, err.message);
        return { user_id, resumeLink: null, error: err.message };
      }
    });

    // Resolve all promises
    const fetchedResumes = await Promise.all(resumePromises);

    // Store resume links or handle further
    resumes.value = fetchedResumes.filter(({ resumeLink }) => resumeLink); // Store only successful fetches


  } catch (err) {
    console.error('Unexpected error fetching users:', err);
    errorMessage.value = 'An unexpected error occurred while fetching users';
  } finally {
    loading.value = false;
  }
};


// Fetch user info on component mount
onMounted(async () => {
  await fetchUserInfo();
  await fetchAllUsers();
});
</script>

<template>
  <EmployerNavigationLayout>
    <template #content>
      <v-app class="d-flex fill-height">
        <v-main class="pt-8">
          <v-container>
            <div v-if="loading">Loading users...</div>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <v-card outlined class="py-8 cont" height="fill">
              <div v-if="!loading && !errorMessage">
                <v-card-title class="title text-h5 mb-6">Dashboard</v-card-title>
                <v-row>
                  <v-col v-for="(user, index) in users" :key="index" cols="10" class="ma-auto my-5 p-5">
                    <v-card outlined class="user-card">
                      <v-card-title class="text-h6">{{ user.user_metadata.first_name }} {{ user.user_metadata.last_name }}</v-card-title>
                      <v-card-subtitle class="text-body-2 mb-4">{{ user.id }}</v-card-subtitle>
                      <v-card-text>
                        <div v-for="resume in resumes" :key="resume.user_id">
                          <a :href="resume.resumeLink" target="_blank">View Resume for User {{ resume.user_id }}</a>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-container>
        </v-main>


      <!-- Employer Profile Creation Popup -->
      <v-dialog v-model="showPopup" persistent max-width="500">
        <v-card>
          <v-card-title class="pa-8">Create Employer Profile</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitEmployerDetails" ref="form">
              <v-text-field
                v-model="employerForm.company_name"
                label="Company Name"
                variant="outlined"
                density="compact"
                required
                rounded
              ></v-text-field>
              <v-text-field
                v-model="employerForm.company_social"
                label="Social Media"
                variant="outlined"
                density="compact"
                required
                rounded
              ></v-text-field>
              <v-select
                v-model="employerForm.company_category"
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
            <v-btn color="green" text @click="submitEmployerDetails">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
    </template>
  </EmployerNavigationLayout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Matemasie&family=Varela+Round&display=swap');

*{
  font-family: 'Varela Round', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.cont{
  border-radius: 4%;
}
.title{
  margin-left: 0.5rem;
  font-weight: 700;
  font-size: larger;
  color: #4caf50;
}
.popup-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.popup-card h2 {
  margin-bottom: 20px;
}

.popup-card input {
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.apply-button {
  width: 100%;
}

.user-card {
  border: 1px solid black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.user-card:hover{
  -webkit-box-shadow: 0px 0px 20px -1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 20px -1px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 20px -1px rgba(0,0,0,0.75);
}

/* Font hierarchy and color palette */
.text-primary {
  color: #4caf50;
  font-weight: bold;
}

.text-secondary {
  color: rgba(76, 175, 80, 0.7);
}

.text-h6 {
  font-size: 1.25rem;
}

.text-body-2 {
  font-size: 1rem;
}

/* Padding adjustments */
.v-card-title {
  margin-bottom: 0.5rem;
}

.v-card-subtitle {
  margin-bottom: 1rem;
}
</style>
