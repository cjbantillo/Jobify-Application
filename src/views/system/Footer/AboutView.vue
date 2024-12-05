<template>
    <v-container class="about-us-container">
      <v-row>
        <v-col cols="12">
          <v-btn icon @click="goBack" class="go-back-btn">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
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
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const teamMembers = ref([
    {
      name: 'Developer 1',
      role: 'Developer',
      image: 'https://via.placeholder.com/120', // Replace with actual image URL
    },
    {
      name: 'System Analyst',
      role: 'System Analyst',
      image: 'https://via.placeholder.com/120', // Replace with actual image URL
    },
    {
      name: 'Developer 2',
      role: 'Developer',
      image: 'https://via.placeholder.com/120', // Replace with actual image URL
    },
  ]);
  
  const goBack = () => {
    router.back();
  };
  </script>
  
  <style scoped>
  .about-us-container {
    padding: 24px;
    background: #E0F7FA; /* Light cyan background */
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .go-back-btn {
    position: absolute;
    top: 24px;
    left: 24px;
    color: #004D40; /* Dark teal color for the button */
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
    color: #004D40; /* Dark teal color for the title */
    text-align: center;
  }
  
  .welcome-title {
    font-size: 1.8rem; /* Adjusted size to ensure one line */
    font-weight: bold;
    color: #004D40; /* Dark teal color for the title */
    text-align: center;
  }
  
  .description-section {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #00796B; /* Subtle teal color for text */
  }
  
  .description-section h3 {
    margin-top: 16px;
    font-size: 2rem;
    color: #004D40; /* Same color as the title */
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
    color: #004D40; /* Darker color for the name */
  }
  
  .role {
    font-size: 1rem;
    color: #00796B; /* Subtle color for the role */
  }
  </style>
  