<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
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
              <v-form fast-fail @submit.prevent>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Firstname"
                      variant="outlined"
                    ></v-text-field
                  ></v-col>
                  <v-col>
                    <v-text-field
                      label="Lastname"
                      variant="outlined"
                    ></v-text-field
                  ></v-col>
                </v-row>

                <v-text-field label="Email" variant="outlined"></v-text-field>

                <v-text-field
                  label="Password"
                  type="password"
                  variant="outlined"
                >
                </v-text-field>
                <v-text-field
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                >
                </v-text-field>

                <v-btn class="mt-2 bg-primary" type="submit" block prepend-icon="mdi-account-plus">Submit</v-btn>
              </v-form>
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
