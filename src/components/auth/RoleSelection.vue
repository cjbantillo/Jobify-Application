<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'

// Pinia store for auth user
const authStore = useAuthUserStore()

const isEmployer = ref(null)
const router = useRouter()

const checkUserRole = async () => {
  if (authStore.userData.is_employer === true) {
    // If the user is an employer, redirect to the employer dashboard
    router.replace('/employerdashboard')
  } else if (authStore.userData.is_employer === false) {
    // If the user is a job seeker, redirect to the job dashboard
    router.replace('/jobdashboard')
  } else if (authStore.userData.is_employer === null) {
    return
  }
}

const submitRole = async () => {
  const { data: user, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error('Error fetching user:', userError)
    return
  }

  if (user) {
    const { error } = await supabase.auth.updateUser({
      data: { is_employer: isEmployer.value },
    })

    if (error) {
      console.error('Error updating role:', error)
    } else {
      console.log('Role updated successfully')
      // Redirect based on role
      if (isEmployer.value) {
        router.replace('/employerdashboard')
      } else {
        router.replace('/jobdashboard')
      }
    }
  }
}

// Check the user's role on mount
onMounted(() => {
  checkUserRole()
})
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card class="pa-4" max-width="400">
      <v-card-title class="text-h6">Select Your Role</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitRole" ref="roleForm">
          <v-radio-group v-model="isEmployer" row>
            <v-radio label="Employer" :value="true"></v-radio>
            <v-radio label="Job Seeker" :value="false"></v-radio>
          </v-radio-group>
          <v-btn class="mt-4" color="primary" @click="submitRole" type="submit">
            Submit
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
