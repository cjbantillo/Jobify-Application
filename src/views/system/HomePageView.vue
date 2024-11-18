<script setup name="homepage">
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <!-- Main Hero Section -->
        <v-row
          min-height="80vh"
        >
          <v-col cols="12" md="8" class="hero-text">
            <h1
              class="display-2 mb-4 animated-title"
            >
              Connecting Students with Local Opportunities
            </h1>
            <p class="subtitle-1 mb-6 animated-text">
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

*{
  font-family: "Varela Round", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.hero-text{
  width: 50%;
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
  color: #00796b;
}

.custom-card p {
  color: #616161;
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

/* Button Styles */
.login-button {
  background-color: #00796b;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}

.login-button:hover {
  background-color: #004d40;
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

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
