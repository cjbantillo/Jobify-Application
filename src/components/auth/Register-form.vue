<script setup>

import { confirmedValidator, emailValidator, passwordValidator } from '@/utils/validator';
import { ref } from 'vue'

const visible = ref(false) //toggle variable
const visibleConfirm = ref(false)
const termsAccepted = ref(false) //checkbox toggle
const refVForm = ref() //onFormSubmit
const formDataDefault = { //name,email, pass, confirmPass
  firstname: '',
  lastname: '',
  email: '',
password: '',
confirm_password: '',
}

const formData = ref({
  ...formDataDefault
})

const toggleVisible = () => visible.value = !visible.value //eye icon
const toggleVisibleConfirm = () => visibleConfirm.value = !visibleConfirm.value //eye icon

// submit and register
const onSignup = () =>{
  //alert(formData.value)
  //.email or .password for testing
}
const onFormSubmit = () => {
refVForm.value?.validate().then(({ valid }) => {
if (valid)
onSignup()
})
}
</script>


<template>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row>
      <!-- fullname  -->
      <v-col><v-text-field v-model="formData.firstname" label="Firstname" :rules="[requiredValidator]" bg-color="white"></v-text-field></v-col>
      <v-col><v-text-field v-model="formData.lastname" label="Lastname" :rules="[requiredValidator ]" bg-color="white"></v-text-field></v-col>
    </v-row>
<!-- email -->
    <v-text-field
     v-model="formData.email"
      label="Email"
      prepend-inner-icon="mdi-email"
      :rules="[requiredValidator, emailValidator]"
      bg-color="white"
    ></v-text-field>

    <v-row>
      <v-col>
        <!-- enter password -->
        <v-text-field
        v-model="formData.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          label="Password"
          prepend-inner-icon="mdi-lock-outline"
          @click:append-inner="toggleVisible"
          :rules="[requiredValidator, passwordValidator]"
          bg-color="white"
        ></v-text-field>
      </v-col>
      <v-col>
        <!-- confirming password  -->
        <v-text-field
          :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visibleConfirm ? 'text' : 'password'"
          label="Confirm Password"
          prepend-inner-icon="mdi-lock-outline"
          v-model="formData.confirm_password"
          @click:append-inner="toggleVisibleConfirm"
          :rules="[requiredValidator, confirmedValidator(formData.password, formData,confirmedValidator)]"
          bg-color="white"
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

    <v-row class="button-row ">
              <v-col>
                  <v-btn class="register-button w-100 rounded-pill" depressed type="submit">Register</v-btn>
              </v-col>
           
    </v-row>
    <v-col>
      <h5>already have an account?
                <router-link to="login">
                  click here
                </router-link></h5>
              </v-col>
  </v-form>
</template>
<style>
  .button-row .register-button {
  background-color: #4CAF50; /* Primary green color */
  color: #ffffff;
  font-weight: 100;
  font-size: 0.5rem;
  box-shadow: 0px 4px 10px rgba(76, 175, 80, 0.2); /* Soft shadow */
  transition: all 0.3s ease;
}

.button-row .register-button:hover {
  background-color: #45A049; /* Darker green on hover */
  box-shadow: 0px 6px 12px rgba(76, 175, 80, 0.3); /* More pronounced shadow on hover */
}

.button-row .login-button {
  color: #4CAF50; /* Same primary green for the text */
  border-color: #4CAF50;
  font-weight: 100;
  font-size: 0.5rem;
  transition: all 0.3s ease;
}

.button-row .login-button:hover {
  background-color: #E8F5E9; /* Light green background on hover */
  color: #45A049; /* Slightly darker green for text on hover */
}
</style>
