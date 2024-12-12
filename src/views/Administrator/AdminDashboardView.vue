<script setup>
import { ref, onMounted } from 'vue';
import { supabase, supabaseAdmin } from '@/utils/supabase.js';


import UserAdminLayout from '@/components/layout/navigation/UserAdminLayout.vue';
import AdminLogin from '@/components/admin/AdminLogin.vue';

const currentUser = ref(null);
//const newUser = ref({ email: '', password: '' });
//const editedUser = ref(null);

const users = ref([])

// Check for current user session
const checkUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error fetching session:', error.message);
  }
  currentUser.value = data.session?.user || null;
};

// Fetch all users
const fetchUsers = async () => {
  try {
    const { data: { users: fetchedUsers }, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
    users.value = fetchedUsers; // Update the `users` array
    console.log(users.value);
  } catch (err) {
    console.error('Error fetching users:', err.message);
  }
};


/*
// Add a new user
 const addUser = async () => {
   try {
     const { error } = await supabase.auth.signUp({
       email: newUser.value.email,
       password: newUser.value.password,
     });
     if (error) throw error;
     newUser.value = { email: '', password: '' };
     fetchUsers();
     alert('User added successfully!');
   } catch (error) {
     console.error('Error adding user:', error.message);
   }
 };

// Edit a user
const editUser = (user) => {
  editedUser.value = { ...user }; // Copy user details to the form
};*/

// Update a user
/*const updateUser = async () => {
  try {
    const { error } = await supabase.auth.admin.updateUserById()
      .update({ ...editedUser.value })
    if (error) throw error;
    editedUser.value = null;
    fetchUsers();
    alert('User updated successfully!');
  } catch (error) {
    console.error('Error updating user:', error.message);
  }
};*/



// Delete a user
const deleteUser = async (id) => {
  if (!confirm('Are you sure you want to delete this user?')) return;
  try {
    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) throw error;
    fetchUsers();
    alert('User deleted successfully!');
  } catch (error) {
    console.error('Error deleting user:', error.message);
  }
};

// Run on mount
onMounted(() => {
  checkUserSession();
  fetchUsers();
});
</script>
<template>
  <div>
    <!-- Show AdminLogin if no user is logged in -->
    <AdminLogin v-if="!currentUser" />

    <!-- App content for logged-in users -->
    <div v-else>
      <UserAdminLayout>
        <template #content>
        <h1 class="mb-4">Welcome Back, Admin!</h1>
        <v-container>
          <h2>User Management</h2>

          <!-- Add User Form
          <v-form @submit.prevent="addUser" class="mb-4">
            <v-text-field
              v-model="newUser.email"
              label="Email"
              required
              class="mb-2"
            ></v-text-field>
            <v-text-field
              v-model="newUser.password"
              label="Password"
              type="password"
              required
              class="mb-2"
            ></v-text-field>
            <v-btn type="submit" color="success">Add User</v-btn>
          </v-form>-->

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
                  <v-btn color="blue" small @click="editUser(user)">Edit</v-btn>
                  <v-btn color="red" small @click="deleteUser(user.id)">Delete</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>

          <!-- Edit User Form
          <div v-if="editedUser">
            <h3>Edit User</h3>
            <v-form @submit.prevent="updateUser">
              <v-text-field
                v-model="editedUser.email"
                label="Email"
                required
                class="mb-2"
              ></v-text-field>
              <v-btn type="submit" color="primary">Update User</v-btn>
              <v-btn color="grey" @click="() => (editedUser = null)">Cancel</v-btn>
            </v-form>
          </div>-->
        </v-container>
      </template>
      </UserAdminLayout>
    </div>
  </div>
</template>
