<script setup>
  import { ref } from 'vue'

  const visible = ref(false)
  const toggleVisible = () => visible.value = !visible.value
</script>

<template>
    <v-form fast-fail @submit.prevent>
                <v-text-field label="Email" variant="outlined"    prepend-inner-icon="mdi-email"></v-text-field>

                <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="toggleVisible"
        ></v-text-field>

                <v-btn class="mt-2 bg-primary" type="submit" block prepend-icon="mdi-login">Login</v-btn>
              </v-form>
</template>