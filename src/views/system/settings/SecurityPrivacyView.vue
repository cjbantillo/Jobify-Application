<script setup>
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue';
import { ref } from 'vue';
import SecurityPrivacyLayout from '@/components/system/settings/SecurityPrivacyLayout.vue';
</script>

<template>
  <JobNavigationLayout>
    <template #content>
      <SecurityPrivacyLayout />
    </template>
  </JobNavigationLayout>
</template>
