<script setup>
import { ref } from 'vue'
import { supabase } from '@/utils/supabase.js'
import { emailValidator, requiredValidator } from '@/utils/validator'

// Form data and state
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

// Toggle password visibility
const toggleVisible = () => {
  visible.value = !visible.value
}
const onSubmit = async () => {
  formAction.value.formErrorMessage = '';
  formAction.value.formSuccessMessage = '';
  formAction.value.formProcess = true;

  try {
    // Authenticate user with Supabase
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    });

    if (loginError) {
      throw new Error('Invalid credentials. Please try again.');
    }

    // Fetch the list of users
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
      throw new Error('Unable to retrieve user list. Please contact support.');
    }

    // Find the user with the specified email and check if they are a super admin
    const user = users.users.find(
      (u) => u.email === formData.value.email && u.is_super_admin
    );

    if (!user) {
      throw new Error('Access denied. You are not authorized as an admin.');
    }

    // Handle successful login
    formAction.value.formSuccessMessage = 'Login successful! Redirecting...';
    setTimeout(() => {
      // Redirect to the admin dashboard
      window.location.href = '/admin';
    }, 1500);
  } catch (error) {
    formAction.value.formErrorMessage = error.message;
  } finally {
    formAction.value.formProcess = false;
  }
};

</script>
<template>
  <v-container class="d-flex justify-center align-center fill-height" style="background-color: #f5f5f5;">
    <v-card class="pa-5" min-width="400" elevation="12" rounded>
      <v-card-title class="text-h5 text-center text-primary">
        Admin Login
      </v-card-title>
      <v-card-text>
        <AlertNotification
          :form-success-message="formAction.formSuccessMessage"
          :form-error-message="formAction.formErrorMessage"
        ></AlertNotification>
        <v-form ref="refVForm" fast-fail @submit.prevent="onSubmit">
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
          <!-- password -->
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
          <!-- Forgot Password -->
          <v-row class="mt-2 align-center">
            <v-col cols="6" class="text-right">
              <span>Forgot Password?</span>
            </v-col>
          </v-row>

          <!-- Login Button -->
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
  background-color: #e8f5e9; /* Light green background */
}

.text-primary {
  color: #4caf50 !important;
}

.login-button {
  background-color: #4caf50 !important;
  color: white !important;
}

.login-button:hover {
  background-color: #43a047 !important; /* Darker green for hover */
}

.modern-input {
  background-color: #ffffff; /* White background for input fields */
  border-radius: 8px;
}
</style>
