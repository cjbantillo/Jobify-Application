<script setup>
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue'
import { ref, onMounted } from 'vue';
import { supabase } from '@/utils/supabase'

const jobListings = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchJobListings = async () => {
  loading.value = true;
  const { data, error: fetchError } = await supabase
    .from('job_listings')
    .select('*');

  if (fetchError) {
    error.value = fetchError.message;
  } else {
    jobListings.value = data;
  }
  loading.value = false;
};

onMounted(fetchJobListings);
</script>

<template>
  <JobNavigationLayout>
    <template #content>
      <v-app class="d-flex fill-height">
        <!-- Main Content Area -->
        <v-main class="pt-8">
          <v-container>
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
                  <v-card-title class="title">{{ job.job_title }}</v-card-title>
                  <v-card-text>
                    <p class="budget">
                      <span class="icon material-icons">attach_money</span>Est. Budget
                      {{ job.salary_range }} / hr
                    </p>
                    <p class="location">
                      <span class="icon material-icons">location_on</span>{{ job.location }}
                    </p>
                    <div class="category-label">
                      Category: {{ job.category }}
                    </div>
                    <div class="job-type-duration">
                      Job Type: {{ job.job_type }} | Duration: {{ job.duration }}
                    </div>
                  </v-card-text>
                  <div class="button-container">
                    <v-btn class="apply-button mt-4">Apply</v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>

          </v-container>
        </v-main>
      </v-app>
    </template>
  </JobNavigationLayout>
</template>

<style scoped>
.v-list-item:hover {
  background-color: #4caf50;
  color: white;
}

.hover-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  position: relative;
  background-color: #fafbfa;
}

.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25); /* More pronounced shadow on hover */
}

.title {
  font-size: 1.25rem; /* Larger font for the title */
  font-weight: bold;
}

.budget,
.location {
  color: #666; /* Subtle color for text */
}

.button-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin-left: 18px;
}

.category-label {
  color: #fff;
  background-color: #375838;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 10px;
}

.job-type-duration {
  margin-top: 10px;
  color: #777;
}

.apply-button {
  background-color: green;
  color: white;
  padding: 10px 15px; /* Add padding for better button appearance */
  font-weight: bold;
  margin-right: 8px;
}

.apply-button:hover {
  background-color: #45a049; /* Darker green for hover effect */
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
}
.icon {
  vertical-align: middle;
  margin-right: 5px;
}
</style>
