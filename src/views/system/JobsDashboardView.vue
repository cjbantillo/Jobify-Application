<script setup>
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue'
import { useAuthUserStore } from '@/stores/authUser'

const authStore = useAuthUserStore()

const isStudent = authStore.userRole === 'Student'
</script>

<template>
  <JobNavigationLayout>
    <template #content>
      <v-app class="d-flex fill-height">
        <!-- Main Content Area -->
        <v-main class="pt-8">
          <v-container>
            <v-row>
              <v-col cols="12" md="6" xl="4" class="pb-6">
                <v-card class="pa-6 hover-card" height="250px">
                  <v-card-title class="title"
                    >We’re looking for Part-Time Dish Washer</v-card-title
                  >
                  <v-card-text>
                    <p class="budget">
                      <span class="icon material-icons">attach_money</span>Est.
                      Budget Php50/hr
                    </p>
                    <p class="location">
                      <span class="icon material-icons">location_on</span>Doe
                      Supplies • P-1 Ampayon, Butuan City
                    </p>
                    <div class="category-label">
                      <span class="icon material-icons"></span>Category:
                      Hospitality
                    </div>
                    <div class="job-type-duration">
                      Job Type: Part-Time | Duration: 6 months
                    </div>
                  </v-card-text>
                  <div class="button-container">
                    <v-btn class="apply-button mt-4">Apply</v-btn>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" xl="4" class="pb-6" v-if="isStudent">
                <v-card class="pa-6 hover-card" height="250px">
                  <v-card-title class="title"
                    >We’re looking for Full-Time Software
                    Developer</v-card-title
                  >
                  <v-card-text>
                    <p class="budget">
                      <span class="icon material-icons">attach_money</span>Est.
                      Budget Php100/hr
                    </p>
                    <p class="location">
                      <span class="icon material-icons">location_on</span>Doe
                      Tech • P-2 Libertad, Butuan City
                    </p>
                    <div class="category-label">
                      <span class="icon material-icons"></span>Category: IT
                    </div>
                    <div class="job-type-duration">
                      Job Type: Full-Time | Duration: Permanent
                    </div>
                  </v-card-text>
                  <div class="button-container">
                    <v-btn class="apply-button mt-4">Apply</v-btn>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" xl="4" class="pb-6">
                <v-card class="pa-6 hover-card" height="250px">
                  <v-card-title class="title"
                    >We’re looking for Marketing Specialist</v-card-title
                  >
                  <v-card-text>
                    <p class="budget">
                      <span class="icon material-icons">attach_money</span>Est.
                      Budget Php75/hr
                    </p>
                    <p class="location">
                      <span class="icon material-icons">location_on</span>Doe
                      Marketing • P-3 Bancasi, Butuan City
                    </p>
                    <div class="category-label">
                      <span class="icon material-icons"></span>Category:
                      Marketing
                    </div>
                    <div class="job-type-duration">
                      Job Type: Part-Time | Duration: 3 months
                    </div>
                  </v-card-text>
                  <div class="button-container">
                    <v-btn class="apply-button mt-4">Apply</v-btn>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" xl="4" class="pb-6">
                <v-card class="pa-6 hover-card" height="250px">
                  <v-card-title class="title"
                    >We’re looking for Graphic Designer</v-card-title
                  >
                  <v-card-text>
                    <p class="budget">
                      <span class="icon material-icons">attach_money</span>Est.
                      Budget Php80/hr
                    </p>
                    <p class="location">
                      <span class="icon material-icons">location_on</span>Doe
                      Creative • P-4 Tandang Sora, Butuan City
                    </p>
                    <div class="category-label">
                      <span class="icon material-icons"></span>Category: Design
                    </div>
                    <div class="job-type-duration">
                      Job Type: Freelance | Duration: 1 month
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
