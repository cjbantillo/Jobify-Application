<script setup>
import TalentNavigationLayout from '@/components/layout/navigation/TalentNavigationLayout.vue';
</script>

<template>
  <TalentNavigationLayout>
    <template #content>
      <v-container>
        <v-row class="mt-4">
          <!-- Candidate Profile Card -->
          <v-col cols="12" md="6" xl="4" class="pb-6">
            <v-card class="pa-6 hover-card">
              <v-card-title class="title">
                <v-avatar size="40" class="mr-3">
                  <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="John D.">
                </v-avatar>
                <div>
                  <h3 class="name">John D.</h3>
                </div>
              </v-card-title>
              <v-card-text>
                <h4>Bachelor of Science in Information Technology | 3rd Year</h4>
                <p>P-9 Los Angeles, Butuan City</p>
                <p>Email: johnd@example.com</p>
                <p>Status: <span class="status available">Available</span></p>
              </v-card-text>
              <v-card-actions>
                <v-btn class="view-button">
                  <v-icon left>mdi-download</v-icon>
                  Resume
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <!-- Repeat for other profiles -->
          <v-col cols="12" md="6" xl="4" class="pb-6">
            <v-card class="pa-6 hover-card">
              <v-card-title class="title">
                <v-avatar size="40" class="mr-3">
                  <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="John D.">
                </v-avatar>
                <div>
                  <h3 class="name">John D.</h3>
                </div>
              </v-card-title>
              <v-card-text>
                <h4>Bachelor of Science in Information Technology | 3rd Year</h4>
                <p>P-9 Los Angeles, Butuan City</p>
                <p>Email: johnd@example.com</p>
                <p>Status: <span class="status available">Available</span></p>
              </v-card-text>
              <v-card-actions>
                <v-btn class="view-button">
                  <v-icon left>mdi-download</v-icon>
                  Resume
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <!-- Adding two more profile cards -->
          <v-col cols="12" md="6" xl="4" class="pb-6">
            <v-card class="pa-6 hover-card">
              <v-card-title class="title">
                <v-avatar size="40" class="mr-3">
                  <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="John D.">
                </v-avatar>
                <div>
                  <h3 class="name">John D.</h3>
                </div>
              </v-card-title>
              <v-card-text>
                <h4>Bachelor of Science in Information Technology | 3rd Year</h4>
                <p>P-9 Los Angeles, Butuan City</p>
                <p>Email: johnd@example.com</p>
                <p>Status: <span class="status available">Available</span></p>
              </v-card-text>
              <v-card-actions>
                <v-btn class="view-button">
                  <v-icon left>mdi-download</v-icon>
                  Resume
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" xl="4" class="pb-6">
            <v-card class="pa-6 hover-card">
              <v-card-title class="title">
                <v-avatar size="40" class="mr-3">
                  <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="John D.">
                </v-avatar>
                <div>
                  <h3 class="name">John D.</h3>
                </div>
              </v-card-title>
              <v-card-text>
                <h4>Bachelor of Science in Information Technology | 3rd Year</h4>
                <p>P-9 Los Angeles, Butuan City</p>
                <p>Email: johnd@example.com</p>
                <p>Status: <span class="status available">Available</span></p>
              </v-card-text>
              <v-card-actions>
                <v-btn class="view-button">
                  <v-icon left>mdi-download</v-icon>
                  Resume
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </TalentNavigationLayout>
</template>

<style scoped>
.hover-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;
  background-color: #fafbfa;
}
.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
}
.title {
  font-size: 1.25rem; /* Larger font for the title */
  font-weight: bold;
  display: flex;
  align-items: center;
}
.status {
  font-weight: bold;
}
.status.available {
  color: green;
}
.view-button {
  background-color: #4caf50;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
}
.view-button:hover {
  background-color: #3b633d;
}
.material-icons {
  vertical-align: middle;
}
</style>
