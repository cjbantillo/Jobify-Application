<script setup>
import {
  confirmedValidator,
  emailValidator,
  passwordValidator,
} from '@/utils/validator'
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { useRouter } from 'vue-router'

// Utilize pre-defined vue functions
const router = useRouter()

const visible = ref(false) //toggle variable
const visibleConfirm = ref(false)
const termsAccepted = ref(false) //checkbox toggle
const refVForm = ref() //onFormSubmit
const formDataDefault = {
  //name,email, pass, confirmPass
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  is_employer: false,
}

const formData = ref({
  ...formDataDefault,
})

// supabase form action
const formAction = ref({
  ...formActionDefault,
})

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true };

  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          first_name: formData.value.first_name,
          last_name: formData.value.last_name,
          is_employer: formData.value.is_employer,
        },
      },
    });

    if (error) {
      console.error("Supabase Error: ", error); // Log detailed error
      formAction.value.formErrorMessage = error.message;
      formAction.value.formStatus = error.status;
    } else if (data) {
      formAction.value.formSuccessMessage = "Account created successfully";
      const dashboardRoute = formData.value.is_employer
        ? "/employerdashboard"
        : "/jobdashboard";
      router.push(dashboardRoute);
    }
  } catch (err) {
    console.error("Unexpected Error: ", err); // Catch unexpected errors
    formAction.value.formErrorMessage = "Unexpected error occurred. Try again.";
  } finally {
    formAction.value.formProcess = false;
    refVForm.value?.reset();
  }
};


const toggleVisible = () => (visible.value = !visible.value) //eye icon
const toggleVisibleConfirm = () =>
  (visibleConfirm.value = !visibleConfirm.value) //eye icon

// submit and register
// Trigger Validators
const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

console.log(formDataDefault)
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row>
      <!-- fullname  -->
      <v-col>
        <v-text-field
          v-model="formData.first_name"
          label="First Name"
          :rules="[requiredValidator]"
          variant="outlined"
          rounded
          density="compact"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="formData.last_name"
          label="Last Name"
          :rules="[requiredValidator]"
          variant="outlined"
          rounded
          density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- email -->
    <v-text-field
      v-model="formData.email"
      label="Email"
      prepend-inner-icon="mdi-email"
      :rules="[requiredValidator, emailValidator]"
      variant="outlined"
      rounded
      density="compact"
    ></v-text-field>
        <!-- enter password -->
        <v-text-field
          v-model="formData.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          label="Password"
          prepend-inner-icon="mdi-lock-outline"
          @click:append-inner="toggleVisible"
          :rules="[requiredValidator, passwordValidator]"
          variant="outlined"
          rounded
          density="compact"
        ></v-text-field>

        <v-text-field
          :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visibleConfirm ? 'text' : 'password'"
          label="Confirm Password"
          prepend-inner-icon="mdi-lock-outline"
          v-model="formData.confirm_password"
          @click:append-inner="toggleVisibleConfirm"
          :rules="[
            requiredValidator,
            confirmedValidator(formData.password, formData.confirm_password),
          ]"
          variant="outlined"
          rounded
          density="compact"
        ></v-text-field>

        <v-radio-group
          v-model="formData.is_employer"
          :rules="[requiredValidator]"
          density="compact"
          justify-center
          align-center
        >
          <v-row>
            <v-radio label="Part Timer" :value="false" ></v-radio>
            <v-radio label="Employer" :value="true"></v-radio>
          </v-row>
        </v-radio-group>

    <v-row class="button-row">
      <v-col>
        <v-btn
          class="register-button w-100 rounded-pill"
          depressed
          type="submit"
          :disabled="formAction.formProcess"
          :loading="formAction.formProcess"
          >Register</v-btn
        >
      </v-col>
    </v-row>
    <!-- checkbox with toggle -->
    <v-checkbox
      v-model="termsAccepted"
      :rules="[v => !!v || 'You must accept the terms and conditions']"
      label="I agree to the terms and conditions"
      color="primary"
    ></v-checkbox>



    <v-col>
      <h5>
        already have an account?
        <router-link class="link" to="login"> click here </router-link>
      </h5>
    </v-col>

          <v-divider class="my-4">Or</v-divider>
            <div class="social-icons d-flex justify-center">
              <v-btn
                prepend-icon="mdi-google"
                class="w-100 ma-10"
              >
              Sign In with Google
              </v-btn>
            </div>
  </v-form>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Matemasie&family=Varela+Round&display=swap');

*,
v-btn {
  font-family: 'Varela Round', sans-serif;
  font-weight: 400;
  font-style: normal;
  text-transform: none;
}
.v-btn{
  border-radius: 20px;
}
.button-row .register-button {
  background-color: #4caf50; /* Primary green color */
  color: #ffffff;
  box-shadow: 0px 4px 10px rgba(76, 175, 80, 0.2); /* Soft shadow */
  transition: all 0.3s ease;
}

.button-row .register-button:hover {
  background-color: #45a049; /* Darker green on hover */
  box-shadow: 0px 6px 12px rgba(76, 175, 80, 0.3); /* More pronounced shadow on hover */
  color: #ffffff;
}

.button-row .login-button {
  color: #4caf50; /* Same primary green for the text */
  border-color: #4caf50;
  font-weight: 100;
  font-size: 0.5rem;
  transition: all 0.3s ease;
}

.button-row .login-button:hover {
  background-color: #e8f5e9; /* Light green background on hover */
  color: #45a049; /* Slightly darker green for text on hover */
}
.link {
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 400;
  color: #6c757d; /* Link color */
}
</style>
