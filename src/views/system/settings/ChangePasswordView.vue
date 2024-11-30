<script setup>
import JobNavigationLAyout from '@/components/layout/navigation/JobNavigationLAyout.vue'
import { ref } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { supabase, formActionDefault } from '@/utils/supabase.js'

const authStore = useAuthUserStore()

// supabase form action
const formAction = ref({
  ...formActionDefault,
})

// Password change form fields
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPasswordCurrent = ref(false)
const showPasswordNew = ref(false)
const showPasswordConfirm = ref(false)

// Change password function
const changePassword = async () => {
  formAction.value.formProcess = true
  formAction.value.formSuccessMessage = ''
  formAction.value.formErrorMessage = ''

  if (newPassword.value !== confirmPassword.value) {
    formAction.value.formErrorMessage = 'New passwords do not match.'
    formAction.value.formProcess = false
    return
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword.value
    })

    if (error) throw error

    formAction.value.formSuccessMessage = 'Password changed successfully'
  } catch (err) {
    console.error('Error changing password:', err)
    formAction.value.formErrorMessage = 'Failed to change password. Please try again.'
  } finally {
    formAction.value.formProcess = false
  }
}
</script>

<template>
  <JobNavigationLAyout>
    <template #content>
      <v-container class="pa-4" style="margin-top: 30px;">
        <v-card class="pa-6 hover-card" max-width="990px" max-height="700">
          <v-card-title class="title">Change Password</v-card-title>
          <v-form ref="changePasswordForm" @submit.prevent="changePassword">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="currentPassword"
                  label="Current Password"
                  :type="showPasswordCurrent ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="showPasswordCurrent ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPasswordCurrent = !showPasswordCurrent"
                  class="modern-input"
                  variant="outlined"
                  rounded
                  autocomplete="off"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newPassword"
                  label="New Password"
                  :type="showPasswordNew ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="showPasswordNew ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPasswordNew = !showPasswordNew"
                  class="modern-input"
                  variant="outlined"
                  rounded
                  autocomplete="off"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm New Password"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPasswordConfirm = !showPasswordConfirm"
                  class="modern-input"
                  variant="outlined"
                  rounded
                  autocomplete="off"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="save-button full-width-button rounded-pill"
                  depressed
                  type="submit"
                  :disabled="formAction.formProcess"
                  :loading="formAction.formProcess"
                >
                  Change Password
                </v-btn>
              </v-col>
            </v-row>
            <v-alert
              type="success"
              v-if="formAction.formSuccessMessage"
            >
              {{ formAction.formSuccessMessage }}
            </v-alert>
            <v-alert
              type="error"
              v-if="formAction.formErrorMessage"
            >
              {{ formAction.formErrorMessage }}
            </v-alert>
          </v-form>
        </v-card>
      </v-container>
    </template>
  </JobNavigationLAyout>
</template>

<style scoped>
/* General Styles */
.account-info {
  font-family: Arial, sans-serif;
}
.input-field {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
}
.input-field:disabled {
  background-color: #f9f9f9;
  cursor: not-allowed;
}
/* Additional Styles */
.v-list-item:hover {
  background-color: #4caf50;
  color: white;
}
.save-button {
  background-color: #4caf50;
  color: #ffffff;
  font-weight: 100;
  font-size: 0.5rem;
  box-shadow: 0px 4px 10px rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
}
.save-button:hover {
  background-color: #45a049;
  box-shadow: 0px 6px 12px rgba(76, 175, 80, 0.3);
}

/* General avatar styling */
.v-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 16px;
}

/* Avatar fallback text style */
.v-avatar span {
  font-size: 60px;
  font-weight: bold;
  color: white;
}

/* Layout for the user info section */
.user-info {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.user-details {
  margin-left: 20px;
  width: 100%;
}

.title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
}

.hover-card {
  transition: transform 0.2s, box-shadow 0.3s;
  background-color: #fafbfa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modern-input .v-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2c3e50;
  background-color: #fafbfa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modern-input .v-input__control {
  font-size: 1rem;
  font-weight: 400;
  color: #2c3e50;
}

.modern-input .v-input__icon--prepend,
.modern-input .v-input__icon--append {
  color: #2c3e50;
  opacity: 0.8;
}

.modern-input .v-field__input {
  padding-top: 1rem;
}

.modern-input .v-input--is-dirty .v-label {
  color: #2c3e50;
}

.modern-input {
  background: #fafbfa;
}

.modern-input .v-input__icon--append {
  margin-right: 8px; /* Adjust the margin as needed */
  visibility: visible !important; /* Ensure visibility */
}

/* Make the button full width */
.full-width-button {
  width: 100%;
}

.save-button {
  background-color: #4caf50; /* Primary green color */
  color: #ffffff;
  font-weight: 100;
  font-size: 0.9rem;
  box-shadow: 0px 4px 10px rgba(76, 175, 80, 0.2); /* Soft shadow */
  transition: all 0.3s ease;
}
.save-button:hover {
  background-color: #45a049; /* Darker green on hover */
  box-shadow: 0px 6px 12px rgba(76, 175, 80, 0.3); /* More pronounced shadow on hover */
}
.v-menu__content {
  border-radius: 8px;
  background-color: #fafbfa;
}

.v-date-picker {
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
