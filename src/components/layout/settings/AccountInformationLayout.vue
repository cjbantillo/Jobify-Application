<script setup>
import { ref, onMounted } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import { getAvatarText } from '@/utils/helpers'
import 'vue-cal/dist/vuecal.css'

const authStore = useAuthUserStore()

const birthdateMenu = ref(false)
// supabase form action
const formAction = ref({
  ...formActionDefault,
})

const fetchUserData = async () => {
  try {
    const { data: currentUser, error: userError } =
      await supabase.auth.getUser()
    if (userError || !currentUser?.user?.id) {
      console.error(
        'Error fetching current user:',
        userError || 'No user logged in',
      )
      return
    }
  } catch (err) {
    console.error('Unexpected error fetching user data:', err)
  }
}
const saveChanges = async () => {
  try {
    const userData = authStore.userData

    // Update user data in Supabase
    const { data } = await supabase.auth.updateUser({
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone,
        date_of_birth: userData.date_of_birth,
        address: userData.address,
        bio: userData.bio,
      },
    })

    // Check for errors
    if (error) throw error

    alert('User data saved successfully!')
    if (data) {
      console.log(data) // user data
      formAction.value.formSuccessMessage = 'Save change'
    } else {
      formAction.value.formErrorMessage = 'Failed to save user data'
    }
  } catch (err) {
    console.error('Error saving user data:', err)
    alert('Failed to save user data. Please try again.')
  }
}

// Handle file change event and upload the new image
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check if the user already has an avatar
    if (authStore.userData.image_url) {
      const fileName = authStore.userData.image_url.split('/').pop();
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([`public/${fileName}`]);

      if (deleteError) {
        console.error('Error deleting existing file:', deleteError);
        alert('Failed to delete existing image. Please try again.');
        return;
      }
    }

    // Upload the new image
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`public/${file.name}`, file);

    if (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image. Please try again.');
      return;
    }

    // Get the public URL of the uploaded image
    const imageUrl = supabase.storage
      .from('avatars')
      .getPublicUrl(`public/${file.name}`).publicURL;

    // Update the user's profile with the new image URL
    authStore.userData.image_url = imageUrl;
    await saveChanges();
  }
};

onMounted(fetchUserData)
</script>

<template>
  <v-app class="d-flex fill-height">
    <v-main class="pt-8">
      <v-container>
        <!-- Account Information Card -->
        <v-form ref="refVForm" @submit.prevent="saveChanges">
          <v-card class="pa-6 hover-card" height="700px">
            <v-card-title class="title">Account Information</v-card-title>
            <div class="user-info flex">
              <!-- User Avatar -->
              <v-avatar
                v-if="authStore.userData.image_url"
                :image="authStore.userData.image_url"
                color="#4caf50"
                size="120"
                @click="$refs.fileInput.click()"
              ></v-avatar>
              <v-avatar
                v-else
                color="#4caf50"
                size="120"
                @click="$refs.fileInput.click()"
              >
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
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleFileChange"
              />

              <!-- User Details Section -->
              <div class="user-details ml-4">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="authStore.userData.first_name"
                      label="First Name"
                      prepend-inner-icon="mdi-account"
                      class="modern-input"
                      variant="outlined"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="authStore.userData.last_name"
                      label="Last Name"
                      prepend-inner-icon="mdi-account"
                      class="modern-input"
                      variant="outlined"
                      rounded
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="authStore.userData.email"
                      label="Email"
                      readonly
                      prepend-inner-icon="mdi-email"
                      class="modern-input"
                      variant="outlined"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="authStore.userData.phone"
                      label="Phone Number"
                      prepend-inner-icon="mdi-phone"
                      class="modern-input"
                      variant="outlined"
                      rounded
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-menu
                      v-model="birthdateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template #activator="{ props }">
                        <v-text-field
                          v-model="authStore.userData.date_of_birth"
                          label="Date of Birth"
                          prepend-inner-icon="mdi-calendar"
                          class="modern-input"
                          v-bind="props"
                          variant="outlined"
                          rounded
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="authStore.userData.date_of_birth"
                        @input="birthdateMenu = false"
                        :max="new Date().toISOString().substr(0, 10)"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col>
                    <v-text-field
                      v-model="authStore.userData.address"
                      :items="authStore.userData.address"
                      label="Address"
                      prepend-inner-icon="mdi-earth"
                      class="modern-input"
                      variant="outlined"
                      rounded
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </div>

            <!-- Bio Section -->
            <v-textarea
              v-model="authStore.userData.bio"
              label="Bio"
              rows="4"
              class="mt-6"
              variant="outlined"
            ></v-textarea>

            <v-btn
              class="save-button w-25 rounded-pill"
              depressed
              type="submit"
              :disabled="formAction.formProcess"
              :loading="formAction.formProcess"
            >
              Save Change
            </v-btn>
          </v-card>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped src="./AccountInformationStyle.css"></style>