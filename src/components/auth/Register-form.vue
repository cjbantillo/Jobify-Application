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

const isGoogleSignIn = ref(false);

// Dialog visibility state
const dialogVisible = ref(false);

// Form data for user type
const isEmployer = ref(false);

// Function to show the employer confirmation dialog
const openDialog = (googleSignIn = false) => {
  isGoogleSignIn.value = googleSignIn; // Set isGoogleSignIn based on the function argument
  dialogVisible.value = true; // Open the dialog
};

// Function to set the user type and proceed to Google OAuth
const setUserType = (isEmployerSelected) => {
  isEmployer.value = isEmployerSelected;
  dialogVisible.value = false; // Close the dialog

  if(isGoogleSignIn.value){
    handleGoogleSignIn();
  }else{
    onFormSubmit();
  }
  // Proceed to Google OAuth

};

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
          is_employer: isEmployer.value,
        },
      },
    });

    if (error) {
      console.error("Supabase Error: ", error); // Log detailed error
      formAction.value.formErrorMessage = error.message;
      formAction.value.formStatus = error.status;
    } else if (data) {
      formAction.value.formSuccessMessage = "Account created successfully";
      const dashboardRoute = isEmployer.value
        ? "/employerdashboard"
        : "/jobdashboard";
      router.replace(dashboardRoute);
    }
  } catch (err) {
    console.error("Unexpected Error: ", err); // Catch unexpected errors
    formAction.value.formErrorMessage = "Unexpected error occurred. Try again.";
  } finally {
    formAction.value.formProcess = false;
    refVForm.value?.reset();
  }
};

// Handle Google Sign-In
const handleGoogleSignIn = async () => {
  try {
    // Set user metadata before sign-in
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        data: {
          is_employer: isEmployer.value, // Set user type based on dialog selection
        },
      },
    });

    if (error) {
      console.error('Google Sign-In Error:', error.message);
      alert('Google Sign-In failed. Please try again.');
    } else if (data) {
      // Redirect based on user type
      const redirectRoute = isEmployer.value
        ? '/employerdashboard'
        : '/jobdashboard';
      router.replace(redirectRoute);
    }
  } catch (err) {
    console.error('Unexpected Error during Google Sign-In:', err);
    alert('Unexpected error occurred. Please try again.');
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

//console.log(formDataDefault)
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

          <!-- Employer confirmation popup -->
        <v-dialog v-model="dialogVisible" max-width="400px" >
          <v-card>
            <v-card-title class="headline">Are you an Employer?</v-card-title>
            <v-card-text>
              <p>Do you want to register as an employer or a part-timer?</p>
            </v-card-text>
            <v-card-actions>
              <v-btn class="register-button" @click="setUserType(false)">Part-Timer</v-btn>
              <v-btn class="register-button" @click="setUserType(true)">Employer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    <v-row class="button-row">
      <v-col>
        <v-btn
          class="register-button w-100 rounded-pill"
          depressed
          @click="openDialog(false)"
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

  </v-form>

  <v-divider class="my-4">Or</v-divider>
            <div class="social-icons d-flex justify-center">
              <v-btn
                prepend-icon="mdi-google"
                class="w-100 ma-10"
                @click="openDialog(true)"
              >
              Sign In with Google
              </v-btn>
            </div>
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
