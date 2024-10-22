<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import Registerform from '@/components/auth/Registerform.vue';
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row class="mt-5 mb-5">
        <v-col cols="12" md="6" class="mx-auto mt-5">
          <v-card
            class="mx-auto"
            prepend-icon="mdi-account-plus"
         
          >
            <template v-slot:title>
              <h3 class="font-weight-black text-center">Welcome to Jobify</h3>
              <p class="font-weight-bold text-center">Register</p>
            </template>

            <v-card-text class="bg-surface-light pt-4">
             <Registerform></Registerform>

              <v-divider class="my-5"></v-divider>
              <h5 class="text-center">
                Already have an account?
                <router-link to="login" class="text-primary">
                  CLick here to Login</router-link
                >
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
