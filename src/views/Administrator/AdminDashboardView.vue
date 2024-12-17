<script setup>
import { ref, onMounted } from 'vue'
import { supabaseAdmin} from '@/utils/supabase.js'
import UserAdminLayout from '@/components/layout/navigation/UserAdminLayout.vue'

const users = ref([]) // Store users
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
        user.user_metadata?.first_name !== 'admin'
    )
  } catch (err) {
    console.error('Error fetching users:', err.message)
  }
}


// Function to calculate relative time
const calculateRelativeTime = dateString => {
  const now = new Date()
  const jobDate = new Date(dateString)
  const diffInSeconds = Math.floor((now - jobDate) / 1000)

  const minutes = Math.floor(diffInSeconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else {
    return 'Just now'
  }
}

onMounted(() => {
  fetchUsers()
})
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

        <v-container>
  <h2 class="mt-8">Activity Logs</h2>
  <v-table dense>
    <thead>
      <tr>
        <th>User ID</th>
        <th>Action</th>
        <th>Details</th>
        <th>Target ID</th>
        <th>Timestamp</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="log in logs" :key="log.id">
        <td>{{ log.user_id }}</td>
        <td>{{ log.action }}</td>
        <td>{{ log.details }}</td>
        <td>{{ log.target_id }}</td>
        <td>{{ new Date(log.created_at).toLocaleString() }}</td>
      </tr>
    </tbody>
  </v-table>
</v-container>


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
