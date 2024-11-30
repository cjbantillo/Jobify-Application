<script setup>
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
      password: newPassword.value,
    })

    if (error) throw error

    formAction.value.formSuccessMessage = 'Password changed successfully'
  } catch (err) {
    console.error('Error changing password:', err)
    formAction.value.formErrorMessage =
      'Failed to change password. Please try again.'
  } finally {
    formAction.value.formProcess = false
  }
}
</script>

<template>
  <v-container class="pa-4" style="margin-top: 30px">
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
        <v-alert type="success" v-if="formAction.formSuccessMessage">
          {{ formAction.formSuccessMessage }}
        </v-alert>
        <v-alert type="error" v-if="formAction.formErrorMessage">
          {{ formAction.formErrorMessage }}
        </v-alert>
      </v-form>
    </v-card>
  </v-container>

</template>
<style scoped src="./ChangePasswordStyle.css"></style>