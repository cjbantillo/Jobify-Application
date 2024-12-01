<script setup>
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue';
import { ref, onMounted } from 'vue';
import { supabase } from '@/utils/supabase';

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

const users = ref([]);

const fetchUsersExcludingEmployers = async () => {
  try {
    // Fetch all users from auth.users
    const { data: allUsers, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError || !allUsers?.users) {
      console.error('Error fetching users:', usersError);
      return;
    }

    // Fetch all employer user IDs
    const { data: employerProfiles, error: employersError } = await supabase
      .from('employer_profiles')
      .select('user_id');

    if (employersError) {
      console.error('Error fetching employer profiles:', employersError);
      return;
    }

    const employerIds = employerProfiles.map((profile) => profile.user_id);

    // Filter out employer users
    users.value = allUsers.users.filter((user) => !employerIds.includes(user.id));
  } catch (err) {
    console.error('Unexpected error fetching users:', err);
  }
};

// Fetch user info on component mount
onMounted(fetchUserInfo);
onMounted(fetchUsersExcludingEmployers);
</script>

<template>
  <JobNavigationLayout>
    <template #content>
      <!-- Display User Info -->
      <v-container>
        <h2>Users (Excluding Employers)</h2>
        <v-card
          v-for="user in users"
          :key="user.id"
          class="mb-4"
        >
          <v-card-title>
            {{ user.email }}
          </v-card-title>
          <v-card-subtitle>
            {{ user.id }}
          </v-card-subtitle>
          <v-card-text>
            <p><strong>Created at:</strong> {{ user.created_at }}</p>
            <p><strong>Last sign-in:</strong> {{ user.last_sign_in_at }}</p>
          </v-card-text>
        </v-card>
      </v-container>

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
  </JobNavigationLayout>
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
