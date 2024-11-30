<script setup>
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue'
import AccountInformationLayout from '@/components/system/settings/AccountInformationLayout.vue';
</script>

<template>
  <JobNavigationLayout>
    <template #content>
      
      <AccountInformationLayout />
    </template>
  </JobNavigationLayout>
</template>
