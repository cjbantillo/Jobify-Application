<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'light',
  },
});

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
                  <v-card-title class="title">Terms of Service</v-card-title>
                  <v-card-text>
                    <!-- Terms of Service -->
                    <v-divider></v-divider>
                    <div class="description-section">
                      <h3>Introduction</h3>
                      <p>
                        Welcome to StuGig! These terms of service outline the rules and regulations for the use of StuGig's services.
                      </p>
                      
                      <h3>Acceptance of Terms</h3>
                      <p>
                        By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </p>

                      <h3>Modifications to Terms</h3>
                      <p>
                        StuGig reserves the right to modify these terms at any time. We will do our best to notify users of any significant changes to these terms. Continued use of the service will signify your acceptance of any adjustment to these terms.
                      </p>

                      <h3>Use of Service</h3>
                      <p>
                        You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the services.
                      </p>
                      
                      <h3>User Accounts</h3>
                      <p>
                        You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.
                      </p>

                      <h3>Intellectual Property</h3>
                      <p>
                        All content included on the service, such as text, graphics, logos, images, and software, is the property of StuGig or its content suppliers and protected by international copyright laws.
                      </p>

                      <h3>Termination</h3>
                      <p>
                        StuGig may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the terms.
                      </p>

                      <h3>Governing Law</h3>
                      <p>
                        These terms shall be governed and construed in accordance with the laws of the Philippines, without regard to its conflict of law provisions.
                      </p>

                      <h3>Contact Us</h3>
                      <p>If you have any questions about these Terms, please contact us:</p>
                      <p><strong>Email:</strong> support@stugig.com</p>
                      <p><strong>Phone:</strong> +63917-123-4567</p>
                    </div>
                    <!-- End of Terms of Service -->
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
