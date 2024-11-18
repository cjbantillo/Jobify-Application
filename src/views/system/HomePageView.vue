<script setup name="homepage">
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <!-- Main Hero Section -->
        <v-row
          class="hero-section mt-5"
          style="
            min-height: 100vh;
            background-image: url('/src/assets/bg2.jpg');
            background-size: cover;
            background-position: center;
            border-radius: 10px;
          "
        >
          <v-col cols="12" md="8" class="hero-text text-start">
            <h1
              class="display-2 font-weight-bold text-white mb-4 animated-title"
            >
              Connecting Students with Local Opportunities
            </h1>
            <p class="subtitle-1 text-white mb-6 animated-text">
              A platform where employers and students meet to unlock potential
              and create meaningful work experiences.
            </p>
          </v-col>
        </v-row>

        <!-- Second Section: How Jobify Works -->
        <v-container fluid class="how-it-works-section py-6">
          <v-row class="text-center">
            <v-col cols="12" md="6" class="mb-4 animated-card">
              <v-card outlined class="custom-card" color="primary-lighten-5">
                <h3 class="font-weight-bold text-dark">For Employers</h3>
                <p class="custom-paragraph">
                  Create an account, post job listings, and connect with local
                  talent. It’s that simple to find the right candidates for your
                  opportunities.
                </p>
                <v-btn class="btn w-25 rounded-pill center" depressed to="employerregister">
                  Get Started
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" class="mb-4 animated-card">
              <v-card outlined class="custom-card" color="secondary-lighten-5">
                <h3 class="font-weight-bold text-dark">For Job Seekers</h3>
                <p class="custom-paragraph">
                  Sign up, create a profile, and explore job openings tailored
                  to your skills and preferences. Apply for jobs with just a few
                  clicks!
                </p>
                <v-btn class="btn w-25 rounded-pill center" depressed to="studentregister">
                  Get Started
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Third Section: Key Features -->
        <v-container fluid class="features-section py-6">
          <v-row class="text-center">
            <!-- Feature 1 -->
            <v-col cols="12" md="4" class="mb-4 animated-card">
              <v-card outlined class="custom-card" color="teal-lighten-5">
                <h3 class="font-weight-bold text-dark">Easy Registration</h3>
                <p class="custom-paragraph">
                  Sign up quickly as either an employer or a job seeker and get
                  started in minutes.
                </p>
              </v-card>
            </v-col>
            <!-- Feature 2 -->
            <v-col cols="12" md="4" class="mb-4 animated-card">
              <v-card outlined class="custom-card" color="teal-lighten-4">
                <h3 class="font-weight-bold text-dark">Job Matching</h3>
                <p class="custom-paragraph">
                  Our platform intelligently matches students with job
                  opportunities that best suit their skills and interests.
                </p>
              </v-card>
            </v-col>
            <!-- Feature 3 -->
            <v-col cols="12" md="4" class="mb-4 animated-card">
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
        <v-container fluid class="why-choose-us-section py-6">
          <v-row class="text-center">
            <v-col cols="12">
              <h2 class="font-weight-bold text-dark">Why Choose Jobify?</h2>
              <p class="subtitle-1 custom-paragraph">
                Jobify provides a simple, reliable, and secure platform for
                students and employers to connect and grow together. With our
                focus on local opportunities, we are committed to helping
                students find meaningful work experiences while assisting
                employers in finding the best talent.
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Matemasie&family=Varela+Round&display=swap');

*, v-btn{
  font-family: "Varela Round", sans-serif;
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
  transition: background-color 0.5s ease;
  padding-bottom: 50px;
}

/* Hero Section Hover Effect */
.hero-section:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.hero-text h1{
  font-size: 4rem;
  width: 60%;
}
.hero-text p{
  text-indent: 1.25rem;
  font-weight: 100;
}

/* First Section: For Employers and Students */
.first-section {
  background-image: url('/src/assets/bg3.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 60px 0;
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
.why-choose-us-section {
  padding: 60px 0;
  margin-top: 30px;
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
.custom-card .btn{
  text-transform: none;
  justify-self: center;
  align-self: center;
  background-color: #4caf50;
  color: #fff;
}
.custom-card h3,p,.btn{
  margin-top: 10px;
  margin-bottom: 10px
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

.animated-button {
  animation: bounce 1s ease-in-out infinite;
}


/* Hover animation for buttons */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Hover animation for animated text */
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade-in animation for title */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
