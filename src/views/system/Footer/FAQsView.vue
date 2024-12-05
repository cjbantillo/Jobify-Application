<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'light',
  },
});

const faqs = ref([
  {
    question: 'What is StuGiG?',
    answer: 'StuGiG is a platform designed to connect students with part-time gig opportunities that fit seamlessly into their academic schedules. Whether you\'re looking for your dream job or the perfect candidate, StuGiG has got you covered.',
    isOpen: false,
  },
  {
    question: 'Who can use StuGiG?',
    answer: 'StuGiG is designed for students seeking part-time gigs that do not interfere with their school schedules, as well as for employers looking for talented and motivated individuals to join their teams.',
    isOpen: false,
  },
  {
    question: 'How does StuGiG work?',
    answer: 'Students can browse through various job postings, apply for positions that interest them, and manage their applications through their dashboard. Employers can post job listings, review applications, and connect with potential candidates.',
    isOpen: false,
  },
  {
    question: 'How do I sign up as a student?',
    answer: 'Simply click on the "Sign Up" button on our homepage, fill in your details, and create an account. Once your account is set up, you can start exploring job opportunities that fit your schedule.',
    isOpen: false,
  },
  {
    question: 'Is there a cost to use StuGiG as a student?',
    answer: 'No, StuGiG is free for students. Our goal is to help you find part-time work that complements your studies without any additional costs.',
    isOpen: false,
  },
  {
    question: 'How can I find a job that fits my school schedule?',
    answer: 'Our platform features a smart matching system that suggests job listings based on your availability and preferences. You can filter jobs by type, location, and hours to find the perfect fit.',
    isOpen: false,
  },
  {
    question: 'Can I apply for multiple jobs at once?',
    answer: 'Yes, you can apply for as many jobs as you want. We encourage you to explore all opportunities and apply to the ones that best match your interests and schedule.',
    isOpen: false,
  },
  {
    question: 'How do I post a job on StuGiG?',
    answer: 'To post a job, you need to create an employer account. Once logged in, you can create a new job listing by filling out the required information, such as job title, description, requirements, and schedule.',
    isOpen: false,
  },
  {
    question: 'Is there a fee for posting jobs on StuGiG?',
    answer: 'StuGiG offers competitive pricing plans for employers. You can choose from various packages based on your hiring needs. For more details, visit our pricing page.',
    isOpen: false,
  },
  {
    question: 'How can I find the best candidates for my job postings?',
    answer: 'Our platform allows you to review applications, filter candidates based on their profiles, and contact potential hires directly. You can also use our smart matching system to find candidates who fit your job requirements.',
    isOpen: false,
  },
  {
    question: 'How do I manage applications?',
    answer: 'You can manage all applications through your employer dashboard. Here, you can review candidate profiles, track application statuses, and communicate with applicants.',
    isOpen: false,
  },
  {
    question: 'How does StuGiG protect my personal information?',
    answer: 'We take your privacy seriously. StuGiG follows strict data protection policies in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173) of the Philippines. For more details, please read our Privacy Policy.',
    isOpen: false,
  },
  {
    question: 'Can I delete my account?',
    answer: 'Yes, you can delete your account at any time. Simply go to your account settings and follow the instructions to permanently remove your account from our platform.',
    isOpen: false,
  },
  {
    question: 'I need help with my account. How can I contact StuGiG support?',
    answer: 'For any support queries, you can contact us via email at support@stugig.com or call us at +63917-123-4567. Our support team is here to assist you with any issues or questions you may have.',
    isOpen: false,
  },
]);

const toggleAnswer = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
};

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
                  <v-card-title class="title">FAQs</v-card-title>
                  <v-card-text>
                    <!-- FAQs -->
                    <v-divider></v-divider>
                    <div class="description-section">
                      <h3>Frequently Asked Questions</h3>
                      <p>
                        Here are some of the common questions we get at StuGiG. Click on the questions to see the answers.
                      </p>
                      <v-divider></v-divider>
                      <v-list>
                        <v-list-item-group>
                          <v-list-item
                            v-for="(faq, index) in faqs"
                            :key="index"
                            @click="toggleAnswer(index)"
                          >
                            <v-list-item-content>
                              <v-list-item-title>{{ faq.question }}</v-list-item-title>
                              <v-list-item-subtitle v-if="faq.isOpen">{{ faq.answer }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </div>
                    <!-- End of FAQs -->
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
