<script setup>
// import { ref } from 'vue';
// import { defineProps } from 'vue';

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
                  <v-card-title class="title">Privacy Policy</v-card-title>
                  <v-card-text>
                    <!-- Privacy Policy -->
                    <v-divider></v-divider>
                    <div class="description-section">
                      <h3>Our Commitment to Your Privacy</h3>
                      <p>
                        Your privacy is critically important to us. At StuGig, we have a few fundamental principles:
                      </p>
                      <ul>
                        <li>We don't ask you for personal information unless we truly need it.</li>
                        <li>We don't share your personal information except to comply with the law, develop our products, or protect our rights.</li>
                        <li>We don't store personal information on our servers unless required for the ongoing operation of one of our services.</li>
                      </ul>

                      <h3>Information We Collect</h3>
                      <p>We collect information to provide better services to all our users. This includes:</p>
                      <ul>
                        <li><strong>Personal Information</strong>: When you sign up for or use our services, we may collect personal information from you, such as your name, email address, and phone number.</li>
                        <li><strong>Usage Information</strong>: We collect information about how you use our services, such as the types of content you view or engage with, the features you use, and the actions you take.</li>
                      </ul>

                      <h3>Data Protection Rights</h3>
                      <p>Under the Republic Act No. 10173, also known as the Data Privacy Act of 2012, you have rights regarding your personal data, including:</p>
                      <ul>
                        <li>The right to be informed about the collection and use of your personal data.</li>
                        <li>The right to access your personal data.</li>
                        <li>The right to correct any inaccuracies in your personal data.</li>
                        <li>The right to object to the processing of your personal data.</li>
                        <li>The right to data portability.</li>
                        <li>The right to erasure or blocking of your personal data.</li>
                      </ul>

                      <h3>Contact Us</h3>
                      <p>If you have any questions about this Privacy Policy, please contact us:</p>
                      <p><strong>Email:</strong> support@stugig.com</p>
                      <p><strong>Phone:</strong> +63917-123-4567</p>
                    </div>
                    <!-- End of Privacy Policy -->
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
