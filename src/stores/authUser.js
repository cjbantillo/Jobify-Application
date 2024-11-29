<<<<<<< HEAD
import { computed, ref } from 'vue'
=======
import { ref } from 'vue'
>>>>>>> 03f741c8566eaa163699614422f45d0f1e099eb8
import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useAuthUserStore = defineStore('authUser', () => {
  // States
  const userData = ref(null)
  const authPages = ref([])

<<<<<<< HEAD
  // Getters
  // Computed Properties; Use for getting the state but not modifying its reactive state
  const userRole = computed(() => {
    return userData.value?.is_admin ? 'Super Administrator' : userData.value.user_role
  })

=======
>>>>>>> 03f741c8566eaa163699614422f45d0f1e099eb8
  // Reset State Action
  function $reset() {
    userData.value = null
    authPages.value = null
  }

  // Actions
  // Retrieve User Session if Logged
  async function isAuthenticated() {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Error getting session:', error.message)
      return false
    }

    if (data.session) {
      const { id, email, user_metadata } = data.session.user
      userData.value = { id, email, ...user_metadata }
    }

    return !!data.session
  }

  // Retrieve User Information
  async function getUserInformation() {
    const {
      data: {
        // Retrieve Id, Email and Metadata thru Destructuring
        user: { id, email, user_metadata },
      },
    } = await supabase.auth.getUser()

    // Set the retrieved information to state
    userData.value = { id, email, ...user_metadata }
  }

  // new change
  // Update User Profile Image
  async function updateUserImage(file) {
    // Get the file extension from the uploaded file
    // const fileExtension = file.name.split('.').pop()

    // Upload the file with the user ID and file extension
    const { data, error } = await supabase.storage
      .from('Jobify')
      .upload('avatars/' + userData.value.id + '-avatar.png', file, {
        cacheControl: '3600',
        upsert: true
      })

    // Check if it has error
    if (error) {
      return { error }
    }
    // If no error set data to userData state with the image_url
    else if (data) {
      // Retrieve Image Public Url
      const { data: imageData } = supabase.storage.from('Jobify').getPublicUrl(data.path)

      // Update the user information with the new image_url
      return await this.updateUserInformation({ ...userData.value, image_url: imageData.publicUrl })
    }
  }

  return {
    userData,
<<<<<<< HEAD
    userRole,
=======
>>>>>>> 03f741c8566eaa163699614422f45d0f1e099eb8
    authPages,
    $reset,
    isAuthenticated,
    getUserInformation,
<<<<<<< HEAD
    getAuthPages,
    updateUserInformation,
=======
>>>>>>> 03f741c8566eaa163699614422f45d0f1e099eb8
    updateUserImage
  }
})
