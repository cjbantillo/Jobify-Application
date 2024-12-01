<script setup>
import { ref } from 'vue';
import guidelines from '@/assets/gif/guidelines.gif';
import password from '@/assets/gif/password.gif';
import securityCamera from '@/assets/gif/security-camera.gif';

const securityGuidelines = ref([
  {
    title: 'Protecting Your Data',
    description:
      'We ensure your personal information is encrypted and stored securely, protecting it from unauthorized access in compliance with the Philippines’ Data Privacy Act.',
  },
  {
    title: 'Secure and Ethical Use of the Platform',
    description:
      'Posting inappropriate content, including nudity, violence, or malicious information, is strictly prohibited. Violators will face penalties, including restrictions or permanent bans.',
  },
  {
    title: 'Moderation and Reporting',
    description:
      'Our active moderators monitor the site to maintain a safe and respectful environment. Users can report content or activities that violate our guidelines.',
  },
  {
    title: 'Transparent Data Practices',
    description:
      'We are committed to transparency about how your data is collected, used, and shared. You have full control over your personal information and can request updates or deletion at any time.',
  },
  {
    title: 'Safe Online Interactions',
    description:
      'To protect everyone, avoid sharing sensitive personal details (like passwords or financial information) in public spaces.',
  },
  {
    title: 'Always Use Secure Connections',
    description:
      'Our platform runs on HTTPS to ensure all communication between you and the website is encrypted and safe from third-party attacks.',
  },
  {
    title: 'Strong Content Filters',
    description:
      'We use advanced filters to block harmful or inappropriate content before it is visible to others.',
  },
  {
    title: 'User Accountability',
    description:
      'All activities are logged securely. Users found violating our terms may be restricted, and repeat offenders may face permanent bans.',
  },
  {
    title: 'Session Security',
    description:
      'Your account is protected with secure logins and automatic logout after inactivity to prevent unauthorized access.',
  },
  {
    title: 'Your Privacy Matters',
    description:
      'We respect your privacy and follow strict protocols to ensure your data is protected. Detailed policies can be found in our Privacy Policy document.',
  },
]);
</script>

<template>
  <v-container class="container-with-gifs">
    <v-card class="pa-6 mt-5 card-elevation">
      <v-card-title class="title">
        Security, Privacy, and Community Guidelines
      </v-card-title>

      <v-list lines="three">
        <v-list-item
          v-for="(guideline, index) in securityGuidelines"
          :key="index"
        >
          <v-list-item-content>
            <v-list-item-title class="bold-title">{{
              guideline.title
            }}</v-list-item-title>
            <v-list-item-subtitle class="indented-description">
              {{ guideline.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <div class="gif-container">
      <img :src="securityCamera" alt="Security Camera" class="gif" />
      <img :src="guidelines" alt="Guidelines" class="gif" />
      <img :src="password" alt="Password" class="gif" />
    </div>
  </v-container>
</template>

<style scoped src="./SecurityPrivacyStyle.css"></style>
