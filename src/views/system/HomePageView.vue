<script setup name="HomePageView">
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <!-- First Section (Top Section) -->

        <h1 class="text-center mt-4">
          Connecting Students with Local Opportunities
        </h1>
        <v-container
          fluid
          class="d-flex align-center justify-center"
          style="
            background-image: url('/path/to/your-image.jpg');
            background-size: cover;
            background-position: center;
            min-height: 400px;
            color: white;
          "
        >
          <v-row class="text-center">
            <v-col>
              <v-card outlined color="teal lighten-5" class="pa-6">
                <p class="custom-paragraph">
                  Are you an employer looking to hire local students? Log in or
                  sign up to post job listings and connect with eager talent.
                </p></v-card
              >
              <v-col cols="auto">

               <v-btn
  size="large"
  class="login-button w-100 rounded-pill uniform-button"
  depressed
  type="submit"
  :to="{ name: 'login' }" 
>
  Search for Talent
</v-btn>
              </v-col>
            </v-col>

            <v-col>
              <v-card outlined color="teal lighten-5" class="pa-6">
                <p class="custom-paragraph">
                  Are you a student seeking part-time work? Log in or sign up to
                  explore job opportunities tailored for you.
                </p>
              </v-card>
              <v-col cols="auto">
               <v-btn
  size="large"
  class="login-button w-100 rounded-pill uniform-button"
  depressed
  type="submit"
  :to="{ name: 'login' }"
>
  Search for Job
</v-btn>
              </v-col>
            </v-col>
          </v-row>
        </v-container>

        <!-- Second Section (How Jobify Works) -->
        <v-container fluid class="text-center my-8">
          <h2>How Jobify Works</h2>
          <v-row class="mt-6">
            <v-col cols="12" md="6">
              <v-card outlined color="teal lighten-5" class="pa-6">
                <h3>Employer</h3>
                <p class="custom-paragraph">
                  Simply create an account to post job listings and connect with
                  eager local talent. Our platform makes it easy to share your
                  job opportunities and find the right candidates who fit your
                  needs.
                </p>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card outlined color="teal lighten-5" class="pa-6">
                <h3>Job Seekers</h3>
                <p class="custom-paragraph">
                  Sign up and create a profile to showcase your skills and
                  experiences. Search for part-time job openings tailored to
                  your preferences, and apply effortlessly with just a few
                  clicks.
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
/* Custom paragraph color */
.custom-paragraph {
  color: #c3b9b9; /* Medium grey */
}
h1 {
  color: #555555;
}

/* Uniform button size */
.uniform-button {
  min-width: 180px; /* Adjust as needed for uniformity */
  font-size: 16px; /* Ensure readable font size */
}
</style>
