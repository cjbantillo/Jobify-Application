<script setup>
import { ref } from 'vue'
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue'
import profilePicture from '@/assets/hero.png'

// Editing state
const isEditing = ref(false)

// User information state
const userInfo = ref({
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@example.com',
})

// Edit and Save functions
const edit = () => {
  isEditing.value = true
}

const save = () => {
  isEditing.value = false
}

// Placeholder functions for buttons
const openPrivacySettings = () => {
  console.log('Opening privacy settings')
}

const openPaymentMethods = () => {
  console.log('Opening payment methods')
}

const changePassword = () => {
  console.log('Changing password')
}

const goToSettings = () => { router.push('/settings') }
</script>

<template>
    <JobNavigationLayout>
      <template #content>
        <v-app class="d-flex fill-height">
          <v-main class="pt-8">
            <v-container>
              <v-row justify="center">
                <v-col cols="12" md="8" xl="6" class="pb-6">
                  <v-card class="pa-6 hover-card" height="auto">
                    <v-card-title class="title">Settings</v-card-title>
                    <v-card-text>
                      <!-- Profile Settings -->
                      <div class="settings">
                        <h2>Profile Settings</h2>
                        <div class="user-info">
                          <img :src="profilePicture" alt="Profile Picture" class="profile-pic" />
                          <div class="info">
                            <v-text-field
                              v-if="isEditing"
                              v-model="userInfo.firstname"
                              label="First Name"
                              outlined
                              dense
                            ></v-text-field>
                            <span v-else>{{ userInfo.firstname }}</span>
  
                            <v-text-field
                              v-if="isEditing"
                              v-model="userInfo.lastname"
                              label="Last Name"
                              outlined
                              dense
                            ></v-text-field>
                            <span v-else>{{ userInfo.lastname }}</span>
  
                            <v-text-field
                              v-if="isEditing"
                              v-model="userInfo.email"
                              label="Email"
                              outlined
                              dense
                            ></v-text-field>
                            <span v-else>{{ userInfo.email }}</span>
                          </div>
                          <div class="actions">
                            <v-btn v-if="!isEditing" @click="edit" color="primary" outlined>Edit</v-btn>
                            <v-btn v-if="isEditing" @click="save" color="primary">Save</v-btn>
                          </div>
                        </div>
  
                        <!-- Other Settings -->
                        <h2 class="mt-4">Other Settings</h2>
                        <div class="settings-options">
                            <v-btn
                            color="primary"
                            @click="changePassword"
                            outlined
                          >Change Password</v-btn>
                          <v-btn
                            color="primary"
                            @click="openPrivacySettings"
                            outlined
                          >Privacy and Security Settings</v-btn>
                          <v-btn
                            color="primary"
                            @click="openPaymentMethods"
                            outlined
                          >Payment Methods</v-btn>
                        </div>
  
                        <!-- User Preferences -->
                        <h2 class="mt-4">User Preferences</h2>
                        <div class="user-preferences">
                          <v-switch
                            label="Enable Notifications"
                          ></v-switch>
                        </div>
                      </div>
                    </v-card-text>
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
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .hover-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1rem;
    object-fit: cover;
  }
  
  .info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .settings-options, .user-preferences {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .settings-options h2, .user-preferences h2 {
    margin-bottom: 1rem;
  }
  
  /* Button color */
  .v-btn {
    background-color: #4caf50 !important; /* Apply the new button color */
    color: white !important;
  }
  
  .v-btn:hover {
    background-color: #45a049 !important; /* Slightly darker green on hover */
    box-shadow: 0px 6px 12px rgba(76, 175, 80, 0.3) !important;
  }
  </style>
  

  