<script setup>
import { emailValidator, requiredValidator } from '@/utils/validator'
import { ref } from 'vue'

const visible = ref(false)
const toggleVisible = () => (visible.value = !visible.value)

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
      variant="outlined"
      prepend-inner-icon="mdi-email"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field
    v-model="formData.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="toggleVisible"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-btn class="mt-2 bg-primary" type="submit" block prepend-icon="mdi-login"
      >Login</v-btn
    >
  </v-form>
</template>
