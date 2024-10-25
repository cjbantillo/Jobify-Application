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
      <v-col><v-text-field v-model="formData.firstname" label="Firstname" variant="outlined" :rules="[requiredValidator]" ></v-text-field></v-col>
      <v-col><v-text-field v-model="formData.lastname" label="Lastname" variant="outlined" :rules="[requiredValidator ]" ></v-text-field></v-col>
    </v-row>
<!-- email -->
    <v-text-field
     v-model="formData.email"
      label="Email"
      variant="outlined"
      prepend-inner-icon="mdi-email"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-row>
      <v-col>
        <!-- enter password -->
        <v-text-field
        v-model="formData.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="toggleVisible"
          :rules="[requiredValidator, passwordValidator]"
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
          v-model="formData.confirm_password"
          @click:append-inner="toggleVisibleConfirm"
          :rules="[requiredValidator, confirmedValidator(formData.password, formData,confirmedValidator)]"
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

