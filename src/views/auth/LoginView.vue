<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import Loginform from '@/components/auth/Login-form.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row class="mt-5 mb-10">
        <v-col cols="12" md="6" class="mx-auto pt-16">
          <v-card class="mx-auto" prepend-icon="mdi-login-variant">
            <template v-slot:title>
              <h3 class="font-weight-black text-center">Welcome to Jobify</h3>
              <p class="font-weight-bold text-center">Login</p>
            </template>

            <v-card-text class="bg-surface-light pt-4">
              <!-- Login Form AUTH -->
              <Loginform></Loginform>

              <v-divider class="my-5"></v-divider>
              <h5 class="text-center">
                Don't have an account?
                <router-link to="register" class="text-primary">
                  Click here to Register</router-link
                >
              </h5>

              <v-divider class="my-4"> or </v-divider>
              <div class="social-icons d-flex justify-center">
                <v-icon color="blue" class="mx-2">mdi-facebook</v-icon>
                <v-icon color="red" class="mx-2">mdi-google</v-icon>
                <v-icon color="light-blue" class="mx-2">mdi-twitter</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
