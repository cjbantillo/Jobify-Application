<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto pt-16">
          <v-card
            class="mx-auto"
            prepend-icon="mdi-login-variant"
            subtitle="Login"
          >
            <template v-slot:title>
              <span class="font-weight-black">Welcome to Jobify</span>
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

                <v-btn class="mt-2" type="submit" block>Submit</v-btn>
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
