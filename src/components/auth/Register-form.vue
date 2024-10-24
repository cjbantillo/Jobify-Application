<script setup>
import { ref } from 'vue'

const visible = ref(false) //toggle variable
const visibleConfirm = ref(false)
const termsAccepted = ref(false) //checkbox toggle

const toggleVisible = () => visible.value = !visible.value
const toggleVisibleConfirm = () => visibleConfirm.value = !visibleConfirm.value
const submitForm = () => {
  if (termsAccepted.value) {
    alert('Form submitted!');
  } else {
    alert('Please accept the terms and conditions.');
  }
}
</script>


<template>
  <v-form @submit.prevent="submitForm">
    <v-row>
      <!-- fullname  -->
      <v-col><v-text-field label="Firstname" variant="outlined"></v-text-field></v-col>
      <v-col><v-text-field label="Lastname" variant="outlined"></v-text-field></v-col>
    </v-row>
<!-- email -->
    <v-text-field
      label="Email"
      variant="outlined"
      prepend-inner-icon="mdi-email"
      v-model="email"
    ></v-text-field>

    <v-row>
      <v-col>
        <!-- enter password -->
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="toggleVisible"
        ></v-text-field>
      </v-col>
      <v-col>
        <!-- confirming password  -->
        <v-text-field
          :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visibleConfirm ? 'text' : 'password'"
          placeholder="Confirm password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="toggleVisibleConfirm"
        ></v-text-field>
      </v-col>
    </v-row>
<!-- checkbox with toggle -->
    <v-checkbox
      v-model="termsAccepted"
      :rules="[v => !!v || 'You must accept the terms and conditions']"
      label="I agree to the terms and conditions"
      color="primary"
    ></v-checkbox>

    <v-btn class="mt-2 bg-primary" type="submit" block prepend-icon="mdi-account-plus">
      Sign up
    </v-btn>
  </v-form>
</template>

