<script setup>
import { ref, onMounted } from 'vue';
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue';
import { supabase } from '@/utils/supabase.js';
import { useAuthUserStore } from '@/stores/authUser';
import { getAvatarText } from '@/utils/helpers';

// Editing state
const isEditing = ref(false);
const authStore = useAuthUserStore();


// User information state
const user = ref({
  name: '',
  avatar_url: 'https://via.placeholder.com/150' // Default avatar
});

// Fetch user data on component mount
const fetchUserData = async () => {
  try {
    const { data: currentUser, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Error fetching current user:', userError);
      return;
    }

    const { data, error } = await supabase
      .from('users') // Adjust table name to match your Supabase schema
      .select('first_name, last_name, avatar_url') // Fetch first_name, last_name, and avatar_url
      .eq('id', currentUser.user.id) // Use the logged-in user's ID
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
      return;
    }

    // Update `user` with the fetched data
    user.value = {
      name: data.first_name + ' ' + data.last_name,  // Concatenate first and last name
      avatar_url: data.avatar_url || 'https://via.placeholder.com/150', // Fallback avatar
    };

  } catch (err) {
    console.error('Unexpected error fetching user data:', err);
  }
};

// Fetch user data when the component is mounted
onMounted(() => {
  fetchUserData();
});

// Edit and Save functions
const edit = () => {
  isEditing.value = true;
};

const save = () => {
  isEditing.value = false;
};

// Placeholder functions for buttons
const openPrivacySettings = () => {
  console.log('Opening privacy settings');
};

const openPaymentMethods = () => {
  console.log('Opening payment methods');
};

const changePassword = () => {
  console.log('Changing password');
};
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
                      <h2>Profile Settings</h2>
                      <div class="user-info">
                        <!-- Display Avatar -->
                        <v-list-item
                          :title="
                            authStore.userData.first_name + ' ' + authStore.userData.last_name
                          "
                          nav
                          class="name size-5"
                        >
                          <!-- Prepend Avatar -->
                          <template v-slot:prepend>
                            <v-avatar
                              v-if="authStore.userData.image_url"
                              :image="authStore.userData.image_url"
                              color="orange-darken-3"
                              class="user-avatar"
                            ></v-avatar>

                            <v-avatar v-else color="orange-darken-3">
                              <span>
                                {{
                                  getAvatarText(
                                    authStore.userData.first_name +
                                      ' ' +
                                      authStore.userData.last_name,
                                  )
                                }}
                              </span>
                            </v-avatar>
                          </template>
                        </v-list-item>

                      <div class="actions">
                        <v-btn v-if="!isEditing" @click="edit" color="primary" outlined>Edit</v-btn>
                        <v-btn v-if="isEditing" @click="save" color="primary">Save</v-btn>
                      </div>
                    </div>

                    <!-- Other Settings -->
                    <h2 class="mt-4">Other Settings</h2>
                    <div class="settings-options">
                      <v-btn color="primary" @click="changePassword" outlined>Change Password</v-btn>
                      <v-btn color="primary" @click="openPrivacySettings" outlined>Privacy and Security Settings</v-btn>
                      <v-btn color="primary" @click="openPaymentMethods" outlined>Payment Methods</v-btn>
                    </div>

                    <!-- User Preferences -->
                    <h2 class="mt-4">User Preferences</h2>
                    <div class="user-preferences">
                      <v-switch label="Enable Notifications"></v-switch>
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
  .user-avatar {
  width: 120px;  /* Increase avatar size */
  height: 120px; /* Increase avatar size */
  font-size: 5rem; /* Adjust the size of the text in the avatar */
  }

  .name {
    font-size: 0.75rem;  /* Increase font size of the name */
    font-weight: bold;
    margin-top: 10px;
  }
  </style>


