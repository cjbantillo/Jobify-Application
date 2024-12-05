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
  "Pharmacies",
  "Hardware and Construction Supplies",
  "Clothing and Apparel",
  "Electronics and Gadgets",
  "Auto Parts and Accessories",
  "Wholesale and Trading Businesses",
  "Food and Beverage",
  "Restaurants",
  "Cafés and Coffee Shops",
  "Fast Food Chains",
  "Food Stalls and Kiosks",
  "Catering Services",
  "Bakeries and Pastry Shops",
  "Bars and Pubs",
  "Health and Wellness",
  "Clinics and Medical Services",
  "Fitness Centers and Gyms",
  "Spas and Wellness Centers",
  "Optical Shops",
  "Dental Clinics",
  "Professional Services",
  "Accounting and Bookkeeping",
  "Legal Services",
  "Marketing and Advertising",
  "IT and Web Development",
  "Real Estate Agencies",
  "Human Resource and Recruitment",
  "Travel and Tour Agencies",
  "Home and Construction",
  "Interior Design Services",
  "Construction Firms",
  "Appliance Repair Services",
  "Furniture Stores",
  "Landscaping Services",
  "Education and Training",
  "Tutorial Centers",
  "Daycares and Preschools",
  "Vocational and Technical Schools",
  "Language Learning Centers",
  "Review Centers",
  "Transportation and Logistics",
  "Public Transportation Operators",
  "Taxi and Ride-hailing Services",
  "Delivery and Courier Services",
  "Freight and Logistics Companies",
  "Vehicle Rentals",
  "Entertainment and Leisure",
  "Event Planning Services",
  "Party Supplies Rentals",
  "Photography and Videography",
  "Resorts and Hotels",
  "Game Zones and Arcades",
  "Agriculture and Farming",
  "Poultry and Livestock",
  "Agricultural Supply Stores",
  "Rice Milling and Grains Trading",
  "Fresh Produce Markets",
  "Technology and Communications",
  "Internet Service Providers",
  "Gadget Repair Shops",
  "Computer Shops",
  "Printing and Photocopying Services",
  "Financial Services",
  "Banks and Lending Institutions",
  "Pawnshops",
  "Money Remittance Services",
  "Insurance Agencies",
  "Investment and Trading Services",
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

    await fetchUserInfo();
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

//function to fetch users
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

    //filter users who are not employers
    const filteredUsers = allUsers.users.filter(user => !user.user_metadata.is_employer);
    users.value = filteredUsers;

  } catch (err) {
    console.error('Unexpected error fetching users:', err);
    errorMessage.value = 'An unexpected error occurred while fetching users.';
  } finally {
    loading.value = false;
  }
};

const hireUser = async (user) => {
  try {
    const hireDetails = {
      employer_id: userInfo.value.id, // Assuming the current employer's ID is stored in `userInfo`
      user_id: user.id, // The user to be hired
      hired_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('hires') // Replace with the actual table name
      .insert([hireDetails]);

    if (error) {
      console.error('Error hiring user:', error);
      alert('Failed to hire user. Please try again.');
    } else {
      alert(`${user.user_metadata.first_name} ${user.user_metadata.last_name} has been successfully hired.`);
    }
  } catch (err) {
    console.error('Unexpected error during hiring:', err);
    alert('An unexpected error occurred.');
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
            <div v-if="loading">Loading...</div>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <v-card outlined class="pa-8 cont" height="fill">
              <div v-if="!loading && !errorMessage">
                <v-card-title class="title text-h5 mb-6">Dashboard</v-card-title>
                <v-row>
                  <v-col
                    v-for="(user, index) in users"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="5"
                    lg="4"

                  >
                    <!-- Updated user card -->
                    <v-card class="user-card" outlined>
                      <v-card-title class="text-h6">{{ user.user_metadata.first_name }} {{ user.user_metadata.last_name }}</v-card-title>
                      <v-card-subtitle class="text-body-2 mb-4">{{ user.email || "Email Unavailable" }}</v-card-subtitle>
                      <v-card-subtitle class="text-body-2 mb-4">{{ user.bio || "Bio Unavailable" }}</v-card-subtitle>
                      <v-card-actions>
                        <v-btn rounded @click="hireUser(user)">Hire</v-btn>
                      </v-card-actions>
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

      </v-app>
    </template>
  </EmployerNavigationLayout>
</template>

<style scoped src="@/views/system/style/EmployerDashboardStyle.css"></style>
