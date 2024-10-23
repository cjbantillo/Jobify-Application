<template>
  <v-form fast-fail @submit.prevent>
    <v-row>
      <v-col>
        <v-text-field label="Firstname" variant="outlined"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="Lastname" variant="outlined"></v-text-field>
      </v-col>
    </v-row>

    <v-text-field label="Email" variant="outlined"></v-text-field>

    <!-- Password Field with Eye Icon Inside -->
    <v-text-field
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      variant="outlined"
    >
      <template #append-inner>
        <v-icon @click="togglePasswordVisibility" class="cursor-pointer">
          {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
        </v-icon>
      </template>
    </v-text-field>

    <!-- Confirm Password Field with Eye Icon Inside -->
    <v-text-field
      v-model="confirmPassword"
      :type="showConfirmPassword ? 'text' : 'password'"
      label="Confirm Password"
      variant="outlined"
    >
      <template #append-inner>
        <v-icon @click="toggleConfirmPasswordVisibility" class="cursor-pointer">
          {{ showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye' }}
        </v-icon>
      </template>
    </v-text-field>
 <!-- terms and conditions -->
 <v-checkbox
      v-model="termsAccepted"
      :rules="[v => !!v || 'You must accept the terms and conditions']"
      label="I agree to the terms and conditions"
      color="primary"
    ></v-checkbox>
    <!-- terms end -->
     
    <!-- Submit Button -->
    <v-btn
      class="mt-2 bg-primary"
      type="submit"
      block
      prepend-icon="mdi-account-plus"
    >
      Sign up
    </v-btn>
   
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      termsAccepted: false, // Checkbox value
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
  },
  submitForm() {
      if (this.termsAccepted) {
        // Handle form submission logic
        alert('Form submitted!');
      }
    },
  };

</script>
