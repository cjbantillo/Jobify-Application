<script setup>
import JobNavigationLayout from "@/components/layout/navigation/JobNavigationLAyout.vue";
import { onMounted } from "vue";
import { useAuthUserStore } from "@/stores/authUser";
import { supabase } from "@/utils/supabase.js";
import { getAvatarText } from "@/utils/helpers";

const authStore = useAuthUserStore();

const fetchUserData = async () => {
  try {
    const { data: currentUser, error: userError } = await supabase.auth.getUser();
    if (userError || !currentUser?.user?.id) {
      console.error("Error fetching current user:", userError || "No user logged in");
      return;
    }
  } catch (err) {
    console.error("Unexpected error fetching user data:", err);
  }
};

onMounted(fetchUserData);
</script>

<template>
  <JobNavigationLayout>
    <template #content>
      <v-app class="d-flex fill-height">
        <v-main class="pt-8">
          <v-container>
            <!-- Account Information Card -->
            <v-card class="pa-6 hover-card" height="700px">
              <v-card-title class="title">Account Information</v-card-title>
              <div class="user-info flex">
                <!-- User Avatar -->
                <v-avatar
                  v-if="authStore.userData.image_url"
                  :image="authStore.userData.image_url"
                  color="#4caf50"
                  size="120"
                ></v-avatar>
                <v-avatar v-else color="#4caf50" size="120">
                  <span>
                    {{
                      getAvatarText(
                        authStore.userData.first_name + ' ' + authStore.userData.last_name,
                      )
                    }}
                  </span>
                </v-avatar>

                <!-- User Details Section -->
                <div class="user-details ml-4">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="authStore.userData.first_name"
                        label="First Name"
                        prepend-inner-icon="mdi-account"
                        class="modern-input"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="authStore.userData.last_name"
                        label="Last Name"
                        prepend-inner-icon="mdi-account"
                        class="modern-input"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="authStore.userData.email"
                        label="Email"
                        readonly
                        prepend-inner-icon="mdi-email"
                        class="modern-input"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="authStore.userData.phone"
                        label="Phone Number"
                        prepend-inner-icon="mdi-phone"
                        class="modern-input"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="authStore.userData.date_of_birth"
                        label="Date of Birth"
                        prepend-inner-icon="mdi-calendar"
                        class="modern-input"
                        variant="outlined"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="authStore.userData.addres"
                        :items="authStore.userData.address"
                        label="Address"
                        prepend-inner-icon="mdi-earth"
                        class="modern-input"
                        variant="outlined"
                      ></v-select>
                    </v-col>
                  </v-row>
                </div>
              </div>

              <!-- Bio Section -->
              <v-textarea
                v-model="authStore.userData.bio"
                label="Bio"
                rows="4"
                class="mt-6"
                variant="outlined"
              ></v-textarea>
            </v-card>
          </v-container>
        </v-main>
      </v-app>
    </template>
  </JobNavigationLayout>
</template>

<style scoped>
/* General avatar styling */
.v-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 16px;
}

/* Avatar fallback text style */
.v-avatar span {
  font-size: 60px;
  font-weight: bold;
  color: white;
}

/* Layout for the user info section */
.user-info {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.user-details {
  margin-left: 20px;
  width: 100%;
}

.title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
}

.hover-card {
  transition: transform 0.2s, box-shadow 0.3s;
  background-color: #fafbfa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modern-input .v-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #fafbfa;
  background-color: #fafbfa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modern-input .v-input__control {
  font-size: 1rem;
  font-weight: 400;
  color: #fafbfa;
}

.modern-input .v-input__icon--prepend,
.modern-input .v-input__icon--append {
  color: #fafbfa;
  opacity: 0.8;
}

.modern-input .v-field__input {
  padding-top: 1rem;
}

.modern-input .v-input--is-dirty .v-label {
  color: #fafbfa;
}
.modern-input{
  background: #fafbfa;
}

</style>
