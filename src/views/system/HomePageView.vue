<script setup>
import { computed } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useWindowSize } from '@vueuse/core'
import hero from '@/assets/bg2.jpg'
import router from '@/router'

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
            :cols="12"
            :md="mobile ? 12 : 8"
            class="hero-text text-left justify-center align-center"
          >
            <h1 class="display-2 text-white mb-4 animated-title">
              Connecting Students with Local Opportunities
            </h1>
            <p class="subtitle-1 text-white mb-6 animated-text">
              A platform where employers and students meet to unlock <br />
              potential and create meaningful work experiences.
            </p>
            <v-btn
                  class="btn w-50 rounded-pill center"
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
            <h2 class="section-title">Why Choose Jobify?</h2>
            <p class="section-description">
              At Jobify, we’re redefining how talent meets opportunity. Here’s
              why Jobify is the best choice for your career or hiring journey:
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Matemasie&family=Varela+Round&display=swap');

*,
v-btn {
  font-family: 'Varela Round', sans-serif;
  font-weight: 400;
  font-style: normal;
}
/* Custom paragraph color */
.custom-paragraph {
  color: #616161; /* Dark gray text for better readability */
  font-size: 16px; /* Standardized font size for readability */
  line-height: 1.6;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /*   transition: background-color 0.5s ease; */
  padding-bottom: 50px;
}

/*  Hero Section Hover Effect  */
/* .hero-section:hover {
  background-color: rgba(0, 0, 0, 0.5);
} */

.hero-text h1 {
  font-size: 4rem;
  width: 80%;
}

.hero-text p {
  text-indent: 1.25rem;
  font-weight: 100;
}

/* How Jobify Works Section */
.how-it-works-section {
  padding: 60px 0;
  margin-top: 30px;
}

/* Key Features Section */
.features-section {
  padding: 60px 0;
  margin-top: 30px;
}

/* Why Choose Us Section */
.why-jobify {
  padding: 50px 20px;
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
  font-family: Arial, sans-serif;
  border-radius: 10px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  color: #4caf50;
  margin-bottom: 10px;
}

.section-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}

.feature {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  flex: 1 1 250px;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 40px;
  color: #4caf50;
  margin-bottom: 15px;
}

.feature-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.feature-description {
  font-size: 14px;
  color: #666;
}

/* Standardized card size */
.custom-card {
  border-radius: 15px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.custom-card h3 {
  color: #4caf50;
}

.custom-card p {
  color: #616161;
  text-indent: 10px;
  text-align: left;
}
.btn, .custom-card .btn {
  text-transform: none;
  justify-self: center;
  align-self: center;
  background-color: #4caf50;
  color: #fff;
}
.custom-card h3,
p,
.btn {
  margin-top: 10px;
  margin-bottom: 10px;
}
.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

/* Animated Title and Button */
.animated-title {
  animation: fadeIn 1s ease-in-out;
}

.animated-text {
  animation: slideUp 1s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
