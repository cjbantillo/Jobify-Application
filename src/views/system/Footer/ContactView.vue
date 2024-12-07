<script setup>
import { ref } from 'vue';

// Importing your local images
import meImage from '@/assets/me.png';
import profileCj from '@/assets/ProfileCj.png';
import luisImage from '@/assets/luis.jpg';

// Log the image URLs to the console for debugging
console.log('meImage:', meImage);
console.log('profileCj:', profileCj);
console.log('luisImage:', luisImage);

const props = defineProps({
  theme: {
    type: String,
    default: 'light',
  },
});

const teamMembers = ref([
  {
    name: 'Nheron Cedro',
    role: 'Developer',
    email: 'cedronheron@gmail.com',
    phone: '+63950-315-1603',
    image: meImage,
  },
  {
    name: 'Luis Gwapo',
    role: 'System Analyst',
    email: 'juneluis@gmail.com',
    phone: '+63936-589-8662',
    image: luisImage,
  },
  {
    name: 'Christian James Bantillo',
    role: 'Developer',
    email: 'bantillocj1@gmail.com',
    phone: '+63968-575-2351',
    image: profileCj,
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
                  <v-card-title class="title">Contact Us</v-card-title>
                  <v-card-text>
                    <!-- Contact Information -->
                    <v-divider></v-divider>
                    <div class="description-section">
                      <h3>Get in Touch with Us!</h3>
                      <p>
                        We're here to help! If you have any questions, suggestions, or need support, feel free to reach out to any of our team members. We're always eager to assist you and ensure you have a great experience with StuGig.
                      </p>
                    </div>
                    <!-- End of Contact Information -->

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
                          <p class="contact"><strong>Email:</strong> {{ member.email }}</p>
                          <p class="contact"><strong>Phone:</strong> {{ member.phone }}</p>
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

.role, .contact {
  font-size: 1rem;
  color: #00796B; /* Subtle color for the role and contact information */
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
