
<script setup>
import AppLayout from '@/components/layout/RegisterLayout.vue'
import Registerform from '@/components/auth/Register-form.vue'

</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row class="align-center justify-center">
          <!-- Illustration Column -->
          <v-col cols="12" md="6" class="d-none d-md-flex align-center justify-center">
            <img src="@/assets/registration.gif" alt="Register Illustration" class="register-illustration" />
          </v-col>

          
          <!-- Register Form Column -->
          <v-col cols="12" md="5" lg="4" class="register-form-container">
            <h2 class="register-heading">Create Your Account</h2>
            <p class="register-subheading">It only takes a minute!</p>



            <!-- Register Form Component -->
            <Registerform />

            <!-- Social Register -->
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
.register-illustration {
  width: 100%;
  max-width: 100%;
  height: auto;
}
.register-form-container {
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.register-heading {
  font-size: 2rem;
  color: #2c3e50;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
}
.register-subheading {
  font-size: 1rem;
  color: #6c757d;
  font-weight: 300;
  margin-bottom: 2rem;
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
</style>
