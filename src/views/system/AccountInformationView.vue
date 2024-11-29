<script setup>
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue';
import { supabase } from '@/utils/supabase.js';
import { ref, onMounted } from 'vue';

// Reactive `account` object to hold user data
const account = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  avatar_url: '', // For profile picture
});

// Function to fetch user data from Supabase
const fetchUserData = async () => {
  try {
    const { data: currentUser, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Error fetching current user:', userError);
      return;
    }

    const { data, error } = await supabase
      .from('users') // Adjust table name if needed
      .select('first_name, last_name, email, phone, avatar_url')
      .eq('id', currentUser.user.id) // Use the logged-in user's ID
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
      return;
    }

    // Populate the `account` object with the fetched data
    account.value = {
      firstName: data.first_name || '',
      lastName: data.last_name || '',
      email: data.email || '',
      phone: data.phone || '',
      avatar_url: data.avatar_url || 'https://via.placeholder.com/150', // Fallback avatar
    };
  } catch (err) {
    console.error('Unexpected error fetching user data:', err);
  }
};

// Fetch user data on component mount
onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <JobNavigationLayout>
    <div class="account-info max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg">
      <h1 class="text-2xl font-bold mb-4">Account Information</h1>

      <!-- Profile Picture -->
      <div class="flex items-center mb-6">
        <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img :src="account.avatar_url" alt="Profile Picture" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Form -->
      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-medium">First Name</label>
          <input v-model="account.first_name" type="text" class="input-field" />
        </div>

        <div>
          <label class="block text-sm font-medium">Last Name</label>
          <input v-model="account.last_name" type="text" class="input-field" />
        </div>

        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="account.email" type="email" class="input-field" disabled />
          <span class="text-green-600 text-sm font-medium">Verified</span>
        </div>

        <div>
          <label class="block text-sm font-medium">Phone Number</label>
          <input v-model="account.phone" type="text" class="input-field" />
          <span class="text-green-600 text-sm font-medium">Verified</span>
        </div>

      </div>
    </div>
  </JobNavigationLayout>
</template>

<style scoped>
/* General Styles */
.account-info {
  font-family: Arial, sans-serif;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
}

.input-field:disabled {
  background-color: #f9f9f9;
  cursor: not-allowed;
}

/* Additional Styles */
.v-list-item:hover {
  background-color: #4caf50;
  color: white;
}
</style>
