<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/utils/supabase';
import EmployerNavigationLayout from '@/components/layout/navigation/EmployerNavigationLayout.vue';
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue';
import SecurityPrivacyLayout from '@/components/system/settings/SecurityPrivacyLayout.vue';

const is_employer = ref(false);

const checkUserRole = async () => {
  try {
    // Fetch the current user
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user?.user) {
      console.error('Error fetching user or user not authenticated:', userError);
      return;
    }

    // Check if the user has an employer profile
    const { data: profile, error: profileError } = await supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', user.user.id)
      .single();

    if (profileError || !profile) {
      console.log('No employer profile found.');
      is_employer.value = false;
    } else {
      console.log('Employer profile exists:', profile);
      is_employer.value = true;
    }
  } catch (err) {
    console.error('Unexpected error while checking user role:', err);
    is_employer.value = false; // Default to not an employer on error
  }
};

// Check the user role on component mount
onMounted(checkUserRole);
</script>

<template>
  <!-- Conditional Navigation Layout -->
  <component :is="is_employer ? EmployerNavigationLayout : JobNavigationLayout">
    <template #content>
      <SecurityPrivacyLayout />
    </template>
  </component>
</template>
