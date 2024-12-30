<script setup>
import { ref, onMounted } from 'vue'
import { supabaseAdmin, supabase } from '@/utils/supabase.js'
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

const logActivity = async (action, details, targetId) => {
  try {
    const { error } = await supabase.from('logs').insert([
      {
        user_id: supabaseAdmin.auth.session()?.user?.id, // The admin performing the action
        action: action,
        details: details,
        target_id: targetId, // The user being deleted
      },
    ])
    if (error) throw new Error(`Error logging activity: ${error.message}`)
  } catch (err) {
    console.error('Logging error:', err.message)
  }
}

const deleteUser = async () => {
  try {
    const userId = userToDelete.value.id
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
    if (error) throw new Error(`Error deleting user: ${error.message}`)

    // Log the delete action
    await logActivity(
      'DELETE',
      `Deleted user with email: ${userToDelete.value.email}`,
      userId,
    )

    fetchUsers() // Refresh user list
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

const logs = ref([])

const fetchLogs = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('logs')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(`Error fetching logs: ${error.message}`)
    logs.value = data
  } catch (err) {
    console.error('Error fetching logs:', err.message)
  }
}

// Fetch logs on mounted
onMounted(() => {
  fetchUsers()
  fetchLogs()
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

        <!-- Snackbar for Success/Failure -->
        <v-snackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          timeout="3000"
        >
          {{ snackbar.message }}
        </v-snackbar>
      </v-card>

      <!-- //activity logs -->
      <v-card class="ma-8 pa-4">
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
      </v-card>
    </template>
  </UserAdminLayout>
</template>
