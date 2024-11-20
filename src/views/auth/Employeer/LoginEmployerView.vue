<script setup>
import AppLayout from '@/components/layout/LoginLayout.vue'
import Loginform from '@/components/auth/Employer/Employer-Login-form.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row class="align-center justify-center">
          <!-- Illustration Column -->
          <v-col
            cols="12"
            md="6"
            class="d-none d-md-flex align-center justify-center"
          >
            <img
              src="@/assets/illustration.gif"
              alt="Login Illustration"
              class="login-illustration"
            />
          </v-col>

          <!-- Login Form Column -->
          <v-col cols="12" md="5" lg="4" class="login-form-container">
            <h2 class="login-heading">Login your account.</h2>
            <p class="login-subheading">Access your account in seconds.</p>

            <!-- Login Form AUTH -->
            <Loginform />

            <!-- Social Login -->
            <v-divider class="my-4">Or</v-divider>
            <div class="social-icons d-flex justify-center">
              <v-icon color="blue" class="mx-2">mdi-facebook</v-icon>
              <v-icon color="red" class="mx-2">mdi-google</v-icon>
              <v-icon color="light-blue" class="mx-2">mdi-twitter</v-icon>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.login-illustration {
  width: 100%;
  max-width: 100%;
  height: auto;
}
.login-form-container {
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.v-btn {
  font-weight: bold;
}
.v-divider {
  color: #cccccc;
}
.text-primary {
  color: #2c3e50;
}
.text-muted {
  color: #8a8a8a;
}

.login-heading {
  font-size: 2rem; /* Large and bold for emphasis */
  color: #2c3e50; /* Primary color */
  font-weight: 700; /* Bold font */
  letter-spacing: 0.5px; /* Slight letter spacing */
  margin-bottom: 1.5rem; /* Space below the heading */
}

.login-subheading {
  font-size: 1rem; /* Smaller font for subheading */
  color: #6c757d; /* Soft gray for a modern look */
  font-weight: 300; /* Light font weight */
  margin-bottom: 2rem; /* Space below the subheading */
}
</style>
