<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { emailValidator, requiredValidator } from '@/utils/validator'

const formDataDefault = {
  email: '',
  password: '',
}
const formData = ref({ ...formDataDefault })
const formAction = ref({
  formProcess: false,
  formErrorMessage: '',
  formSuccessMessage: '',
})
const refVForm = ref(null)
const visible = ref(false)

const router = useRouter()

// Toggle password visibility
const toggleVisible = () => {
  visible.value = !visible.value
}

const onSubmit = async () => {
  formAction.value.formErrorMessage = ''
  formAction.value.formSuccessMessage = ''
  formAction.value.formProcess = true

  try {
    // Authenticate user with Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    })

    if (error) {
      throw new Error('Invalid credentials. Please try again.')
    }

    // Redirect to admin dashboard
    router.push({ name: 'admin-dashboard' })
  } catch (error) {
    console.error(error.message) // Log the error
    formAction.value.formErrorMessage = error.message
  } finally {
    formAction.value.formProcess = false
  }
}
</script>

<template>
  <v-container
    class="d-flex justify-center align-center fill-height"
    style="background-color: #f5f5f5"
  >
    <v-card class="pa-5" min-width="400" elevation="12" rounded>
      <v-card-title class="text-h5 text-center text-primary">
        Admin Login
      </v-card-title>
      <v-card-text>
        <AlertNotification
          :form-success-message="formAction.formSuccessMessage"
          :form-error-message="formAction.formErrorMessage"
        ></AlertNotification>
        <v-form ref="refVForm" @submit.prevent="onSubmit">
          <v-text-field
            v-model="formData.email"
            label="Email"
            prepend-inner-icon="mdi-email"
            :rules="[requiredValidator, emailValidator]"
            class="modern-input mb-4"
            color="success"
            variant="outlined"
            density="compact"
            rounded
          ></v-text-field>
          <v-text-field
            v-model="formData.password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            label="Password"
            prepend-inner-icon="mdi-lock-outline"
            @click:append-inner="toggleVisible"
            :rules="[requiredValidator]"
            class="modern-input mb-4"
            color="success"
            variant="outlined"
            density="compact"
            rounded
          ></v-text-field>
          <v-row class="button-row mt-4">
            <v-col>
              <v-btn
                class="login-button w-100 rounded-pill"
                depressed
                type="submit"
                :disabled="formAction.formProcess"
                :loading="formAction.formProcess"
                color="success"
                block
              >
                Login Now
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  background-color: #e8f5e9;
}

.text-primary {
  color: #4caf50 !important;
}

.login-button {
  background-color: #4caf50 !important;
  color: white !important;
}

.login-button:hover {
  background-color: #43a047 !important;
}

.modern-input {
  background-color: #ffffff;
  border-radius: 8px;
}
</style>
