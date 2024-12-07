<script setup>
import EmployerNavigationLayout from '@/components/layout/navigation/EmployerNavigationLayout.vue'
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const companyName = ref('')
const companySocial = ref('')
const companyCategory = ref('')
const companyAddress = ref('')
const loading = ref(false)
const errorMessage = ref('')

const categories = ref([
  "Retail and Wholesale",
  "Supermarkets and Grocery Stores",
  "Convenience Stores",
  "Pharmacies",
  "Hardware and Construction Supplies",
  "Clothing and Apparel",
  "Electronics and Gadgets",
  "Auto Parts and Accessories",
  "Wholesale and Trading Businesses",
  "Food and Beverage",
  "Restaurants",
  "Cafés and Coffee Shops",
  "Fast Food Chains",
  "Food Stalls and Kiosks",
  "Catering Services",
  "Bakeries and Pastry Shops",
  "Bars and Pubs",
  "Health and Wellness",
  "Clinics and Medical Services",
  "Fitness Centers and Gyms",
  "Spas and Wellness Centers",
  "Optical Shops",
  "Dental Clinics",
  "Professional Services",
  "Accounting and Bookkeeping",
  "Legal Services",
  "Marketing and Advertising",
  "IT and Web Development",
  "Real Estate Agencies",
  "Human Resource and Recruitment",
  "Travel and Tour Agencies",
  "Home and Construction",
  "Interior Design Services",
  "Construction Firms",
  "Appliance Repair Services",
  "Furniture Stores",
  "Landscaping Services",
  "Education and Training",
  "Tutorial Centers",
  "Daycares and Preschools",
  "Vocational and Technical Schools",
  "Language Learning Centers",
  "Review Centers",
  "Transportation and Logistics",
  "Public Transportation Operators",
  "Taxi and Ride-hailing Services",
  "Delivery and Courier Services",
  "Freight and Logistics Companies",
  "Vehicle Rentals",
  "Entertainment and Leisure",
  "Event Planning Services",
  "Party Supplies Rentals",
  "Photography and Videography",
  "Resorts and Hotels",
  "Game Zones and Arcades",
  "Agriculture and Farming",
  "Poultry and Livestock",
  "Agricultural Supply Stores",
  "Rice Milling and Grains Trading",
  "Fresh Produce Markets",
  "Technology and Communications",
  "Internet Service Providers",
  "Gadget Repair Shops",
  "Computer Shops",
  "Printing and Photocopying Services",
  "Financial Services",
  "Banks and Lending Institutions",
  "Pawnshops",
  "Money Remittance Services",
  "Insurance Agencies",
  "Investment and Trading Services",
]);

const fetchUserData = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const { data: currentUser, error: userError } =
      await supabase.auth.getUser()
    if (userError || !currentUser?.user?.id) {
      errorMessage.value =
        userError?.message || 'No user is logged in'
      return
    }

    const { data: employerProfile, error: employerError } = await supabase
      .from('employer_profiles')
      .select('*')
      .eq('user_id', currentUser.user.id)
      .single()

    if (employerError) {
      errorMessage.value =
        employerError.message || 'Error fetching employer profile'
      return
    }

    if (employerProfile) {
      companyName.value = employerProfile.company_name
      companySocial.value = employerProfile.company_social
      companyCategory.value = employerProfile.company_category
      companyAddress.value = employerProfile.address
    }
  } catch (err) {
    errorMessage.value = 'Unexpected error occurred'
    console.error('Unexpected error fetching user data:', err)
  } finally {
    loading.value = false
  }
}

const editCompanyData = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const { data: currentUser, error: userError } =
      await supabase.auth.getUser()
    if (userError || !currentUser?.user?.id) {
      errorMessage.value =
        userError?.message || 'No user is logged in'
      return
    }

    const { error: updateError } = await supabase
      .from('employer_profiles')
      .update({
        company_name: companyName.value,
        company_social: companySocial.value,
        company_category: companyCategory.value,
        address: companyAddress.value,
      })
      .eq('user_id', currentUser.user.id)

    if (updateError) {
      errorMessage.value =
        updateError.message || 'Error updating employer profile'
      return
    }

    console.log('Company data updated successfully!')
    // Optionally fetch the updated data
    await fetchUserData()
  } catch (err) {
    errorMessage.value = 'Unexpected error occurred while updating data'
    console.error('Unexpected error updating company data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchUserData()
})
</script>
<template>
  <EmployerNavigationLayout>
    <template #content>
      <v-app class="d-flex fill-height">
        <v-main class="pt-8">
          <v-container>
            <div v-if="loading">Loading...</div>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <v-card outlined class="py-8 cont" height="fill">
              <div v-if="!loading && !errorMessage">
                <v-card-title class="title text-h5 ma-5">
                  Business Information
                </v-card-title>
                <v-row>
                  <v-col class="ma-auto" cols="10">
                    <div cols="10">
                      <v-row>
                        <v-col cols="5" class="ma-auto">
                          <v-text-field
                            v-model="companyName"
                            label="Company Name"
                            prepend-inner-icon="mdi-briefcase"
                            class="modern-input"
                            variant="outlined"
                            rounded
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="5" class="ma-auto">
                          <v-text-field
                            v-model="companySocial"
                            label="Company Social"
                            prepend-inner-icon="mdi-facebook"
                            class="modern-input"
                            variant="outlined"
                            rounded
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="5" class="ma-auto">
                          <v-select
                            :items="categories"
                            v-model="companyCategory"
                            label="Company Category"
                            prepend-inner-icon="mdi-shape-plus"
                            class="modern-input"
                            variant="outlined"
                            rounded
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="5" class="ma-auto">
                          <v-text-field
                            v-model="companyAddress"
                            label="Company Address"
                            prepend-inner-icon="mdi-earth"
                            class="modern-input"
                            variant="outlined"
                            rounded
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="ma-auto text-center">
                          <v-btn
                            color="primary"
                            @click="editCompanyData"
                            :loading="loading"
                            :disabled="loading"
                          >
                            Save Changes
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-container>
        </v-main>
      </v-app>
    </template>
  </EmployerNavigationLayout>
</template>

<style scoped src="@/views/system/style/EmployerInformationViewStyle.css"></style>
