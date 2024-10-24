<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import Registerform from '@/components/auth/Register-form.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid="">
       
        <v-row class="mb-5">
          <v-col cols="12" md="6" class="mx-auto mt-5">
            <v-card class="mx-auto" prepend-icon="mdi-account-plus">
              <template v-slot:title>
                <h3 class="font-weight-black text-center">Welcome to Jobify</h3>
                <p class="font-weight-bold text-center">Register</p>
              </template>

              <v-card-text class="bg-surface-light pt-4">
                <Registerform></Registerform>

                <h5 class="text-center my-4">
                  Already have an account?
                  <router-link to="login" class="text-primary">
                    CLick here to Login</router-link
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
        </v-row></v-container
      >
    </template>
  </AppLayout>
</template>
