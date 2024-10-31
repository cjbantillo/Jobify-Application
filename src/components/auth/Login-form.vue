<script setup>
import { emailValidator, requiredValidator } from '@/utils/validator'
import { ref } from 'vue'

const visible = ref(false)
const refVForm = ref() //onFormSubmit

const formDataDefault = { //email, pass
email: '',
password: '',
}

const formData = ref({
  ...formDataDefault
})

const onLogin = () =>{
  //alert(formData.value)
  //.email or .password for testing
}
const onFormSubmit = () => {
refVForm.value?.validate().then(({ valid }) => {
if (valid)
onLogin()
})
}
</script>

<template>
  <v-form  ref="refVForm" fast-fail @submit.prevent="onFormSubmit">
    <v-text-field
    v-model="formData.email"
      label="Email"
      prepend-inner-icon="mdi-email"
      :rules="[requiredValidator, emailValidator]"
      class="modern-input"
    ></v-text-field>

    <v-text-field
    v-model="formData.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      label="Password"
      prepend-inner-icon="mdi-lock-outline"
      :rules="[requiredValidator]"
      class="modern-input"
    ></v-text-field>

    <v-row class="mt-2">
      <v-col cols="6">
        <v-checkbox label="Remember Me" class="small-checkbox"></v-checkbox>
      </v-col>
      <v-col cols="6" class="text-right ">
        <router-link to="/forgot-password" class="link text-muted">Forgot Password?</router-link>
      </v-col>
    </v-row>

    <v-row class="button-row mt-4">
              <v-col>
                <v-btn class="login-button w-100 rounded-pill" depressed type="submit">Login Now</v-btn>
              </v-col>
              <v-col>
                <v-btn class="register-button w-100 rounded-pill" outlined>Register</v-btn>
              </v-col>
    </v-row>
  </v-form>

</template>

<style scoped>

.small-checkbox .v-label{
  font-size: 0.85rem;
  font-weight: 400;
  color: #6c757d;
}
.small-checkbox .v-input--selection-controls__input{
  transform: scale(0.8);
}
.link{
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 400;
  color: #6c757d;
}
.modern-input .v-label {
  font-size: 0.9rem;       /* Smaller font for modern feel */
  font-weight: 500;        /* Medium weight for a sleek look */
  color: #6c757d;          /* Soft gray color */
  text-transform: uppercase;
  letter-spacing: 0.5px;   /* Adds a bit of space for modern style */
}

.modern-input .v-input__control {
  font-size: 1rem;         /* Standard font size for input text */
  font-weight: 400;
  color: #333;             /* Darker color for input text */
}

.modern-input .v-input__icon--prepend,
.modern-input .v-input__icon--append {
  color: #2c3e50;          /* Primary color for icons */
  opacity: 0.8;            /* Slight opacity for subtle effect */
}

.modern-input .v-field__input {
  padding-top: 1rem;       /* Extra space for a clean look */
}

.modern-input .v-input--is-dirty .v-label {
  color: #2c3e50;          /* Primary color when the input is active */
}
.button-row .login-button {
  background-color: #4CAF50; /* Primary green color */
  color: #ffffff;
  font-weight: 100;
  font-size: 0.5rem;
  box-shadow: 0px 4px 10px rgba(76, 175, 80, 0.2); /* Soft shadow */
  transition: all 0.3s ease;
}

.button-row .login-button:hover {
  background-color: #45A049; /* Darker green on hover */
  box-shadow: 0px 6px 12px rgba(76, 175, 80, 0.3); /* More pronounced shadow on hover */
}

.button-row .register-button {
  color: #4CAF50; /* Same primary green for the text */
  border-color: #4CAF50;
  font-weight: 100;
  font-size: 0.5rem;
  transition: all 0.3s ease;
}

.button-row .register-button:hover {
  background-color: #E8F5E9; /* Light green background on hover */
  color: #45A049; /* Slightly darker green for text on hover */
}
</style>
