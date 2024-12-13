<script setup>
import { ref, onMounted } from 'vue'
import { supabaseAdmin } from '@/utils/supabase.js'
import UserAdminLayout from '@/components/layout/navigation/UserAdminLayout.vue'

const users = ref([]) // Store users
const showDeletePopup = ref(false) // State for delete confirmation popup
const userToDelete = ref(null) // User to delete
const snackbar = ref({ show: false, message: '', color: '' }) // Snackbar state

// Fetch all users
const fetchUsers = async () => {
  try {
    const {
      data: { users: fetchedUsers },
      error,
    } = await supabaseAdmin.auth.admin.listUsers()
    if (error) {
      throw new Error(`Error fetching users: ${error.message}`)
    }
    users.value = fetchedUsers.filter(
      user =>
        user.user_metadata?.is_super_admin === false ||
        user.user_metadata?.is_super_admin == null,
    )
  } catch (err) {
    console.error('Error fetching users:', err.message)
  }
}

// Open delete confirmation popup
const confirmDeleteUser = user => {
  userToDelete.value = user
  showDeletePopup.value = true
}

// Delete a user
const deleteUser = async () => {
  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(
      userToDelete.value.id,
    )
    if (error) throw new Error(`Error deleting user: ${error.message}`)
    fetchUsers() // Refresh the user list
    snackbar.value = {
      show: true,
      message: 'User deleted successfully!',
      color: 'green',
    }
  } catch (error) {
    console.error('Error deleting user:', error.message)
    snackbar.value = {
      show: true,
      message: `Failed to delete user: ${error.message}`,
      color: 'red',
    }
  } finally {
    showDeletePopup.value = false
    userToDelete.value = null
  }
}

// Run on mount
onMounted(fetchUsers)
</script>

<template>
  <UserAdminLayout>
    <template #content>
      <v-card class="ma-8 pa-4">
        <h1 class="mb-4">Welcome Back, Admin!</h1>
        <v-container>
          <h2>User Management</h2>

          <!-- User List -->
          <v-table dense>
            <thead>
              <tr>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.email }}</td>
                <td>
                  <v-btn color="red" small @click="confirmDeleteUser(user)"
                    >Delete</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-container>

        <!-- Delete Confirmation Popup -->
        <v-dialog v-model="showDeletePopup" max-width="400px">
          <v-card>
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>
              Are you sure you want to delete the user
              <strong>{{ userToDelete?.email }}</strong
              >?
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" @click="deleteUser">Delete</v-btn>
              <v-btn color="grey" @click="() => (showDeletePopup = false)"
                >Cancel</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Snackbar for Success/Failure -->
        <v-snackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          timeout="3000"
        >
          {{ snackbar.message }}
        </v-snackbar>
      </v-card>
    </template>
  </UserAdminLayout>
</template>
