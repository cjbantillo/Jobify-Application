<script setup>
import { ref } from 'vue';
import AppLayout from '@/components/layout/AppLayout.vue';

// Reactive variables for controlling drawer and rail
const drawer = ref(true);
const rail = ref(false); // Start with rail collapsed by default
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row no-gutters>
          <!-- Navigation Drawer -->
          <v-navigation-drawer
            v-model="drawer"
            :rail="rail"
            permanent
            app
            expand-on-hover
            class="pa-4"
            width="300"
          >
            <!-- User Profile Section -->
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
              title="John Leider"
              nav
            >
              <template v-slot:append>
                <!-- Toggle Rail Button -->
                <v-btn
                  icon="mdi-chevron-left"
                  variant="text"
                  @click.stop="rail = !rail"
                ></v-btn>
              </template>
            </v-list-item>

            <v-divider></v-divider>

            <!-- Navigation Links -->
            <v-list dense nav>
              <v-list-item
                prepend-icon="mdi-home-city"
                title="Home"
                value="home"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-account"
                title="My Account"
                value="account"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-account-group-outline"
                title="Users"
                value="users"
              ></v-list-item>
            </v-list>
          </v-navigation-drawer>

          <!-- Main Content Area -->
          <v-main>
            <v-container>
              <!-- Dashboard Cards -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-card outlined>
                    <v-card-title>Dashboard Widget 1</v-card-title>
                    <v-card-text>
                      <!-- Widget Content Here -->
                      Overview, Stats, etc.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card outlined>
                    <v-card-title>Dashboard Widget 2</v-card-title>
                    <v-card-text>
                      <!-- Widget Content Here -->
                      Charts, Reports, etc.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card outlined>
                    <v-card-title>Dashboard Widget 3</v-card-title>
                    <v-card-text>
                      <!-- Widget Content Here -->
                      Quick Links, Updates, etc.
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Full Width Section or Chart -->
              <v-row>
                <v-col cols="12">
                  <v-card outlined>
                    <v-card-title>Detailed Reports</v-card-title>
                    <v-card-text>
                      <!-- Placeholder for chart or report -->
                      <div style="height: 250px; background-color: #f5f5f5">
                        Placeholder for large chart or report
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-main>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
/* Custom Styles for Better Visuals */
.v-navigation-drawer {
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
}

.v-navigation-drawer .v-list-item {
  margin-bottom: 8px;
}

.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Ensure proper padding in content area */
.v-main {
  padding-top: 16px;
}

.v-row {
  margin-bottom: 16px;
}

/* Mobile Responsiveness: Reduce card margin on small screens */
@media (max-width: 600px) {
  .v-col {
    padding-left: 0;
    padding-right: 0;
  }

  .v-navigation-drawer {
    width: 200px;
  }
}

/* Add some spacing between card titles and content */
.v-card-title {
  padding-bottom: 8px;
}

.v-card-text {
  font-size: 14px;
}
</style>
