<script setup>
import EmployerNavigationLayout from '@/components/layout/navigation/EmployerNavigationLayout.vue';
import { reactive, onMounted } from 'vue';
import { supabase } from '@/utils/supabase';

const employerInfo = reactive({});

const fetchUserInfo = async () => {
  try {
    // Get the current logged-in user
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user?.user) {
      console.error('Error fetching user or user not authenticated:', error);
      return;
    }

    // Fetch the employer profile
    const { data } = await supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', user.user.id)
      .single();

    Object.assign(employerInfo, data); // Mutating the content of the const
  } catch (err) {
    console.error('Unexpected error while fetching user information:', err);
  }
};


onMounted(async () => {
  await fetchUserInfo();
});
</script>
<template>
  <EmployerNavigationLayout>
    <v-container>
      <v-row justify="center" class="mt-5">
        <v-col cols="12" md="8" lg="6">
          <v-card color="#4CAF50" dark elevation="3">
            <v-card-title>
              <span class="text-h5">Employer Profile</span>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">Company Name</v-list-item-title>
                    <v-list-item-subtitle>{{ employerInfo?.company_name || 'Not available' }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">Company Socials</v-list-item-title>
                    <v-list-item-subtitle>{{ employerInfo?.company_social || 'Not available' }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">Contact Category</v-list-item-title>
                    <v-list-item-subtitle>{{ employerInfo?.company_category || 'Not available' }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>


              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </EmployerNavigationLayout>
</template>

<style scoped>
.text-h5 {
  font-weight: bold;
  margin-bottom: 8px;
}
.text-h6 {
  font-weight: bold;
  color: #e8f5e9;
}
.v-card {
  border-radius: 12px;
}
</style>
