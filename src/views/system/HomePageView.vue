<script setup>
import { computed } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useWindowSize } from '@vueuse/core'
import hero from '@/assets/hero.gif'

const { width } = useWindowSize()

// Mobile variable: true if the width is less than or equal to 768px
const mobile = computed(() => width.value <= 768)
</script>
<template>
  <AppLayout>
    <template #content>
      <v-container>
        <!-- Main Hero Section -->
        <v-row
          class="hero-section mt-5"
          :style="{
            minHeight: '80vh',
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
          }"
        >
          <v-col
            :cols="10"
            :md="mobile ? 12 : 8"
            class="hero-text text-left justify-center align-center pa-8 ma-8"
          >
            <h1 class="display-2 text-white mb-4 animated-title">
              Connecting Students with Local Opportunities Near The Campus!
            </h1>
            <p class="subtitle-1 text-white mb-6 animated-text">
              A platform where employers and students meet to unlock <br />
              potential and create meaningful work experiences.
            </p>
            <v-btn
                  class="btn w-25 rounded-pill center"
                  depressed
                  to="register"
                >
                  Get Started
                </v-btn>
          </v-col>
        </v-row>

        <!-- Second Section: How Jobify Works -->
        <v-container fluid class="how-it-works-section py-6">
          <v-row class="text-center">
            <v-col :cols="12" :md="mobile ? 12 : 6" class="mb-4 animated-card">
              <v-card outlined class="custom-card" color="primary-lighten-5">
                <h3 class="font-weight-bold text-dark">For Employers</h3>
                <p class="custom-paragraph">
                  Create an account, post job listings, and connect with local
                  talent. It’s that simple to find the right candidates for your
                  opportunities.
                </p>
                <v-btn
                  class="btn w-50 rounded-pill center"
                  depressed
                  to="login"
                >
                  Find Talent
                </v-btn>
              </v-card>
            </v-col>
            <v-col :cols="12" :md="mobile ? 12 : 6" class="mb-4 animated-card">
              <v-card outlined class="custom-card" color="secondary-lighten-5">
                <h3 class="font-weight-bold text-dark">For Job Seekers</h3>
                <p class="custom-paragraph">
                  Sign up, create a profile, and explore job openings tailored
                  to your skills and preferences. Apply for jobs with just a few
                  clicks!
                </p>
                <v-btn
                  class="btn w-50 rounded-pill center"
                  depressed
                  to="login"
                >
                  Find Job
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Third Section: Key Features -->
        <v-container fluid class="features-section py-6">
          <v-row class="text-center">
            <!-- Feature 1 -->
            <v-col :cols="12" :md="mobile ? 12 : 4" class="mb-4 animated-card">
              <v-card outlined class="custom-card" color="teal-lighten-5">
                <h3 class="font-weight-bold text-dark">Easy Registration</h3>
                <p class="custom-paragraph">
                  Sign up quickly as either an employer or a job seeker and get
                  started in minutes.
                </p>
              </v-card>
            </v-col>
            <!-- Feature 2 -->
            <v-col :cols="12" :md="mobile ? 12 : 4" class="mb-4 animated-card">
              <v-card outlined class="custom-card" color="teal-lighten-4">
                <h3 class="font-weight-bold text-dark">Job Matching</h3>
                <p class="custom-paragraph">
                  Our platform intelligently matches students with job
                  opportunities that best suit their skills and interests.
                </p>
              </v-card>
            </v-col>
            <!-- Feature 3 -->
            <v-col :cols="12" :md="mobile ? 12 : 4" class="mb-4 animated-card">
              <v-card outlined class="custom-card" color="teal-lighten-3">
                <h3 class="font-weight-bold text-dark">Secure Application</h3>
                <p class="custom-paragraph">
                  Students can easily apply for jobs, and employers can securely
                  manage applications without any hassle.
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Fourth Section: Why Choose Us -->
        <section class="why-jobify">
          <div class="container">
            <h2 class="section-title">Why Choose StuGiG?</h2>
            <p class="section-description">
              At StuGiG, we’re redefining how talent meets opportunity. Here’s
              why StuGiG is the best choice for your career or hiring journey:
            </p>
            <div class="features">
              <div class="feature">
                <i class="fas fa-briefcase feature-icon"></i>
                <h3 class="feature-title">Wide Range of Opportunities</h3>
                <p class="feature-description">
                  Access thousands of job listings near the University.
                </p>
              </div>
              <div class="feature">
                <i class="fas fa-users feature-icon"></i>
                <h3 class="feature-title">Trusted by Employers</h3>
                <p class="feature-description">
                  Connect with verified companies actively searching for top
                  talent like you.
                </p>
              </div>
              <div class="feature">
                <i class="fas fa-search feature-icon"></i>
                <h3 class="feature-title">Smart Job Matching</h3>
                <p class="feature-description">
                  Let our system find jobs tailored to your skills, experience,
                  and preferences.
                </p>
              </div>
              <div class="feature">
                <i class="fas fa-heart feature-icon"></i>
                <h3 class="feature-title">Candidate-Centric Experience</h3>
                <p class="feature-description">
                  Designed with job seekers in mind, we prioritize your success
                  and satisfaction every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped src="./style/HomePageViewStyle.css">
</style>
