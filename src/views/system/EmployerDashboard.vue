<script setup>
import JobNavigationLayout from '@/components/layout/navigation/JobNavigationLAyout.vue'
import { ref, onMounted } from 'vue';
import { supabase } from '@/utils/supabase'

const showPopup = ref(false);
const profileForm = ref({
  company_name: "",
  company_social: "",
  company_category: "",
});

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
  "Investment and Trading Services"
]);

const fetchEmployerProfile = async () => {
  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("employer_profiles")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  if (error || !data) {
    showPopup.value = true; // Show the popup if no profile exists
  }
};

const createEmployerProfile = async () => {
  const { data: user } = await supabase.auth.getUser();
  const { error } = await supabase.from("employer_profiles").insert([
    {
      ...profileForm.value,
      user_id: user?.id,
    },
  ]);

  if (!error) {
    showPopup.value = false; // Close popup on success
  } else {
    console.error(error);
  }
};

onMounted(fetchEmployerProfile);

</script>

<template>
  <JobNavigationLayout>
    <template #content>
      <v-dialog v-model="showPopup" persistent max-width="500">
        <v-card>
          <v-card-title class="pa-8">Create Employer Profile</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createEmployerProfile" ref="form">
              <v-text-field
                v-model="profileForm.company_name"
                label="Company Name"
                variant="outlined"
                density="compact"
                required
                rounded
              ></v-text-field>
              <v-text-field
                v-model="profileForm.company_social"
                label="Social Media"
                variant="outlined"
                density="compact"
                required
                rounded
              ></v-text-field>
              <v-select
                v-model="profileForm.company_category"
                :items="categories"
                label="Category"
                variant="outlined"
                required
                rounded
                density="compact"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="createEmployerProfile">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </JobNavigationLayout>
</template>

<style scoped>
.popup-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.popup-card h2 {
  margin-bottom: 20px;
}

.popup-card input {
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.apply-button {
  width: 100%;
}
</style>

