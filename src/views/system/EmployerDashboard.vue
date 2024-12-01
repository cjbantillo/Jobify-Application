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
    const filteredUsers = allUsers.users.filter(user => user.user_metadata.is_employer);
    users.value = filteredUsers;
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
        <v-main class="pt-8">
          <v-container>

          <div v-if="loading">Loading users...</div>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

            <div v-if="!loading && !errorMessage">
              <h2>Employer Users</h2>
              <v-list>
                <v-list-item-group v-for="(user, index) in users" :key="index">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.user_metadata.first_name }} {{ user.user_metadata.last_name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
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
    </template>
  </EmployerNavigationLayout>
</template>

<style scoped>
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
</style>
