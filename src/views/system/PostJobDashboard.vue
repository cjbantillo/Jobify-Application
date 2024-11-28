<script setup>
import PostJobNavigationLayout from '@/components/layout/navigation/PostJobNavigationLayout.vue';
import { ref } from 'vue'

const newJobPost = ref({
  title: '',
  salary: '',
  company: '',
  category: '',
  type: '',
  duration: ''
})

const addJobPost = () => {
  console.log('Job Posted:', newJobPost.value)
  // Add code to save the job post
  newJobPost.value = { title: '', salary: '', company: '', category: '', type: '', duration: '' }
}
</script>

<template>
  <PostJobNavigationLayout>
    <template #content>
      <v-app class="d-flex fill-height">
        <!-- Main Content Area -->
        <v-main class="pt-8">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card class="pa-2 hover-card" height="auto">
                  <v-card-title class="title">
                    Post a Job
                  </v-card-title>
                  <v-card-text>
                    <v-form @submit.prevent="addJobPost">
                      <v-text-field v-model="newJobPost.title" label="Job Title" required></v-text-field>
                      <v-text-field v-model="newJobPost.salary" label="Salary" required></v-text-field>
                      <v-text-field v-model="newJobPost.company" label="Company Name" required></v-text-field>
                      <v-text-field v-model="newJobPost.category" label="Job Category" required></v-text-field>
                      <v-text-field v-model="newJobPost.type" label="Job Type" required></v-text-field>
                      <v-text-field v-model="newJobPost.duration" label="Job Duration" required></v-text-field>
                      <div class="button-container">
                        <v-btn type="submit" class="apply-button mt-4">Add</v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </template>
  </PostJobNavigationLayout>
</template>

<style scoped>
.v-list-item:hover {
  background-color: #4caf50;
  color: white;
}

.hover-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;
  background-color: #fafbfa;
}

.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25); /* More pronounced shadow on hover */
}

.title {
  font-size: 1rem; /* Smaller font for the title */
  font-weight: bold;
}

.budget,
.location {
  color: #666; /* Subtle color for text */
}

.button-container {
  margin-top: 10px; /* Less margin */
}

.category-label {
  color: #fff;
  background-color: #375838;
  padding: 2px 4px; /* Smaller padding */
  border-radius: 4px;
  display: inline-block;
  margin-top: 5px; /* Less margin */
}

.job-type-duration {
  margin-top: 5px; /* Less margin */
  color: #777;
}

.apply-button {
  background-color: green;
  color: white;
  padding: 6px 10px; /* Smaller padding for better appearance */
  font-weight: bold;
  margin-right: 4px; /* Less margin */
}

.apply-button:hover {
  background-color: #45a049; /* Darker green for hover effect */
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px 4px; /* Smaller padding */
  border-radius: 4px;
  color: white;
  font-weight: bold;
}

.icon {
  vertical-align: middle;
  margin-right: 2px; /* Less margin */
}
</style>
