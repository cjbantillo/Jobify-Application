<script setup>
import { ref } from 'vue';

import meImage from '@/assets/Me.png';
import profileCj from '@/assets/ProfileCj.png';
import luisImage from '@/assets/luis.jpg'; // Corrected path
const props = defineProps({
  theme: {
    type: String,
    default: 'light',
  },
});

const teamMembers = ref([
  {
    name: 'Nheron Louise Cedro',
    role: 'Developer', // Specify your role here
    image: meImage, // Using the imported image
  },
  {
    name: 'June Luis Bermudez',
    role: 'System Analyst',
    image: luisImage,
  },
  {
    name: 'Christian James Bantillo',
    role: 'Developer',
    image: profileCj , // Replace with actual image URL or import
  },
]);

const goBack = () => {
  window.history.back();
};
</script>

<template>
    <v-btn class="back-btn" @click="goBack">
        <v-icon left>mdi-arrow-left</v-icon>
    </v-btn>
    <v-container class="about-us-container">
      <v-row>
        <v-col cols="12">
          <v-responsive class="border rounded">
            <v-app :theme="props.theme" class="d-flex flex-column fill-height">
              <v-main class="d-flex flex-column flex-grow-1 pt-8">
                <v-container>
                  <!-- Content -->
                  <v-card class="pa-4 mb-6 enhanced-card">
                    <v-card-title class="title">About Us</v-card-title>
                    <v-card-text>
                      <!-- StuGig Description -->
                      <v-divider></v-divider>
                      <div class="description-section">
                        <h3>Welcome to StuGig: Your Gateway to Academic and Professional Success!</h3>
                        <p>
                          StuGig is more than just an app – it's a revolutionary platform designed with the needs of Caraga State University students in mind. Imagine a world where you can balance your academic commitments while gaining real-world experience through part-time jobs. With StuGig, that dream becomes a reality.
                        </p>
  
                        <h3>For Students:</h3>
                        <p>
                          At StuGig, we understand that your education is a top priority. That’s why our platform is tailored to offer part-time job opportunities that fit seamlessly into your academic schedule. No more juggling conflicts between work and studies – our smart system matches you with jobs that complement your availability and skill set. Whether you're looking to earn some extra income, gain practical experience in your field of study, or network with professionals, StuGig empowers you to take charge of your future without compromising your education.
                        </p>
  
                        <h3>For Employers:</h3>
                        <p>
                          Are you looking for driven, knowledgeable, and hardworking individuals to join your team? Look no further! With StuGig, you have exclusive access to a pool of talented students from Caraga State University who are eager to apply their learning in real-world scenarios. Hiring through StuGig means you are not just filling a position – you’re investing in the next generation of professionals. Our streamlined process ensures that you can find the right candidates efficiently, saving you time and resources.
                        </p>
  
                        <h3>Why StuGig is the Perfect Choice:</h3>
                        <ul>
                          <li><strong>Flexibility</strong>: Students can find jobs that fit their schedules, ensuring they can focus on their studies while earning and gaining experience.</li>
                          <li><strong>Quality Candidates</strong>: Employers get access to bright, motivated students from Caraga State University, ready to bring fresh ideas and energy to your business.</li>
                          <li><strong>User-Friendly Interface</strong>: Our app is designed to be intuitive and easy to navigate, making job searching and hiring a breeze.</li>
                          <li><strong>Support and Guidance</strong>: We provide resources and support for both students and employers to ensure a successful and rewarding experience.</li>
                        </ul>
  
                        <p>Join the StuGig community today and experience the perfect harmony of education and employment. Let's build a brighter future together, one gig at a time. 📚💼✨</p>
                      </div>
                      <!-- End of Description -->
  
                      <!-- Team Members -->
                      <v-divider></v-divider>
                      <v-row class="mt-6">
                        <v-col
                          v-for="(member, index) in teamMembers"
                          :key="index"
                          cols="12"
                          md="4"
                          class="d-flex flex-column align-items-center text-center"
                        >
                          <v-avatar size="120" class="mb-4">
                            <v-img :src="member.image" class="rounded-circle"></v-img>
                          </v-avatar>
                          <div>
                            <p class="name">{{ member.name }}</p>
                            <p class="role">{{ member.role }}</p>
                          </div>
                        </v-col>
                      </v-row>
                      <!-- End of Team Members -->
                    </v-card-text>
                  </v-card>
                </v-container>
              </v-main>
            </v-app>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
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
  padding-bottom: 50px;
}

.hero-text {
  background-color: rgba(76, 175, 80, 0);
  -webkit-backdrop-filter: blur(12px) brightness(1.05);
  backdrop-filter: blur(12px) brightness(1.05);
  border-radius: 20px;
  overflow: hidden;
}

.hero-text h1 {
  font-size: 2rem;
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

.btn,
.custom-card .btn {
  text-transform: none;
  justify-self: center;
  align-self: center;
  background-color: #fff;
  color: #4caf50;
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

/* Additional Styles */
.about-us-container {
  padding: 24px;
  background: #E0F7FA; /* Light cyan background */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.go-back-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  background: transparent;
  color: #4caf50;
  border: none;
  box-shadow: none;
  font-size: 30px;
}
.go-back-btn:hover {
  background: none;
  border: none;
  box-shadow: none;
}

.enhanced-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #4caf50; /* Dark teal color for the title */
  text-align: center;
}

.description-section {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #103614; /* Subtle teal color for text */
}

.description-section h3 {
  margin-top: 16px;
  font-size: 2rem;
  color: #4caf50; /* Same color as the title */
}

.description-section ul {
  padding-left: 20px;
}

.rounded-circle {
  border-radius: 50%;
}

.name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #14903d; /* Darker color for the name */
}

.role, .contact {
  font-size: 1rem;
  color: #55a76e; /* Subtle color for the role and contact information */
}

/* Centering the images */
.v-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.v-avatar {
  margin: auto;
}
</style>
