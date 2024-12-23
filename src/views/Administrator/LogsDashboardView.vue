<script setup>
import { ref, onMounted } from 'vue'
import { supabaseAdmin} from '@/utils/supabase.js'
import UserAdminLayout from '@/components/layout/navigation/UserAdminLayout.vue'


const snackbar = ref({ show: false, message: '', color: '' }) // Snackbar state

const logs = ref([])
const fetchLogs = async () => {
  try {
    const { data, error } = await supabaseAdmin
      .from('view_logs')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(`Error fetching logs: ${error.message}`)
    logs.value = data
  } catch (err) {
    console.error('Error fetching logs:', err.message)
  }
}

onMounted(fetchLogs);
</script>

<template>
  <UserAdminLayout>
    <template #content>
      <v-card class="ma-8 pa-4">
        <h1 class="mb-4">Welcome Admin!</h1>
        <v-container>
          <h2>Activity Log</h2>

          <!-- Table to display logs -->
          <v-table dense>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Action</th>
                <th>Table Name</th>
                <th>Column Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in logs" :key="log.id" >
                <!-- Display created_at formatted as date and time -->
                <td>{{ new Date(log.created_at).toLocaleString() }}</td>

                <!-- Display User Name (assuming there's a 'user_id' field and you fetch user details) -->
                <td>{{ log.user_id }}</td>

                <td>{{ log.full_name || 'Protected By Google'}}</td>

                <!-- Display Action (inserted, updated, deleted) -->
                <td>{{ log.action }}</td>

                <!-- Display Table Name -->
                <td>{{ log.table_name }}</td>

                <!-- Display Column Name (if available) -->
                <td>{{ log.column_name || 'N/A' }}</td>
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
