<script setup>
import JobNavigationLAyout from '@/components/layout/navigation/JobNavigationLAyout.vue'
import ChangePasswordLayout from '@/components/system/settings/ChangePasswordLayout.vue';
</script>

<template>
  <JobNavigationLAyout>
    <template #content>
     <ChangePasswordLayout />
    </template>
  </JobNavigationLAyout>
</template>

