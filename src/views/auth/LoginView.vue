<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto pt-16">
          <v-card
            class="mx-auto "
            prepend-icon="mdi-login-variant"
          >
            <template v-slot:title>
              <h3 class="font-weight-black text-center">Welcome to Jobify</h3>
              <p class="font-weight-bold">Login</p>
            </template>

            <v-card-text class="bg-surface-light pt-4">
              <v-form fast-fail @submit.prevent>
                <v-text-field label="Email" variant="outlined"></v-text-field>

                <v-text-field
                  label="Password"
                  type="password"
                  variant="outlined"
                >
                </v-text-field>

                <v-btn class="mt-2 bg-primary" type="submit" block prepend-icon="mdi-login">Login</v-btn>
              </v-form>

              <v-divider class="my-5"></v-divider>
              <h5 class="text-center">
                Don't have an account?
                <router-link to="register" class="text-primary">
                  Click here to Register</router-link
                >
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
