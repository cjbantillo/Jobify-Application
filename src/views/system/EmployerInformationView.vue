<script setup>
import EmployerNavigationLayout from '@/components/layout/navigation/EmployerNavigationLayout.vue';
import { ref, onMounted } from 'vue';
import { supabase } from '@/utils/supabase';

const companyName = ref('');
const companySocial = ref('');
const companyCategory = ref('');
const companyAddress = ref('');

const fetchUserData = async () => {
  try {
    const { data: currentUser, error: userError } = await supabase.auth.getUser();
    if (userError || !currentUser?.user?.id) {
      console.error('Error fetching current user:', userError || 'No user logged in');
      return;
    }

    const { data: employerProfile, error: employerError } = await supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', currentUser.user.id)
      .single();

    if (employerError) {
      console.error('Error fetching employer profile:', employerError);
      return;
    }

    if (employerProfile) {
      companyName.value = employerProfile.company_name;
      companySocial.value = employerProfile.company_social;
      companyCategory.value = employerProfile.company_category;
      companyAddress.value = employerProfile.address;
    }
  } catch (err) {
    console.error('Unexpected error fetching user data:', err);
  }
};

onMounted(async () => {
  await fetchUserData();
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
            <v-card outlined class="py-8 cont" height="fill">
              <div v-if="!loading && !errorMessage">
                <v-card-title class="title text-h5 ma-5">Business Information</v-card-title>
                <v-row>
                  <v-col class="ma-auto" cols="10">
                    <div cols="10">
                      <v-row>
                          <v-col cols="5" class="ma-auto">
                            <v-text-field
                              v-model="companyName"
                              label="Company Name"
                              prepend-inner-icon="mdi-briefcase"
                              class="modern-input"
                              variant="outlined"
                              rounded
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="5" class="ma-auto">
                            <v-text-field
                              v-model="companySocial"
                              label="Company Social"
                              prepend-inner-icon="mdi-facebook"
                              class="modern-input"
                              variant="outlined"
                              rounded
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="5" class="ma-auto">
                            <v-text-field
                              v-model="companyCategory"
                              label="Company Category"
                              prepend-inner-icon="mdi-earth"
                              class="modern-input"
                              variant="outlined"
                              rounded
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </div>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-container>
        </v-main>
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
.v-card{
  border-radius: 20px;
}
.v-card .v-card-title{
  font-size: larger;
  font-weight: 700;
  color:#4caf50;
}
.v-card-title {
  margin-bottom: 0.5rem;
}

.v-card-subtitle {
  margin-bottom: 1rem;
}

.v-btn {
  background-color: #4caf50 !important;
  color: #fff;
  text-transform: none;
}
</style>
